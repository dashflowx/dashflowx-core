import * as React from 'react';

import { cn } from '@/lib/utils';
import {
  NavigationMenuComp,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from './NavigationMenuComp';

// Type definitions
export interface NavigationMenuItemType {
  id: string;
  title: string;
  href?: string;
  description?: string;
  type: 'link' | 'dropdown';
  items?: NavigationMenuItemType[];
  disabled?: boolean;
  icon?: React.ReactNode;
  badge?: string | number;
  onClick?: () => void;
}

type BackgroundColorType = 
  | 'default' | 'white' | 'gray' | 'blue' | 'green' | 'red' | 'yellow' | 'purple' 
  | 'indigo' | 'pink' | 'orange' | 'teal' | 'cyan' | 'emerald' | 'lime' | 'amber' 
  | 'rose' | 'violet' | 'fuchsia' | 'sky' | 'slate' | 'zinc' | 'neutral' | 'stone' 
  | 'glass' | 'gradient-blue' | 'gradient-green' | 'gradient-purple' | 'gradient-pink' 
  | 'gradient-orange' | 'gradient-teal' | 'gradient-cyan' | 'gradient-indigo' 
  | 'gradient-violet' | 'gradient-rose' | 'gradient-emerald' | 'gradient-lime' 
  | 'gradient-amber' | 'gradient-sky' | 'gradient-slate' | 'gradient-zinc' 
  | 'gradient-neutral' | 'gradient-stone' | 'gradient-rainbow';

type HoverBackgroundColorType = 
  | 'default' | 'gray' | 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'indigo' 
  | 'pink' | 'orange' | 'teal' | 'cyan' | 'emerald' | 'lime' | 'amber' | 'rose' 
  | 'violet' | 'fuchsia' | 'sky' | 'slate' | 'zinc' | 'neutral' | 'stone' | 'accent';

type IntensityType = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
type VariantType = 'default' | 'minimal' | 'bold';
type ThemeType = 'light' | 'dark' | 'primary';

export interface NavigationMenuProps {
  items?: NavigationMenuItemType[];
  className?: string;
  onItemClick?: (item: NavigationMenuItemType) => void;
  showIcons?: boolean;
  showBadges?: boolean;
  backgroundColor?: BackgroundColorType;
  backgroundIntensity?: IntensityType;
  customBgColor?: string;
  hoverBackgroundColor?: HoverBackgroundColorType;
  hoverBackgroundIntensity?: IntensityType;
  customHoverBgColor?: string;
  variant?: VariantType;
  theme?: ThemeType;
}

// Default items
const defaultItems: NavigationMenuItemType[] = [
  {
    id: 'getting-started',
    title: 'Getting started',
    type: 'dropdown',
    items: [
      {
        id: 'intro',
        title: 'Introduction',
        href: '/docs',
        description: 'Re-usable components built using Radix UI and Tailwind CSS.',
        type: 'link'
      },
      {
        id: 'installation',
        title: 'Installation',
        href: '/docs/installation',
        description: 'How to install dependencies and structure your app.',
        type: 'link'
      },
      {
        id: 'typography',
        title: 'Typography',
        href: '/docs/primitives/typography',
        description: 'Styles for headings, paragraphs, lists...etc',
        type: 'link'
      }
    ]
  },
  {
    id: 'components',
    title: 'Components',
    type: 'dropdown',
    items: [
      {
        id: 'alert-dialog',
        title: 'Alert Dialog',
        href: '/docs/primitives/alert-dialog',
        description: 'A modal dialog that interrupts the user with important content and expects a response.',
        type: 'link'
      },
      {
        id: 'hover-card',
        title: 'Hover Card',
        href: '/docs/primitives/hover-card',
        description: 'For sighted users to preview content available behind a link.',
        type: 'link'
      },
      {
        id: 'progress',
        title: 'Progress',
        href: '/docs/primitives/progress',
        description: 'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
        type: 'link'
      },
      {
        id: 'scroll-area',
        title: 'Scroll-area',
        href: '/docs/primitives/scroll-area',
        description: 'Visually or semantically separates content.',
        type: 'link'
      },
      {
        id: 'tabs',
        title: 'Tabs',
        href: '/docs/primitives/tabs',
        description: 'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
        type: 'link'
      },
      {
        id: 'tooltip',
        title: 'Tooltip',
        href: '/docs/primitives/tooltip',
        description: 'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
        type: 'link'
      }
    ]
  },
  {
    id: 'documentation',
    title: 'Documentation',
    href: '/docs',
    type: 'link'
  }
];

// Utility functions
const getBackgroundClasses = (
  backgroundColor: BackgroundColorType = 'white',
  backgroundIntensity: IntensityType = '500',
  customBgColor?: string
): string => {
  if (customBgColor) return customBgColor;

  const colorMap: Record<string, string> = {
    white: 'bg-white',
    gray: `bg-gray-${backgroundIntensity}`,
    blue: `bg-blue-${backgroundIntensity}`,
    green: `bg-green-${backgroundIntensity}`,
    red: `bg-red-${backgroundIntensity}`,
    yellow: `bg-yellow-${backgroundIntensity}`,
    purple: `bg-purple-${backgroundIntensity}`,
    indigo: `bg-indigo-${backgroundIntensity}`,
    pink: `bg-pink-${backgroundIntensity}`,
    orange: `bg-orange-${backgroundIntensity}`,
    teal: `bg-teal-${backgroundIntensity}`,
    cyan: `bg-cyan-${backgroundIntensity}`,
    emerald: `bg-emerald-${backgroundIntensity}`,
    lime: `bg-lime-${backgroundIntensity}`,
    amber: `bg-amber-${backgroundIntensity}`,
    rose: `bg-rose-${backgroundIntensity}`,
    violet: `bg-violet-${backgroundIntensity}`,
    fuchsia: `bg-fuchsia-${backgroundIntensity}`,
    sky: `bg-sky-${backgroundIntensity}`,
    slate: `bg-slate-${backgroundIntensity}`,
    zinc: `bg-zinc-${backgroundIntensity}`,
    neutral: `bg-neutral-${backgroundIntensity}`,
    stone: `bg-stone-${backgroundIntensity}`,
    glass: 'bg-white/10 backdrop-blur-md border border-white/20',
    'gradient-blue': 'bg-gradient-to-r from-blue-500 to-blue-700',
    'gradient-green': 'bg-gradient-to-r from-green-500 to-green-700',
    'gradient-purple': 'bg-gradient-to-r from-purple-500 to-purple-700',
    'gradient-pink': 'bg-gradient-to-r from-pink-500 to-pink-700',
    'gradient-orange': 'bg-gradient-to-r from-orange-500 to-orange-700',
    'gradient-teal': 'bg-gradient-to-r from-teal-500 to-teal-700',
    'gradient-cyan': 'bg-gradient-to-r from-cyan-500 to-cyan-700',
    'gradient-indigo': 'bg-gradient-to-r from-indigo-500 to-indigo-700',
    'gradient-violet': 'bg-gradient-to-r from-violet-500 to-violet-700',
    'gradient-rose': 'bg-gradient-to-r from-rose-500 to-rose-700',
    'gradient-emerald': 'bg-gradient-to-r from-emerald-500 to-emerald-700',
    'gradient-lime': 'bg-gradient-to-r from-lime-500 to-lime-700',
    'gradient-amber': 'bg-gradient-to-r from-amber-500 to-amber-700',
    'gradient-sky': 'bg-gradient-to-r from-sky-500 to-sky-700',
    'gradient-slate': 'bg-gradient-to-r from-slate-500 to-slate-700',
    'gradient-zinc': 'bg-gradient-to-r from-zinc-500 to-zinc-700',
    'gradient-neutral': 'bg-gradient-to-r from-neutral-500 to-neutral-700',
    'gradient-stone': 'bg-gradient-to-r from-stone-500 to-stone-700',
    'gradient-rainbow': 'bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500',
  };

  return colorMap[backgroundColor] || 'bg-background';
};

const getHoverBackgroundClasses = (
  hoverBackgroundColor: HoverBackgroundColorType = 'gray',
  hoverBackgroundIntensity: IntensityType = '100',
  customHoverBgColor?: string
): string => {
  if (customHoverBgColor) return customHoverBgColor;

  const hoverColorMap: Record<string, string> = {
    gray: `hover:bg-gray-${hoverBackgroundIntensity}`,
    blue: `hover:bg-blue-${hoverBackgroundIntensity}`,
    green: `hover:bg-green-${hoverBackgroundIntensity}`,
    red: `hover:bg-red-${hoverBackgroundIntensity}`,
    yellow: `hover:bg-yellow-${hoverBackgroundIntensity}`,
    purple: `hover:bg-purple-${hoverBackgroundIntensity}`,
    indigo: `hover:bg-indigo-${hoverBackgroundIntensity}`,
    pink: `hover:bg-pink-${hoverBackgroundIntensity}`,
    orange: `hover:bg-orange-${hoverBackgroundIntensity}`,
    teal: `hover:bg-teal-${hoverBackgroundIntensity}`,
    cyan: `hover:bg-cyan-${hoverBackgroundIntensity}`,
    emerald: `hover:bg-emerald-${hoverBackgroundIntensity}`,
    lime: `hover:bg-lime-${hoverBackgroundIntensity}`,
    amber: `hover:bg-amber-${hoverBackgroundIntensity}`,
    rose: `hover:bg-rose-${hoverBackgroundIntensity}`,
    violet: `hover:bg-violet-${hoverBackgroundIntensity}`,
    fuchsia: `hover:bg-fuchsia-${hoverBackgroundIntensity}`,
    sky: `hover:bg-sky-${hoverBackgroundIntensity}`,
    slate: `hover:bg-slate-${hoverBackgroundIntensity}`,
    zinc: `hover:bg-zinc-${hoverBackgroundIntensity}`,
    neutral: `hover:bg-neutral-${hoverBackgroundIntensity}`,
    stone: `hover:bg-stone-${hoverBackgroundIntensity}`,
    accent: 'hover:bg-accent',
  };

  return hoverColorMap[hoverBackgroundColor] || 'hover:bg-accent';
};

const getThemeClasses = (theme: ThemeType = 'light'): string => {
  const themeMap: Record<ThemeType, string> = {
    dark: 'text-white',
    primary: 'text-primary',
    light: 'text-foreground',
  };
  return themeMap[theme];
};

const getVariantClasses = (variant: VariantType = 'default'): string => {
  const variantMap: Record<VariantType, string> = {
    minimal: 'px-2 py-1 text-sm',
    bold: 'px-6 py-3 text-lg font-bold',
    default: 'px-4 py-2',
  };
  return variantMap[variant];
};

// Optimized NavigationMenu Component
const NavigationMenu: React.FC<NavigationMenuProps> = React.memo(({
  items = defaultItems,
  className,
  onItemClick,
  showIcons = true,
  showBadges = true,
  backgroundColor = 'white',
  backgroundIntensity = '500',
  customBgColor,
  hoverBackgroundColor = 'gray',
  hoverBackgroundIntensity = '100',
  customHoverBgColor,
  variant = 'default',
  theme = 'light',
}) => {
  const handleItemClick = React.useCallback((item: NavigationMenuItemType) => {
    if (item.disabled) return;
    
    if (item.onClick) {
      item.onClick();
    }
    
    if (onItemClick) {
      onItemClick(item);
    }
  }, [onItemClick]);

  const backgroundClasses = React.useMemo(() => 
    getBackgroundClasses(backgroundColor, backgroundIntensity, customBgColor),
    [backgroundColor, backgroundIntensity, customBgColor]
  );

  const hoverBackgroundClasses = React.useMemo(() => 
    getHoverBackgroundClasses(hoverBackgroundColor, hoverBackgroundIntensity, customHoverBgColor),
    [hoverBackgroundColor, hoverBackgroundIntensity, customHoverBgColor]
  );

  const themeClasses = React.useMemo(() => 
    getThemeClasses(theme),
    [theme]
  );

  const variantClasses = React.useMemo(() => 
    getVariantClasses(variant),
    [variant]
  );

  // Custom trigger style with hover background
  const customTriggerStyle = React.useMemo(() => cn(
    'group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50',
    hoverBackgroundClasses,
    'hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
  ), [hoverBackgroundClasses]);

  const renderMenuItem = React.useCallback((item: NavigationMenuItemType) => {
    if (item.type === 'dropdown' && item.items) {
      return (
        <NavigationMenuItem key={item.id}>
          <NavigationMenuTrigger className={customTriggerStyle}>
            <div className="flex items-center space-x-2">
              {showIcons && item.icon && (
                <span className="flex-shrink-0">{item.icon}</span>
              )}
              <span>{item.title}</span>
              {showBadges && item.badge && (
                <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {item.items.map((subItem) => (
                <ListItem
                  key={subItem.id}
                  title={subItem.title}
                  href={subItem.href}
                  onClick={() => handleItemClick(subItem)}
                  disabled={subItem.disabled}
                >
                  {subItem.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      );
    }

    if (item.type === 'link') {
      return (
        <NavigationMenuItem key={item.id}>
          <NavigationMenuLink 
            className={customTriggerStyle}
            href={item.href}
            onClick={() => handleItemClick(item)}
          >
            <div className="flex items-center space-x-2">
              {showIcons && item.icon && (
                <span className="flex-shrink-0">{item.icon}</span>
              )}
              <span>{item.title}</span>
              {showBadges && item.badge && (
                <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
          </NavigationMenuLink>
        </NavigationMenuItem>
      );
    }

    return null;
  }, [customTriggerStyle, showIcons, showBadges, handleItemClick]);

  return (
    <NavigationMenuComp className={cn(backgroundClasses, themeClasses, variantClasses, className)}>
      <NavigationMenuList>
        {items.map(renderMenuItem)}
      </NavigationMenuList>
    </NavigationMenuComp>
  );
});

NavigationMenu.displayName = 'NavigationMenu';

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & { disabled?: boolean }
>(({ className, title, children, disabled, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

export {
  NavigationMenu,
  NavigationMenuComp,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
};