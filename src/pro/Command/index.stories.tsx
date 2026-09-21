import type { Meta, StoryObj } from '@storybook/react';
import { useState, useCallback } from 'react';
import { Command, DynamicCommand, SimpleCommand } from '.';
import type { DynamicCommandItem, DynamicCommandGroup } from '.';

// Memoized story data to prevent re-creation on every render
const STORY_DATA = {
  defaultSuggestions: [
    { title: 'Calendar', shortcut: '⌘K' },
    { title: 'Search Emoji', shortcut: '⌘E' },
    { title: 'Calculator', shortcut: '⌘C' }
  ],
  fileOperations: [
    { title: 'Open File', shortcut: '⌘O' },
    { title: 'Save File', shortcut: '⌘S' },
    { title: 'New File', shortcut: '⌘N' },
    { title: 'Close File', shortcut: '⌘W' }
  ],
  complexItems: [
    {
      title: 'File Operations',
      childs: [
        { title: 'Open File', shortcut: '⌘O' },
        { title: 'Save File', shortcut: '⌘S' },
        { title: 'New File', shortcut: '⌘N' }
      ]
    },
    {
      title: 'Edit Operations',
      childs: [
        { title: 'Copy', shortcut: '⌘C' },
        { title: 'Paste', shortcut: '⌘V' },
        { title: 'Undo', shortcut: '⌘Z' }
      ]
    }
  ],
  navigationItems: [
    {
      title: 'Navigation',
      childs: [
        { title: 'Home', shortcut: '⌘H' },
        { title: 'Back', shortcut: '⌘←' },
        { title: 'Forward', shortcut: '⌘→' }
      ]
    },
    {
      title: 'Tools',
      childs: [
        { title: 'Calculator', shortcut: '⌘C' },
        { title: 'Calendar', shortcut: '⌘K' },
        { title: 'Notes', shortcut: '⌘N' }
      ]
    },
    {
      title: 'Help',
      childs: [
        { title: 'Documentation', shortcut: '⌘?' },
        { title: 'Keyboard Shortcuts', shortcut: '⌘/' },
        { title: 'Support', shortcut: '⌘S' }
      ]
    }
  ]
};

const meta: Meta<typeof Command> = {
  title: 'Components/Command',
  component: Command,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    suggestionsItems: {
      control: 'object',
      description: 'Array of suggestion items or JSON string',
    },
    items: {
      control: 'object',
      description: 'Array of command groups or JSON string',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomSuggestions: Story = {
  args: {
    suggestionsItems: STORY_DATA.fileOperations,
  },
};

export const CustomItems: Story = {
  args: {
    suggestionsItems: [
      { title: 'Quick Actions', shortcut: '⌘Q' },
      { title: 'Search Files', shortcut: '⌘F' }
    ],
    items: STORY_DATA.complexItems,
  },
};

export const JSONStringProps: Story = {
  args: {
    suggestionsItems: JSON.stringify([
      { title: 'JSON Calendar', shortcut: '⌘K' },
      { title: 'JSON Search', shortcut: '⌘E' }
    ]),
    items: JSON.stringify([
      {
        title: 'JSON Group',
        childs: [
          { title: 'JSON Item 1', shortcut: '⌘1' },
          { title: 'JSON Item 2', shortcut: '⌘2' }
        ]
      }
    ]),
  },
};

export const SimpleCommandExample: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Simple Command (No External Dependencies)</h3>
        <SimpleCommand
          suggestionsItems={[
            { title: 'Simple Calendar', shortcut: '⌘K' },
            { title: 'Simple Search', shortcut: '⌘E' }
          ]}
          items={[
            {
              title: 'Simple Group',
              childs: [
                { title: 'Simple Item 1', shortcut: '⌘1' },
                { title: 'Simple Item 2', shortcut: '⌘2' }
              ]
            }
          ]}
        />
      </div>
    </div>
  ),
};

export const ComplexExample: Story = {
  args: {
    suggestionsItems: [
      { title: 'Dashboard', shortcut: '⌘D' },
      { title: 'Analytics', shortcut: '⌘A' },
      { title: 'Settings', shortcut: '⌘S' },
      { title: 'Profile', shortcut: '⌘P' }
    ],
    items: STORY_DATA.navigationItems,
  },
};

export const PerformanceComparison: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Regular Command Component</h3>
        <Command
          suggestionsItems={STORY_DATA.defaultSuggestions}
          items={STORY_DATA.complexItems}
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Simple Command Component (Memoized)</h3>
        <SimpleCommand
          suggestionsItems={STORY_DATA.defaultSuggestions}
          items={STORY_DATA.complexItems}
        />
      </div>
    </div>
  ),
};

export const LargeDataset: Story = {
  args: {
    suggestionsItems: Array.from({ length: 20 }, (_, i) => ({
      title: `Suggestion ${i + 1}`,
      shortcut: `⌘${i + 1}`
    })),
    items: Array.from({ length: 5 }, (_, groupIndex) => ({
      title: `Group ${groupIndex + 1}`,
      childs: Array.from({ length: 10 }, (_, itemIndex) => ({
        title: `Item ${groupIndex + 1}.${itemIndex + 1}`,
        shortcut: `⌘${groupIndex + 1}${itemIndex + 1}`
      }))
    })),
  },
};

// Dynamic Command Stories
type DynamicStory = StoryObj<typeof DynamicCommand>;

// Interactive Dynamic Command with State Management
const InteractiveDynamicCommand = () => {
  const [suggestions, setSuggestions] = useState<DynamicCommandItem[]>([
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
  ]);

  const [groups, setGroups] = useState<DynamicCommandGroup[]>([
    {
      id: 'productivity-group',
      title: 'Productivity',
      childs: [
        { 
          title: 'Task Manager', 
          shortcut: '⌘T',
          description: 'Manage your tasks'
        },
        { 
          title: 'Notes', 
          shortcut: '⌘N',
          description: 'Take quick notes'
        }
      ],
      items: [
        { 
          id: 'task-1', 
          title: 'Task Manager', 
          shortcut: '⌘T',
          description: 'Manage your tasks',
          category: 'productivity',
          priority: 1,
          tags: ['tasks', 'productivity'],
          createdAt: new Date()
        },
        { 
          id: 'note-1', 
          title: 'Notes', 
          shortcut: '⌘N',
          description: 'Take quick notes',
          category: 'productivity',
          priority: 2,
          tags: ['notes', 'writing'],
          createdAt: new Date()
        }
      ],
      collapsible: true,
      collapsed: false,
      maxItems: 10,
      sortBy: 'priority',
      sortOrder: 'asc',
      createdAt: new Date()
    },
    {
      id: 'tools-group',
      title: 'Tools',
      childs: [
        { 
          title: 'Settings', 
          shortcut: '⌘S',
          description: 'Open settings'
        }
      ],
      items: [
        { 
          id: 'settings-1', 
          title: 'Settings', 
          shortcut: '⌘S',
          description: 'Open settings',
          category: 'tools',
          priority: 1,
          tags: ['settings', 'config'],
          createdAt: new Date()
        }
      ],
      collapsible: true,
      collapsed: false,
      maxItems: 10,
      sortBy: 'title',
      sortOrder: 'asc',
      createdAt: new Date()
    }
  ]);

  // New state for controlled props
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [collapsedGroups, setCollapsedGroups] = useState<string[]>([]);

  const handleItemAdd = useCallback((newItem: Omit<DynamicCommandItem, 'id'>) => {
    const item: DynamicCommandItem = {
      ...newItem,
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    setSuggestions(prev => [...prev, item]);
  }, []);

  const handleItemEdit = useCallback((id: string, updates: Partial<DynamicCommandItem>) => {
    setSuggestions(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
    setGroups(prev => prev.map(group => ({
      ...group,
      items: group.items.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    })));
  }, []);

  const handleItemRemove = useCallback((id: string) => {
    setSuggestions(prev => prev.filter(item => item.id !== id));
    setGroups(prev => prev.map(group => ({
      ...group,
      items: group.items.filter(item => item.id !== id)
    })));
  }, []);

  const handleItemSelect = useCallback((item: DynamicCommandItem) => {
    console.log('Selected item:', item);
  }, []);

  const handleGroupAdd = useCallback((newGroup: Omit<DynamicCommandGroup, 'id'>) => {
    const group: DynamicCommandGroup = {
      ...newGroup,
      id: `group-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    setGroups(prev => [...prev, group]);
  }, []);

  const handleGroupEdit = useCallback((id: string, updates: Partial<DynamicCommandGroup>) => {
    setGroups(prev => prev.map(group => 
      group.id === id ? { ...group, ...updates } : group
    ));
  }, []);

  const handleGroupRemove = useCallback((id: string) => {
    setGroups(prev => prev.filter(group => group.id !== id));
  }, []);

  // New controlled prop handlers
  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const handleFilterChange = useCallback((category: string) => {
    setFilterCategory(category);
  }, []);

  const handleGroupToggle = useCallback((groupId: string, collapsed: boolean) => {
    setCollapsedGroups(prev => 
      collapsed 
        ? [...prev, groupId]
        : prev.filter(id => id !== groupId)
    );
  }, []);

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600">
        <p>Try adding, editing, or removing items and groups!</p>
        <p>• Click + Item or + Group to add new items</p>
        <p>• Hover over items to see edit/remove buttons</p>
        <p>• Click on items to see selection logs in console</p>
        <p>• All state is now controlled via props!</p>
      </div>
      <DynamicCommand
        suggestionsItems={suggestions}
        items={groups}
        searchTerm={searchTerm}
        filterCategory={filterCategory}
        collapsedGroups={collapsedGroups}
        editable={true}
        addable={true}
        removable={true}
        searchable={true}
        sortable={true}
        showControls={true}
        controlsPosition="top"
        onItemAdd={handleItemAdd}
        onItemEdit={handleItemEdit}
        onItemRemove={handleItemRemove}
        onItemSelect={handleItemSelect}
        onGroupAdd={handleGroupAdd}
        onGroupEdit={handleGroupEdit}
        onGroupRemove={handleGroupRemove}
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
        onGroupToggle={handleGroupToggle}
        maxSuggestions={10}
        maxGroups={5}
        maxItemsPerGroup={20}
        debounceMs={300}
      />
    </div>
  );
};

export const InteractiveDynamic: DynamicStory = {
  render: () => <InteractiveDynamicCommand />,
};

export const DynamicWithControls: DynamicStory = {
  args: {
    editable: true,
    addable: true,
    removable: true,
    showControls: true,
    controlsPosition: 'top',
    maxSuggestions: 5,
    maxGroups: 3,
    maxItemsPerGroup: 10,
  },
};

export const DynamicSearchable: DynamicStory = {
  args: {
    searchable: true,
    filterable: true,
    sortable: true,
    searchPlaceholder: 'Search commands...',
    debounceMs: 200,
  },
};

export const DynamicCollapsible: DynamicStory = {
  args: {
    suggestionsItems: [
      { 
        id: 'item-1', 
        title: 'Quick Action', 
        shortcut: '⌘Q',
        description: 'Quick action item',
        category: 'general',
        priority: 1,
        tags: ['quick'],
        createdAt: new Date()
      }
    ],
    items: [
      {
        id: 'collapsible-group',
        title: 'Collapsible Group',
        childs: [
          { 
            title: 'Item 1', 
            shortcut: '⌘1'
          },
          { 
            title: 'Item 2', 
            shortcut: '⌘2'
          }
        ],
        items: [
          { 
            id: 'item-2', 
            title: 'Item 1', 
            shortcut: '⌘1',
            category: 'general',
            priority: 1,
            createdAt: new Date()
          },
          { 
            id: 'item-3', 
            title: 'Item 2', 
            shortcut: '⌘2',
            category: 'general',
            priority: 2,
            createdAt: new Date()
          }
        ],
        collapsible: true,
        collapsed: false,
        createdAt: new Date()
      }
    ],
    editable: true,
    addable: true,
    removable: true,
  },
};

export const DynamicPerformance: DynamicStory = {
  args: {
    suggestionsItems: Array.from({ length: 50 }, (_, i) => ({
      id: `suggestion-${i}`,
      title: `Suggestion ${i + 1}`,
      shortcut: `⌘${i + 1}`,
      description: `Description for suggestion ${i + 1}`,
      category: ['productivity', 'tools', 'communication'][i % 3],
      priority: i + 1,
      tags: [`tag${i + 1}`, 'common'],
      createdAt: new Date()
    })),
    items: Array.from({ length: 10 }, (_, groupIndex) => ({
      id: `group-${groupIndex}`,
      title: `Group ${groupIndex + 1}`,
      childs: Array.from({ length: 20 }, (_, itemIndex) => ({
        title: `Item ${groupIndex + 1}.${itemIndex + 1}`,
        shortcut: `⌘${groupIndex + 1}${itemIndex + 1}`
      })),
      items: Array.from({ length: 20 }, (_, itemIndex) => ({
        id: `item-${groupIndex}-${itemIndex}`,
        title: `Item ${groupIndex + 1}.${itemIndex + 1}`,
        shortcut: `⌘${groupIndex + 1}${itemIndex + 1}`,
        description: `Description for item ${groupIndex + 1}.${itemIndex + 1}`,
        category: ['productivity', 'tools', 'communication'][itemIndex % 3],
        priority: itemIndex + 1,
        tags: [`tag${itemIndex + 1}`, 'group'],
        createdAt: new Date()
      })),
      collapsible: true,
      collapsed: false,
      maxItems: 20,
      sortBy: 'priority',
      sortOrder: 'asc',
      createdAt: new Date()
    })),
    searchable: true,
    filterable: true,
    sortable: true,
    virtualize: true,
    debounceMs: 100,
    maxSuggestions: 20,
    maxGroups: 10,
    maxItemsPerGroup: 20,
  },
};