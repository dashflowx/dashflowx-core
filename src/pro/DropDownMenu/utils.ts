import React from 'react';

export interface DropdownMenuItemType {
  type: 'label' | 'seperator' | 'group' | 'item' | 'subMenu';
  title?: string | React.ReactNode;
  shortcut?: string | React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  children?: DropdownMenuItemType[];
  subChildren?: DropdownMenuItemType[];
}

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

export const getBackgroundClasses = (backgroundColor?: string, backgroundIntensity?: string) => {
  if (!backgroundColor) return '';
  
  switch (backgroundColor) {
    case 'transparent':
      return 'bg-transparent';
    case 'glass':
      return 'bg-white/10 backdrop-blur-md border-white/20';
    case 'gradient':
      return 'bg-gradient-to-br from-blue-500 to-purple-600 text-white';
    case 'gradient-blue':
      return 'bg-gradient-to-br from-blue-400 to-blue-600 text-white';
    case 'gradient-green':
      return 'bg-gradient-to-br from-green-400 to-green-600 text-white';
    case 'gradient-red':
      return 'bg-gradient-to-br from-red-400 to-red-600 text-white';
    case 'gradient-purple':
      return 'bg-gradient-to-br from-purple-400 to-purple-600 text-white';
    case 'gradient-pink':
      return 'bg-gradient-to-br from-pink-400 to-pink-600 text-white';
    case 'gradient-orange':
      return 'bg-gradient-to-br from-orange-400 to-orange-600 text-white';
    case 'gradient-teal':
      return 'bg-gradient-to-br from-teal-400 to-teal-600 text-white';
    case 'gradient-indigo':
      return 'bg-gradient-to-br from-indigo-400 to-indigo-600 text-white';
    case 'gradient-emerald':
      return 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white';
    case 'gradient-cyan':
      return 'bg-gradient-to-br from-cyan-400 to-cyan-600 text-white';
    case 'gradient-yellow':
      return 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white';
    case 'gradient-gray':
      return 'bg-gradient-to-br from-gray-400 to-gray-600 text-white';
    case 'gradient-slate':
      return 'bg-gradient-to-br from-slate-400 to-slate-600 text-white';
    case 'gradient-zinc':
      return 'bg-gradient-to-br from-zinc-400 to-zinc-600 text-white';
    case 'gradient-neutral':
      return 'bg-gradient-to-br from-neutral-400 to-neutral-600 text-white';
    case 'gradient-stone':
      return 'bg-gradient-to-br from-stone-400 to-stone-600 text-white';
    case 'gradient-rose':
      return 'bg-gradient-to-br from-rose-400 to-rose-600 text-white';
    case 'gradient-violet':
      return 'bg-gradient-to-br from-violet-400 to-violet-600 text-white';
    case 'gradient-fuchsia':
      return 'bg-gradient-to-br from-fuchsia-400 to-fuchsia-600 text-white';
    case 'gradient-lime':
      return 'bg-gradient-to-br from-lime-400 to-lime-600 text-white';
    case 'gradient-amber':
      return 'bg-gradient-to-br from-amber-400 to-amber-600 text-white';
    case 'gradient-sky':
      return 'bg-gradient-to-br from-sky-400 to-sky-600 text-white';
    default:
      const intensity = backgroundIntensity || '500';
      return `bg-${backgroundColor}-${intensity} text-white`;
  }
};

export const isItemDisabled = (item: DropdownMenuItemType) => {
  return item.disabled === true;
};

export const createMenuItem = (type: DropdownMenuItemType['type'], options: Partial<DropdownMenuItemType> = {}): DropdownMenuItemType => ({
  type,
  ...options
});

export const createLabelItem = (title: string, shortcut?: string, onClick?: () => void): DropdownMenuItemType =>
  createMenuItem('label', { title, shortcut, onClick });

export const createSeparatorItem = (): DropdownMenuItemType =>
  createMenuItem('seperator');

export const createGroupItem = (title: string, children: DropdownMenuItemType[] = []): DropdownMenuItemType =>
  createMenuItem('group', { title, children });

export const createSubMenuItem = (title: string, children: DropdownMenuItemType[] = []): DropdownMenuItemType =>
  createMenuItem('subMenu', { title, children });
