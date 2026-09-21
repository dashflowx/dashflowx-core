import React from 'react';

export interface ContextMenuItemType {
  type: 'label' | 'seperator' | 'subMenu' | 'radio' | 'checkbox';
  title?: string | React.ReactNode;
  shortcut?: string | React.ReactNode;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children?: {
    title: string | React.ReactNode;
    shortcut?: string | React.ReactNode;
    value?: string;
    disabled?: boolean;
    onClick?: () => void;
  }[];
}

// Utility functions
export const parseArrayProp = (prop: any, defaultValue: any[]) => {
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

export const getVariantClasses = (variant: string) => {
  switch (variant) {
    case 'compact':
      return 'min-w-40 text-xs';
    case 'large':
      return 'min-w-72 text-base';
    default:
      return 'min-w-56 text-sm';
  }
};

export const getThemeClasses = (theme: string) => {
  switch (theme) {
    case 'dark':
      return 'bg-gray-900 text-white border-gray-700';
    default:
      return 'bg-white text-gray-900 border-gray-200';
  }
};

export const getSubMenuClasses = (theme: string) => {
  switch (theme) {
    case 'dark':
      return 'bg-gray-800 text-white border-gray-600';
    default:
      return 'bg-gray-50 text-gray-900 border-gray-200';
  }
};

export const isItemDisabled = (item: ContextMenuItemType) => {
  return item.disabled === true;
};

// Helper functions for creating menu items
export const createMenuItem = (type: ContextMenuItemType['type'], options: Partial<ContextMenuItemType> = {}): ContextMenuItemType => ({
  type,
  ...options
});

export const createLabelItem = (title: string, shortcut?: string, onClick?: () => void): ContextMenuItemType => 
  createMenuItem('label', { title, shortcut, onClick });

export const createSeparatorItem = (): ContextMenuItemType => 
  createMenuItem('seperator');

export const createSubMenuItem = (title: string, children: ContextMenuItemType['children'] = []): ContextMenuItemType => 
  createMenuItem('subMenu', { title, children });

export const createRadioGroup = (title: string, value: string, children: ContextMenuItemType['children'] = []): ContextMenuItemType => 
  createMenuItem('radio', { title, value, children });

export const createCheckboxItem = (title: string, checked: boolean = false, shortcut?: string, onClick?: () => void): ContextMenuItemType => 
  createMenuItem('checkbox', { title, checked, shortcut, onClick });
