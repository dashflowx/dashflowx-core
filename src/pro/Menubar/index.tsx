import { useMemo, useCallback } from 'react';
import {
  MenubarCheckboxItem,
  MenubarComp,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from './MenubarComp';

// Types and Interfaces
export interface MenubarSubItem {
  type: 'item' | 'separator';
  label?: string;
  shortcut?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export interface MenubarMenuItem {
  type: 'item' | 'separator' | 'submenu' | 'checkbox' | 'radio-group';
  label?: string;
  shortcut?: string;
  disabled?: boolean;
  checked?: boolean;
  inset?: boolean;
  onClick?: () => void;
  children?: MenubarSubItem[];
  radioItems?: { value: string; label: string }[];
  radioValue?: string;
}

export interface MenubarMenuConfig {
  label: string;
  items: MenubarMenuItem[];
}

export interface DynamicMenubarProps {
  menus?: MenubarMenuConfig[];
  className?: string;
  backgroundColor?: string;
  backgroundIntensity?: string;
  customBgColor?: string;
  variant?: 'default' | 'compact' | 'large';
  theme?: 'light' | 'dark';
  onItemClick?: (menuLabel: string, itemLabel: string, item: MenubarMenuItem) => void;
}

// Default menu configuration
const DEFAULT_MENUS: MenubarMenuConfig[] = [
  {
    label: 'File',
    items: [
      { type: 'item', label: 'New Tab', shortcut: '⌘T' },
      { type: 'item', label: 'New Window', shortcut: '⌘N' },
      { type: 'item', label: 'New Incognito Window', disabled: true },
      { type: 'separator' },
      {
        type: 'submenu',
        label: 'Share',
        children: [
          { type: 'item', label: 'Email link' },
          { type: 'item', label: 'Messages' },
          { type: 'item', label: 'Notes' },
        ],
      },
      { type: 'separator' },
      { type: 'item', label: 'Print...', shortcut: '⌘P' },
    ],
  },
  {
    label: 'Edit',
    items: [
      { type: 'item', label: 'Undo', shortcut: '⌘Z' },
      { type: 'item', label: 'Redo', shortcut: '⇧⌘Z' },
      { type: 'separator' },
      {
        type: 'submenu',
        label: 'Find',
        children: [
          { type: 'item', label: 'Search the web' },
          { type: 'separator' },
          { type: 'item', label: 'Find...' },
          { type: 'item', label: 'Find Next' },
          { type: 'item', label: 'Find Previous' },
        ],
      },
      { type: 'separator' },
      { type: 'item', label: 'Cut' },
      { type: 'item', label: 'Copy' },
      { type: 'item', label: 'Paste' },
    ],
  },
  {
    label: 'View',
    items: [
      { type: 'checkbox', label: 'Always Show Bookmarks Bar' },
      { type: 'checkbox', label: 'Always Show Full URLs', checked: true },
      { type: 'separator' },
      { type: 'item', label: 'Reload', shortcut: '⌘R', inset: true },
      { type: 'item', label: 'Force Reload', shortcut: '⇧⌘R', disabled: true, inset: true },
      { type: 'separator' },
      { type: 'item', label: 'Toggle Fullscreen', inset: true },
      { type: 'separator' },
      { type: 'item', label: 'Hide Sidebar', inset: true },
    ],
  },
  {
    label: 'Profiles',
    items: [
      {
        type: 'radio-group',
        label: 'Profiles',
        radioValue: 'benoit',
        radioItems: [
          { value: 'andy', label: 'Andy' },
          { value: 'benoit', label: 'Benoit' },
          { value: 'luis', label: 'Luis' },
        ],
      },
      { type: 'separator' },
      { type: 'item', label: 'Edit...', inset: true },
      { type: 'separator' },
      { type: 'item', label: 'Add Profile...', inset: true },
    ],
  },
];

// Utility functions
const getBackgroundClasses = (backgroundColor?: string, backgroundIntensity?: string) => {
  if (!backgroundColor) return '';
  
  switch (backgroundColor) {
    case 'transparent':
      return 'bg-transparent';
    case 'glass':
      return 'bg-white/10 backdrop-blur-md border-white/20';
    case 'gradient':
      return 'bg-gradient-to-r from-blue-500 to-purple-600 text-white';
    case 'white':
      return 'bg-white';
    default: {
      const intensity = backgroundIntensity || '500';
      return `bg-${backgroundColor}-${intensity} text-white`;
    }
  }
};

const getVariantClasses = (variant: string) => {
  switch (variant) {
    case 'compact':
      return 'h-8 text-xs px-2';
    case 'large':
      return 'h-12 text-base px-4';
    default:
      return 'h-10 text-sm px-3';
  }
};

const getThemeClasses = (theme: string) => {
  switch (theme) {
    case 'dark':
      return 'bg-gray-900 text-white border-gray-700';
    default:
      return 'bg-white text-gray-900 border-gray-200';
  }
};

// Dynamic Menubar Component
function DynamicMenubar({
  menus = DEFAULT_MENUS,
  className = '',
  backgroundColor,
  backgroundIntensity,
  customBgColor,
  variant = 'default',
  theme = 'light',
  onItemClick,
}: DynamicMenubarProps) {
  // Generate classes
  const backgroundClasses = useMemo(() => getBackgroundClasses(backgroundColor, backgroundIntensity), [backgroundColor, backgroundIntensity]);
  const variantClasses = useMemo(() => getVariantClasses(variant), [variant]);
  const themeClasses = useMemo(() => getThemeClasses(theme), [theme]);
  
  // Combine all classes
  const menubarClasses = useMemo(() => {
    return `${backgroundClasses} ${variantClasses} ${themeClasses} ${className}`.trim();
  }, [backgroundClasses, variantClasses, themeClasses, className]);
  
  // Apply custom background color if provided
  const menubarStyle = useMemo(() => {
    return customBgColor ? { backgroundColor: customBgColor } : {};
  }, [customBgColor]);

  // Handle item clicks
  const handleItemClick = useCallback((menuLabel: string, itemLabel: string, item: MenubarMenuItem) => {
    if (item.disabled) return;
    
    // Call item's onClick handler if provided
    item.onClick?.();
    
    // Call global handler
    onItemClick?.(menuLabel, itemLabel, item);
  }, [onItemClick]);

  // Render menu item
  const renderMenuItem = useCallback((item: MenubarMenuItem, menuLabel: string, index: number) => {
    if (item.type === 'separator') {
      return <MenubarSeparator key={index} />;
    }

    if (item.type === 'item') {
      return (
        <MenubarItem 
          key={index} 
          disabled={item.disabled}
          inset={item.inset}
          onClick={() => handleItemClick(menuLabel, item.label || '', item)}
        >
          {item.label}
          {item.shortcut && <MenubarShortcut>{item.shortcut}</MenubarShortcut>}
        </MenubarItem>
      );
    }

    if (item.type === 'checkbox') {
      return (
        <MenubarCheckboxItem 
          key={index} 
          checked={item.checked}
          disabled={item.disabled}
          onClick={() => handleItemClick(menuLabel, item.label || '', item)}
        >
          {item.label}
        </MenubarCheckboxItem>
      );
    }

    if (item.type === 'radio-group') {
      return (
        <MenubarRadioGroup key={index} value={item.radioValue}>
          {item.radioItems?.map((radioItem, radioIndex) => (
            <MenubarRadioItem 
              key={radioIndex} 
              value={radioItem.value}
              onClick={() => handleItemClick(menuLabel, radioItem.label, item)}
            >
              {radioItem.label}
            </MenubarRadioItem>
          ))}
        </MenubarRadioGroup>
      );
    }

    if (item.type === 'submenu') {
      return (
        <MenubarSub key={index}>
          <MenubarSubTrigger disabled={item.disabled}>
            {item.label}
          </MenubarSubTrigger>
          <MenubarSubContent>
            {item.children?.map((subItem, subIndex) => {
              if (subItem.type === 'separator') {
                return <MenubarSeparator key={subIndex} />;
              }
              return (
                <MenubarItem 
                  key={subIndex}
                  disabled={subItem.disabled}
                  onClick={() => handleItemClick(menuLabel, subItem.label || '', item)}
                >
                  {subItem.label}
                  {subItem.shortcut && <MenubarShortcut>{subItem.shortcut}</MenubarShortcut>}
                </MenubarItem>
              );
            })}
          </MenubarSubContent>
        </MenubarSub>
      );
    }

    return null;
  }, [handleItemClick]);

  return (
    <MenubarComp className={menubarClasses} style={menubarStyle}>
      {menus.map((menu, menuIndex) => (
        <MenubarMenu key={menuIndex}>
          <MenubarTrigger>{menu.label}</MenubarTrigger>
          <MenubarContent>
            {menu.items.map((item, itemIndex) => 
              renderMenuItem(item, menu.label, itemIndex)
            )}
          </MenubarContent>
        </MenubarMenu>
      ))}
    </MenubarComp>
  );
}

// Static Menubar Component (for backward compatibility)
function Menubar(props: DynamicMenubarProps) {
  return <DynamicMenubar {...props} />;
}

export {
  Menubar,
  DynamicMenubar,
  MenubarCheckboxItem,
  MenubarComp,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
};
