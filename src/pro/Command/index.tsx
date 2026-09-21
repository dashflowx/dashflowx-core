import React, { useMemo, useCallback, useState } from 'react';
import {
  CommandComp,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from './CommandComp';

// Types
interface CommandItemType {
  id?: string;
    title: string;
    shortcut?: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  hidden?: boolean;
  metadata?: Record<string, any>;
}

interface CommandGroupType {
  id?: string;
    title: string;
  childs: CommandItemType[];
  collapsible?: boolean;
  collapsed?: boolean;
  hidden?: boolean;
  metadata?: Record<string, any>;
}

interface CommandProps {
  suggestionsItems?: CommandItemType[] | string;
  items?: CommandGroupType[] | string;
  className?: string;
  children?: React.ReactNode;
}

// Dynamic Command Types
interface DynamicCommandItem extends CommandItemType {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  tags?: string[];
  category?: string;
  priority?: number;
  customData?: Record<string, any>;
}

interface DynamicCommandGroup extends CommandGroupType {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  items: DynamicCommandItem[];
  maxItems?: number;
  sortBy?: 'title' | 'priority' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}

interface DynamicCommandProps extends Omit<CommandProps, 'suggestionsItems' | 'items'> {
  suggestionsItems?: DynamicCommandItem[] | string;
  items?: DynamicCommandGroup[] | string;
  // State props (controlled)
  searchTerm?: string;
  filterCategory?: string;
  collapsedGroups?: string[];
  // Dynamic features
  editable?: boolean;
  addable?: boolean;
  removable?: boolean;
  draggable?: boolean;
  searchable?: boolean;
  filterable?: boolean;
  sortable?: boolean;
  // Event handlers
  onItemAdd?: (item: Omit<DynamicCommandItem, 'id'>) => void;
  onItemEdit?: (id: string, item: Partial<DynamicCommandItem>) => void;
  onItemRemove?: (id: string) => void;
  onItemSelect?: (item: DynamicCommandItem) => void;
  onGroupAdd?: (group: Omit<DynamicCommandGroup, 'id'>) => void;
  onGroupEdit?: (id: string, group: Partial<DynamicCommandGroup>) => void;
  onGroupRemove?: (id: string) => void;
  onGroupReorder?: (fromIndex: number, toIndex: number) => void;
  onItemReorder?: (groupId: string, fromIndex: number, toIndex: number) => void;
  onSearchChange?: (searchTerm: string) => void;
  onFilterChange?: (category: string) => void;
  onGroupToggle?: (groupId: string, collapsed: boolean) => void;
  // Configuration
  maxSuggestions?: number;
  maxGroups?: number;
  maxItemsPerGroup?: number;
  showControls?: boolean;
  controlsPosition?: 'top' | 'bottom' | 'inline';
  // Search and filter
  searchPlaceholder?: string;
  filterOptions?: string[];
  // Performance
  debounceMs?: number;
  virtualize?: boolean;
  lazyLoad?: boolean;
}

// Default data
const DEFAULT_SUGGESTIONS: CommandItemType[] = [
  { title: 'Calendar', shortcut: '⌘K' },
  { title: 'Search Emoji', shortcut: '⌘E' },
  { title: 'Calculator', shortcut: '⌘C' }
];

const DEFAULT_ITEMS: CommandGroupType[] = [
  {
    title: 'Suggestions',
    childs: [
      { title: 'Calendar', shortcut: '⌘K' },
      { title: 'Search Emoji', shortcut: '⌘E' }
    ]
  }
];

// Dynamic Command Default Data
const DEFAULT_DYNAMIC_SUGGESTIONS: DynamicCommandItem[] = [
  { 
    id: 'calendar-1', 
    title: 'Calendar', 
    shortcut: '⌘K',
    description: 'Open calendar application',
    category: 'productivity',
    priority: 1,
    tags: ['calendar', 'schedule'],
    createdAt: new Date()
  },
  { 
    id: 'search-1', 
    title: 'Search Emoji', 
    shortcut: '⌘E',
    description: 'Search and insert emojis',
    category: 'communication',
    priority: 2,
    tags: ['emoji', 'search'],
    createdAt: new Date()
  },
  { 
    id: 'calc-1', 
    title: 'Calculator', 
    shortcut: '⌘C',
    description: 'Open calculator tool',
    category: 'tools',
    priority: 3,
    tags: ['calculator', 'math'],
    createdAt: new Date()
  }
];

const DEFAULT_DYNAMIC_ITEMS: DynamicCommandGroup[] = [
  {
    id: 'suggestions-group',
    title: 'Suggestions',
    childs: DEFAULT_DYNAMIC_SUGGESTIONS.map(item => ({
      title: item.title,
      shortcut: item.shortcut,
      description: item.description,
      icon: item.icon,
      disabled: item.disabled,
      hidden: item.hidden,
      metadata: item.metadata
    })),
    items: DEFAULT_DYNAMIC_SUGGESTIONS,
    collapsible: true,
    collapsed: false,
    maxItems: 10,
    sortBy: 'priority',
    sortOrder: 'asc',
    createdAt: new Date()
  }
];

// Utility functions
const parseArrayProp = <T,>(prop: any, defaultValue: T[]): T[] => {
  if (typeof prop === 'string') {
    try {
      return JSON.parse(prop);
    } catch (error) {
      console.warn('Failed to parse JSON prop:', prop, error);
      return defaultValue;
    }
  }
  return Array.isArray(prop) ? prop : defaultValue;
};



const sortItems = <T extends { [key: string]: any }>(
  items: T[],
  sortBy: keyof T,
  sortOrder: 'asc' | 'desc' = 'asc'
): T[] => {
  return [...items].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];
    
    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });
};

const filterItems = <T extends { title: string; tags?: string[]; category?: string; description?: string }>(
  items: T[],
  searchTerm: string,
  filterCategory?: string
): T[] => {
  return items.filter(item => {
    const matchesSearch = !searchTerm || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = !filterCategory || item.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });
};

// Dynamic Command Controls Component
const DynamicCommandControls = React.memo<{
  onAddItem?: () => void;
  onAddGroup?: () => void;
  onToggleCollapse?: () => void;
  collapsed?: boolean;
  showControls?: boolean;
  controlsPosition?: 'top' | 'bottom' | 'inline';
}>(({ 
  onAddItem, 
  onAddGroup, 
  onToggleCollapse, 
  collapsed = false, 
  showControls = true,
  controlsPosition = 'top'
}) => {
  if (!showControls) return null;

  const controls = (
    <div className="flex items-center gap-2 p-2 border-b bg-gray-50">
      <button
        onClick={onAddItem}
        className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
        title="Add Item"
      >
        + Item
      </button>
      <button
        onClick={onAddGroup}
        className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
        title="Add Group"
      >
        + Group
      </button>
      <button
        onClick={onToggleCollapse}
        className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
        title={collapsed ? "Expand" : "Collapse"}
      >
        {collapsed ? '▼' : '▲'}
      </button>
    </div>
  );

  if (controlsPosition === 'bottom') {
    return <div className="order-last">{controls}</div>;
  }
  
  return controls;
});

DynamicCommandControls.displayName = 'DynamicCommandControls';

// Dynamic Command Item Component
const DynamicCommandItem = React.memo<{
  item: DynamicCommandItem;
  editable?: boolean;
  removable?: boolean;
  onEdit?: (id: string, item: Partial<DynamicCommandItem>) => void;
  onRemove?: (id: string) => void;
  onSelect?: (item: DynamicCommandItem) => void;
}>(({ item, editable, removable, onEdit, onRemove, onSelect }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(item.title);
  const [editShortcut, setEditShortcut] = useState(item.shortcut || '');

  const handleSave = useCallback(() => {
    if (onEdit && editTitle.trim()) {
      onEdit(item.id, {
        title: editTitle.trim(),
        shortcut: editShortcut.trim() || undefined,
        updatedAt: new Date()
      });
      setIsEditing(false);
    }
  }, [item.id, editTitle, editShortcut, onEdit]);

  const handleCancel = useCallback(() => {
    setEditTitle(item.title);
    setEditShortcut(item.shortcut || '');
    setIsEditing(false);
  }, [item.title, item.shortcut]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  }, [handleSave, handleCancel]);

  if (item.hidden) return null;

  return (
    <CommandItem 
      key={`item-${item.id}`}
      disabled={item.disabled}
      onClick={() => onSelect?.(item)}
      className="group relative"
    >
      {isEditing ? (
        <div className="flex items-center gap-2 w-full">
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 px-2 py-1 text-sm border rounded"
            autoFocus
          />
          <input
            value={editShortcut}
            onChange={(e) => setEditShortcut(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Shortcut"
            className="w-20 px-2 py-1 text-sm border rounded"
          />
          <button
            onClick={handleSave}
            className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
          >
            ✓
          </button>
          <button
            onClick={handleCancel}
            className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            ✕
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2">
            {item.icon}
            <span>{item.title}</span>
            {item.description && (
              <span className="text-xs text-gray-500">{item.description}</span>
            )}
          </div>
          {item.shortcut && <CommandShortcut>{item.shortcut}</CommandShortcut>}
          {(editable || removable) && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
              {editable && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                  className="px-1 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 mr-1"
                  title="Edit"
                >
                  ✏️
                </button>
              )}
              {removable && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove?.(item.id);
                  }}
                  className="px-1 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                  title="Remove"
                >
                  🗑️
                </button>
              )}
            </div>
          )}
        </>
      )}
    </CommandItem>
  );
});

DynamicCommandItem.displayName = 'DynamicCommandItem';

// Dynamic Command Group Component
const DynamicCommandGroup = React.memo<{
  group: DynamicCommandGroup;
  editable?: boolean;
  removable?: boolean;
  onEdit?: (id: string, group: Partial<DynamicCommandGroup>) => void;
  onRemove?: (id: string) => void;
  onItemEdit?: (id: string, item: Partial<DynamicCommandItem>) => void;
  onItemRemove?: (id: string) => void;
  onItemSelect?: (item: DynamicCommandItem) => void;
  onGroupToggle?: (groupId: string, collapsed: boolean) => void;
}>(({ 
  group, 
  editable, 
  removable, 
  onEdit, 
  onRemove, 
  onItemEdit, 
  onItemRemove, 
  onItemSelect,
  onGroupToggle
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(group.title);
  const isCollapsed = group.collapsed || false;

  const handleSave = useCallback(() => {
    if (onEdit && editTitle.trim()) {
      onEdit(group.id, {
        title: editTitle.trim(),
        updatedAt: new Date()
      });
      setIsEditing(false);
    }
  }, [group.id, editTitle, onEdit]);

  const handleCancel = useCallback(() => {
    setEditTitle(group.title);
    setIsEditing(false);
  }, [group.title]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  }, [handleSave, handleCancel]);

  const toggleCollapse = useCallback(() => {
    onGroupToggle?.(group.id, !isCollapsed);
  }, [group.id, isCollapsed, onGroupToggle]);

  if (group.hidden) return null;

  return (
    <CommandGroup key={`group-${group.id}`} heading={group.title}>
      <div className="flex items-center justify-between px-2 py-1">
        {isEditing ? (
          <div className="flex items-center gap-2 flex-1">
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 px-2 py-1 text-sm border rounded"
              autoFocus
            />
            <button
              onClick={handleSave}
              className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
            >
              ✓
            </button>
            <button
              onClick={handleCancel}
              className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              ✕
            </button>
          </div>
        ) : (
          <>
            <span className="text-sm font-semibold">{group.title}</span>
            <div className="flex items-center gap-1">
              {group.collapsible && (
                <button
                  onClick={toggleCollapse}
                  className="px-1 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
                  title={isCollapsed ? "Expand" : "Collapse"}
                >
                  {isCollapsed ? '▶' : '▼'}
                </button>
              )}
              {editable && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-1 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                  title="Edit Group"
                >
                  ✏️
                </button>
              )}
              {removable && (
                <button
                  onClick={() => onRemove?.(group.id)}
                  className="px-1 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                  title="Remove Group"
                >
                  🗑️
                </button>
              )}
            </div>
          </>
        )}
      </div>
      {!isCollapsed && group.items?.map((item) => (
        <DynamicCommandItem
          key={`child-${item.id}`}
          item={item}
          editable={editable}
          removable={removable}
          onEdit={onItemEdit}
          onRemove={onItemRemove}
          onSelect={onItemSelect}
        />
      ))}
    </CommandGroup>
  );
});

DynamicCommandGroup.displayName = 'DynamicCommandGroup';

// Memoized CommandItem component (for backward compatibility)
const MemoizedCommandItem = React.memo<{ item: CommandItemType; index: number }>(({ item, index }) => (
  <CommandItem key={`item-${index}`}>
    <span>{item.title}</span>
    {item.shortcut && <CommandShortcut>{item.shortcut}</CommandShortcut>}
  </CommandItem>
));

MemoizedCommandItem.displayName = 'MemoizedCommandItem';

// Memoized CommandGroup component (for backward compatibility)
const MemoizedCommandGroup = React.memo<{ group: CommandGroupType; index: number }>(({ group, index }) => (
  <CommandGroup key={`group-${index}`} heading={group.title}>
    {group.childs?.map((child, childIndex) => (
      <MemoizedCommandItem key={`child-${childIndex}`} item={child} index={childIndex} />
    ))}
  </CommandGroup>
));

MemoizedCommandGroup.displayName = 'MemoizedCommandGroup';

// Main Dynamic Command Component
function DynamicCommand({
  suggestionsItems: rawSuggestionsItems,
  items: rawItems,
  className = '',
  children,
  // State props (controlled)
  searchTerm = '',
  filterCategory = '',
  collapsedGroups = [],
  // Dynamic features
  editable = false,
  addable = false,
  removable = false,
  sortable = false,
  // Event handlers
  onItemAdd,
  onItemEdit,
  onItemRemove,
  onItemSelect,
  onGroupAdd,
  onGroupEdit,
  onGroupRemove,
  onGroupToggle,
  // Configuration
  maxSuggestions = 10,
  maxItemsPerGroup = 20,
  showControls = true,
  controlsPosition = 'top',
  // Search and filter
  searchPlaceholder = 'Type a command or search...'
}: DynamicCommandProps) {
  // Parse data from props
  const suggestions = useMemo(
    () => parseArrayProp(rawSuggestionsItems, DEFAULT_DYNAMIC_SUGGESTIONS),
    [rawSuggestionsItems]
  );

  const groups = useMemo(
    () => parseArrayProp(rawItems, DEFAULT_DYNAMIC_ITEMS),
    [rawItems]
  );


  // Filtered and sorted data
  const filteredSuggestions = useMemo(() => {
    let filtered = filterItems(suggestions, searchTerm, filterCategory);
    
    if (sortable) {
      filtered = sortItems(filtered, 'priority', 'asc');
    }
    
    return filtered.slice(0, maxSuggestions);
  }, [suggestions, searchTerm, filterCategory, sortable, maxSuggestions]);

  const filteredGroups = useMemo(() => {
    return groups.map(group => ({
      ...group,
      collapsed: collapsedGroups.includes(group.id),
      items: filterItems(group.items, searchTerm, filterCategory)
        .slice(0, group.maxItems || maxItemsPerGroup)
    }));
  }, [groups, searchTerm, filterCategory, collapsedGroups, maxItemsPerGroup]);

  // Event handlers
  const handleAddItem = useCallback(() => {
    const newItem: Omit<DynamicCommandItem, 'id'> = {
      title: 'New Item',
      shortcut: '',
      description: '',
      category: 'general',
      priority: 1,
      tags: [],
      createdAt: new Date()
    };
    onItemAdd?.(newItem);
  }, [onItemAdd]);

  const handleAddGroup = useCallback(() => {
    const newGroup: Omit<DynamicCommandGroup, 'id'> = {
      title: 'New Group',
      childs: [],
      items: [],
      collapsible: true,
      collapsed: false,
      maxItems: maxItemsPerGroup,
      sortBy: 'title',
      sortOrder: 'asc',
      createdAt: new Date()
    };
    onGroupAdd?.(newGroup);
  }, [onGroupAdd, maxItemsPerGroup]);

  const handleItemEdit = useCallback((id: string, updates: Partial<DynamicCommandItem>) => {
    onItemEdit?.(id, updates);
  }, [onItemEdit]);

  const handleItemRemove = useCallback((id: string) => {
    onItemRemove?.(id);
  }, [onItemRemove]);

  const handleItemSelect = useCallback((item: DynamicCommandItem) => {
    onItemSelect?.(item);
  }, [onItemSelect]);

  const handleGroupEdit = useCallback((id: string, updates: Partial<DynamicCommandGroup>) => {
    onGroupEdit?.(id, updates);
  }, [onGroupEdit]);

  const handleGroupRemove = useCallback((id: string) => {
    onGroupRemove?.(id);
  }, [onGroupRemove]);

  const handleGroupToggle = useCallback((groupId: string, collapsed: boolean) => {
    onGroupToggle?.(groupId, collapsed);
  }, [onGroupToggle]);

  // Memoize className
  const containerClassName = useMemo(
    () => `rounded-lg border shadow-md bg-white ${className}`,
    [className]
  );

  return (
    <CommandComp className={containerClassName}>
      <DynamicCommandControls
        onAddItem={addable ? handleAddItem : undefined}
        onAddGroup={addable ? handleAddGroup : undefined}
        showControls={showControls}
        controlsPosition={controlsPosition}
      />
      
      <CommandInput 
        placeholder={searchPlaceholder}
      />
      
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Suggestions">
          {filteredSuggestions.map((suggestion) => (
            <DynamicCommandItem
              key={`suggestion-${suggestion.id}`}
              item={suggestion}
              editable={editable}
              removable={removable}
              onEdit={handleItemEdit}
              onRemove={handleItemRemove}
              onSelect={handleItemSelect}
            />
          ))}
        </CommandGroup>
        
        <CommandSeparator />
        
        {filteredGroups.map((group) => (
          <DynamicCommandGroup
            key={`group-${group.id}`}
            group={group}
            editable={editable}
            removable={removable}
            onEdit={handleGroupEdit}
            onRemove={handleGroupRemove}
            onItemEdit={handleItemEdit}
            onItemRemove={handleItemRemove}
            onItemSelect={handleItemSelect}
            onGroupToggle={handleGroupToggle}
          />
        ))}
        
        {children}
      </CommandList>
    </CommandComp>
  );
}

// Regular Command component (for backward compatibility)
function Command({ 
  suggestionsItems: rawSuggestionsItems,
  items: rawItems,
  className = '',
  children 
}: CommandProps) {
  // Memoize parsed data to avoid re-parsing on every render
  const suggestionsItems = useMemo(
    () => parseArrayProp(rawSuggestionsItems, DEFAULT_SUGGESTIONS),
    [rawSuggestionsItems]
  );

  const items = useMemo(
    () => parseArrayProp(rawItems, DEFAULT_ITEMS),
    [rawItems]
  );

  // Memoize className to avoid string concatenation on every render
  const containerClassName = useMemo(
    () => `rounded-lg border shadow-md bg-white ${className}`,
    [className]
  );

  return (
    <CommandComp className={containerClassName}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {suggestionsItems.map((suggestion, index) => (
            <MemoizedCommandItem key={`suggestion-${index}`} item={suggestion} index={index} />
          ))}
        </CommandGroup>
        <CommandSeparator />
        {items.map((item, index) => (
          <MemoizedCommandGroup key={`group-${index}`} group={item} index={index} />
        ))}
        {children}
      </CommandList>
    </CommandComp>
  );
}

// Optimized Simple Command renderer for Markdoc
const SimpleCommand = React.memo((props: any) => {
  const { 
    suggestionsItems: rawSuggestionsItems,
    items: rawItems,
    className = ''
  } = props;

  // Use memoized parsing
  const suggestionsItems = useMemo(
    () => parseArrayProp(rawSuggestionsItems, DEFAULT_SUGGESTIONS),
    [rawSuggestionsItems]
  );

  const items = useMemo(
    () => parseArrayProp(rawItems, DEFAULT_ITEMS),
    [rawItems]
  );

  // Memoize CSS classes
  const classes = useMemo(() => ({
    container: `rounded-lg border shadow-md bg-white ${className}`,
    input: 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    list: 'max-h-[300px] overflow-y-auto overflow-x-hidden',
    group: 'overflow-hidden p-1 text-foreground',
    item: 'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    shortcut: 'ml-auto text-xs tracking-widest text-muted-foreground',
    heading: 'px-2 py-1.5 text-sm font-semibold',
    separator: '-mx-1 h-px bg-border',
    inputWrapper: 'flex items-center border-b px-3'
  }), [className]);

  // Memoized suggestion item renderer
  const renderSuggestionItem = useCallback((suggestion: CommandItemType, index: number) => 
    React.createElement('div', {
      key: `suggestion-${index}`,
      className: classes.item,
    }, [
      React.createElement('span', { key: 'title' }, suggestion.title),
      suggestion.shortcut && React.createElement('span', {
        key: 'shortcut',
        className: classes.shortcut,
      }, suggestion.shortcut)
    ]), [classes.item, classes.shortcut]);

  // Memoized group item renderer
  const renderGroupItem = useCallback((item: CommandGroupType, index: number) =>
    React.createElement('div', {
      key: `group-${index}`,
      className: classes.group,
    }, [
      React.createElement('div', {
        key: 'heading',
        className: classes.heading,
      }, item.title),
      ...item.childs.map((child: CommandItemType, childIndex: number) =>
        React.createElement('div', {
          key: `child-${childIndex}`,
          className: classes.item,
        }, [
          React.createElement('span', { key: 'title' }, child.title),
          child.shortcut && React.createElement('span', {
            key: 'shortcut',
            className: classes.shortcut,
          }, child.shortcut)
        ])
      )
    ]), [classes.group, classes.heading, classes.item, classes.shortcut]);

  return React.createElement('div', {
    className: classes.container,
  }, [
    React.createElement('div', {
      key: 'input',
      className: classes.inputWrapper,
    }, [
      React.createElement('input', {
        key: 'search',
        className: classes.input,
        placeholder: 'Type a command or search...',
        type: 'text'
      })
    ]),
    React.createElement('div', {
      key: 'list',
      className: classes.list,
    }, [
      React.createElement('div', {
        key: 'suggestions',
        className: classes.group,
      }, [
        React.createElement('div', {
          key: 'heading',
          className: classes.heading,
        }, 'Suggestions'),
        ...suggestionsItems.map(renderSuggestionItem)
      ]),
      React.createElement('div', {
        key: 'separator',
        className: classes.separator,
      }),
      ...items.map(renderGroupItem)
    ])
  ]);
});

SimpleCommand.displayName = 'SimpleCommand';

export {
  Command,
  DynamicCommand,
  SimpleCommand,
  CommandComp,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  // Types
  type CommandItemType,
  type CommandGroupType,
  type CommandProps,
  type DynamicCommandItem,
  type DynamicCommandGroup,
  type DynamicCommandProps,
};
