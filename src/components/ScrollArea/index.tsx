import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';
import { SeparatorComp } from '../Separator/SeparatorComp';
import { ScrollAreaComp, ScrollBar } from './ScrollAreaComp';

export type ScrollAreaVariant = 'default' | 'bordered' | 'soft' | 'ghost';
export type ScrollAreaSize = 'sm' | 'md' | 'lg' | 'xl';
export type ScrollAreaOrientation = 'vertical' | 'horizontal' | 'both';

export interface ScrollAreaProps {
  children?: ReactNode;
  /** Convenience list rendered when `children` is omitted. */
  items?: string[];
  title?: string;
  showSeparators?: boolean;
  variant?: ScrollAreaVariant;
  size?: ScrollAreaSize;
  orientation?: ScrollAreaOrientation;
  className?: string;
  contentClassName?: string;
  type?: 'auto' | 'always' | 'scroll' | 'hover';
}

const SIZE_CLASSES: Record<ScrollAreaSize, string> = {
  sm: 'h-48 w-40',
  md: 'h-72 w-48',
  lg: 'h-96 w-64',
  xl: 'h-[28rem] w-80',
};

const VARIANT_CLASSES: Record<ScrollAreaVariant, string> = {
  default: 'rounded-md border',
  bordered: 'rounded-lg border-2 border-gray-400',
  soft: 'rounded-md border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900',
  ghost: 'rounded-md',
};

const DEFAULT_ITEMS = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

function ScrollArea({
  children,
  items,
  title = 'Tags',
  showSeparators = true,
  variant = 'default',
  size = 'md',
  orientation = 'vertical',
  className,
  contentClassName,
  type,
}: ScrollAreaProps) {
  const list = items ?? (children ? undefined : DEFAULT_ITEMS);

  return (
    <ScrollAreaComp
      type={type}
      orientation={orientation}
      className={cn(SIZE_CLASSES[size], VARIANT_CLASSES[variant], className)}
    >
      {children ?? (
        <div className={cn('p-4', contentClassName)}>
          {title ? (
            <h4 className="mb-4 text-sm font-medium leading-none">{title}</h4>
          ) : null}
          {list?.map((tag) => (
            <div key={tag}>
              <div className="text-sm">{tag}</div>
              {showSeparators ? <SeparatorComp className="my-2" /> : null}
            </div>
          ))}
        </div>
      )}
    </ScrollAreaComp>
  );
}

ScrollArea.displayName = 'ScrollArea';

export { ScrollArea, ScrollAreaComp, ScrollBar };
