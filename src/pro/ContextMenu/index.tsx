import React, { useMemo, useCallback } from 'react';
import {
  ContextMenuCheckboxItem,
  ContextMenuComp,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from './ContextMenuComp';
import { 
  ContextMenuItemType, 
  parseArrayProp, 
  getVariantClasses, 
  getThemeClasses, 
  getSubMenuClasses,
  isItemDisabled 
} from './utils';

interface ContextMenuProps {
  childern?: string | React.ReactNode;
  items?: ContextMenuItemType[];
  className?: string;
  children?: React.ReactNode;
  onItemClick?: (item: ContextMenuItemType, index: number) => void;
  onSubItemClick?: (item: ContextMenuItemType, subItem: any, subIndex: number) => void;
  disabled?: boolean;
  variant?: 'default' | 'compact' | 'large';
  theme?: 'light' | 'dark';
}

// ContextMenu component with optimized functions
const SimpleContextMenu = ({ 
  childern = 'Right-click me', 
  items = [], 
  className = '', 
  children,
  onItemClick,
  onSubItemClick,
  disabled = false,
  variant = 'default',
  theme = 'light'
}: ContextMenuProps) => {
  // Parse and validate items
  const menuItems = useMemo(() => parseArrayProp(items, []), [items]);
  
  // Memoized click handlers
  const handleItemClick = useCallback((item: ContextMenuItemType, index: number) => {
    if (isItemDisabled(item) || disabled) return;
    
    if (item.onClick) {
      item.onClick();
    }
    
    if (onItemClick) {
      onItemClick(item, index);
    }
  }, [onItemClick, disabled]);

  const handleSubItemClick = useCallback((item: ContextMenuItemType, subItem: any, subIndex: number) => {
    if (subItem.disabled || disabled) return;
    
    if (subItem.onClick) {
      subItem.onClick();
    }
    
    if (onSubItemClick) {
      onSubItemClick(item, subItem, subIndex);
    }
  }, [onSubItemClick, disabled]);

  // Memoized render function
  const renderMenuItem = useCallback((item: ContextMenuItemType, index: number) => {
    const isDisabled = isItemDisabled(item) || disabled;
    
    if (item.type === 'label') {
      return (
        <ContextMenuItem 
          key={index} 
          disabled={isDisabled}
          onClick={() => handleItemClick(item, index)}
        >
          {item.title}
          {item.shortcut && <ContextMenuShortcut>{item.shortcut}</ContextMenuShortcut>}
        </ContextMenuItem>
      );
    }
    
    if (item.type === 'seperator') {
      return <ContextMenuSeparator key={index} />;
    }
    
    if (item.type === 'subMenu') {
      const subMenuClasses = getSubMenuClasses(theme);
      return (
        <ContextMenuSub key={index}>
          <ContextMenuSubTrigger inset disabled={isDisabled}>
            {item.title}
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className={`w-48 ${subMenuClasses}`}>
            {item.children?.map((child: any, childIndex: number) => (
              <ContextMenuItem 
                key={childIndex}
                disabled={child.disabled || disabled}
                onClick={() => handleSubItemClick(item, child, childIndex)}
              >
                {child.title}
                {child.shortcut && <ContextMenuShortcut>{child.shortcut}</ContextMenuShortcut>}
              </ContextMenuItem>
            ))}
          </ContextMenuSubContent>
        </ContextMenuSub>
      );
    }
    
    if (item.type === 'radio') {
      return (
        <ContextMenuRadioGroup key={index} value={item.value || ''}>
          <ContextMenuLabel inset>{item.title}</ContextMenuLabel>
          <ContextMenuSeparator />
          {item.children?.map((child: any, childIndex: number) => (
            <ContextMenuRadioItem 
              key={childIndex} 
              value={child.value || ''}
              disabled={child.disabled || disabled}
              onClick={() => handleSubItemClick(item, child, childIndex)}
            >
              {child.title}
            </ContextMenuRadioItem>
          ))}
        </ContextMenuRadioGroup>
      );
    }
    
    if (item.type === 'checkbox') {
      return (
        <ContextMenuCheckboxItem 
          key={index} 
          checked={item.checked}
          disabled={isDisabled}
          onClick={() => handleItemClick(item, index)}
        >
          {item.title}
          {item.shortcut && <ContextMenuShortcut>{item.shortcut}</ContextMenuShortcut>}
        </ContextMenuCheckboxItem>
      );
    }
    
    return null;
  }, [handleItemClick, handleSubItemClick, disabled]);

  // Memoized content classes
  const contentClasses = useMemo(() => {
    const variantClasses = getVariantClasses(variant);
    const themeClasses = getThemeClasses(theme);
    return `${variantClasses} ${themeClasses} ${className}`.trim();
  }, [variant, theme, className]);

  // Memoized menu items
  const renderedItems = useMemo(() => {
    return menuItems.map(renderMenuItem);
  }, [menuItems, renderMenuItem]);

  return (
    <ContextMenuComp>
      <ContextMenuTrigger disabled={disabled}>
        {children || childern}
      </ContextMenuTrigger>
      <ContextMenuContent className={contentClasses}>
        {renderedItems}
      </ContextMenuContent>
    </ContextMenuComp>
  );
};

// Export as ContextMenu for backward compatibility
const ContextMenu = SimpleContextMenu;

export {
  ContextMenu,
  SimpleContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuComp,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
};
