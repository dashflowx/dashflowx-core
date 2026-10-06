import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { TabsComp, TabsContent, TabsList, TabsTrigger } from './TabsComp';

export type TabsVariant = 'default' | 'underline' | 'pills' | 'boxed';
export type TabsSize = 'sm' | 'md' | 'lg';
export type TabsOrientation = 'horizontal' | 'vertical';

export interface iTabsItem {
  id: string | number;
  /** Preferred visible label. */
  label?: string;
  /** @deprecated Prefer `label`. Kept for existing callers. */
  title?: string;
  content: ReactNode;
  disabled?: boolean;
}

export interface iTabs {
  tabsArray: iTabsItem[];
  /** Initial tab id (or numeric index into `tabsArray`). */
  defaultActive?: string | number;
  value?: string;
  onValueChange?: (value: string) => void;
  variant?: TabsVariant;
  size?: TabsSize;
  orientation?: TabsOrientation;
  fullWidth?: boolean;
  className?: string;
  listClassName?: string;
  buttonClassName?: string;
  contentClassName?: string;
}

export type TabsProps = iTabs;

const LIST_VARIANT: Record<TabsVariant, string> = {
  default: 'rounded-md bg-gray-100 p-1 dark:bg-gray-800',
  underline: 'gap-1 border-b border-gray-200 dark:border-gray-700',
  pills: 'gap-2',
  boxed: 'gap-0 rounded-lg border border-gray-200 p-1 dark:border-gray-700',
};

const TRIGGER_VARIANT: Record<TabsVariant, string> = {
  default:
    'rounded-sm text-gray-600 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm dark:text-gray-300 dark:data-[state=active]:bg-gray-950 dark:data-[state=active]:text-gray-50',
  underline:
    'rounded-none border-b-2 border-transparent text-gray-500 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 dark:text-gray-400 dark:data-[state=active]:text-blue-400',
  pills:
    'rounded-full text-gray-600 data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:text-gray-300',
  boxed:
    'rounded-md text-gray-600 data-[state=active]:bg-gray-900 data-[state=active]:text-white dark:text-gray-300 dark:data-[state=active]:bg-gray-100 dark:data-[state=active]:text-gray-900',
};

const SIZE_TRIGGER: Record<TabsSize, string> = {
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base',
};

const SIZE_CONTENT: Record<TabsSize, string> = {
  sm: 'mt-3 text-sm',
  md: 'mt-4 text-sm',
  lg: 'mt-5 text-base',
};

function tabLabel(tab: iTabsItem) {
  return tab.label ?? tab.title ?? String(tab.id);
}

function resolveDefaultValue(tabs: iTabsItem[], defaultActive?: string | number) {
  if (tabs.length === 0) return undefined;
  if (defaultActive === undefined) return String(tabs[0].id);

  const byId = tabs.find((tab) => String(tab.id) === String(defaultActive));
  if (byId) return String(byId.id);

  if (typeof defaultActive === 'number' && tabs[defaultActive]) {
    return String(tabs[defaultActive].id);
  }

  return String(tabs[0].id);
}

function Tabs({
  tabsArray,
  defaultActive,
  value,
  onValueChange,
  variant = 'default',
  size = 'md',
  orientation = 'horizontal',
  fullWidth = false,
  className,
  listClassName,
  buttonClassName,
  contentClassName,
}: TabsProps) {
  if (tabsArray.length === 0) return null;

  const defaultValue = resolveDefaultValue(tabsArray, defaultActive);
  const vertical = orientation === 'vertical';

  return (
    <TabsComp
      defaultValue={value === undefined ? defaultValue : undefined}
      value={value}
      onValueChange={onValueChange}
      orientation={orientation}
      className={cn(vertical ? 'flex gap-4' : 'w-full', className)}
    >
      <TabsList
        className={cn(
          vertical ? 'flex-col items-stretch' : 'flex-row',
          fullWidth && !vertical && 'w-full',
          LIST_VARIANT[variant],
          listClassName
        )}
      >
        {tabsArray.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={String(tab.id)}
            disabled={tab.disabled}
            className={cn(
              SIZE_TRIGGER[size],
              TRIGGER_VARIANT[variant],
              fullWidth && !vertical && 'flex-1',
              buttonClassName
            )}
          >
            {tabLabel(tab)}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabsArray.map((tab) => (
        <TabsContent
          key={tab.id}
          value={String(tab.id)}
          className={cn(SIZE_CONTENT[size], 'w-full', contentClassName)}
        >
          {tab.content}
        </TabsContent>
      ))}
    </TabsComp>
  );
}

Tabs.displayName = 'Tabs';

export { Tabs, TabsComp, TabsContent, TabsList, TabsTrigger };
