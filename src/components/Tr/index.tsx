import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

/**
 * @deprecated Prefer `@dashflowx/datagrid` for data grids. Core keeps this
 * presentational row so existing Markdoc/docs imports still compile (G02).
 */

export type TrVariant = 'default' | 'muted' | 'striped' | 'bordered' | 'selected' | 'soft';
export type TrSize = 'sm' | 'md' | 'lg';

export interface iTr extends HTMLAttributes<HTMLTableRowElement> {
  variant?: TrVariant;
  size?: TrSize;
  /** Highlight as the active / selected row. */
  selected?: boolean;
  /** Soft hover background. */
  hoverable?: boolean;
  /** Stick the row while the table body scrolls (header rows). */
  sticky?: boolean;
}

export type TrProps = iTr;

const VARIANT_CLASSES: Record<TrVariant, string> = {
  default: 'border-t border-gray-200 dark:border-gray-700',
  muted: 'border-t border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/40',
  striped:
    'border-t border-gray-200 even:bg-gray-50 dark:border-gray-700 dark:even:bg-gray-900/40',
  bordered: 'border border-gray-200 dark:border-gray-700',
  selected: 'border-t border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/40',
  soft: 'border-t border-gray-100 bg-gray-50/80 dark:border-gray-800 dark:bg-gray-900/20',
};

const SIZE_CLASSES: Record<TrSize, string> = {
  sm: '[&>td]:px-2 [&>td]:py-1.5 [&>td]:text-xs [&>th]:px-2 [&>th]:py-1.5 [&>th]:text-xs',
  md: '[&>td]:px-3 [&>td]:py-2 [&>td]:text-sm [&>th]:px-3 [&>th]:py-2 [&>th]:text-sm',
  lg: '[&>td]:px-4 [&>td]:py-3 [&>td]:text-base [&>th]:px-4 [&>th]:py-3 [&>th]:text-base',
};

function Tr({
  className,
  variant = 'default',
  size = 'md',
  selected = false,
  hoverable = false,
  sticky = false,
  children,
  ...props
}: TrProps) {
  return (
    <tr
      className={cn(
        'm-0 p-0',
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        selected &&
          'border-t border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/40',
        hoverable && 'hover:bg-gray-50 dark:hover:bg-gray-900/50',
        sticky && 'sticky top-0 z-10 bg-white dark:bg-gray-950',
        className
      )}
      data-selected={selected || undefined}
      {...props}
    >
      {children}
    </tr>
  );
}

Tr.displayName = 'Tr';

/** @deprecated Use `Tr`. Kept for existing `tr` imports. */
const tr = Tr;

export { Tr, tr, VARIANT_CLASSES as TR_VARIANT_CLASSES, SIZE_CLASSES as TR_SIZE_CLASSES };
