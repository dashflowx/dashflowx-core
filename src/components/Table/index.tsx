import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * @deprecated Prefer `@dashflowx/datagrid` for data grids. Core keeps this
 * presentational HTML table so existing Markdoc/docs imports still compile (G02).
 */

export type TableVariant = 'default' | 'striped' | 'bordered' | 'muted';
export type TableSize = 'sm' | 'md' | 'lg';

export interface iTable extends HTMLAttributes<HTMLTableElement> {
  variant?: TableVariant;
  size?: TableSize;
  /** Wrap in a horizontal scroll container. Default true. */
  scrollable?: boolean;
  /** Stick thead cells to the top while scrolling. */
  stickyHeader?: boolean;
  caption?: ReactNode;
  wrapperClassName?: string;
}

export type TableProps = iTable;

const VARIANT_CLASSES: Record<TableVariant, string> = {
  default: '[&_tbody_tr]:border-b [&_tbody_tr]:border-gray-200 dark:[&_tbody_tr]:border-gray-700',
  striped:
    '[&_tbody_tr]:border-b [&_tbody_tr]:border-gray-200 dark:[&_tbody_tr]:border-gray-700 [&_tbody_tr:nth-child(even)]:bg-gray-50 dark:[&_tbody_tr:nth-child(even)]:bg-gray-900/60',
  bordered:
    'border border-gray-200 dark:border-gray-700 [&_th]:border [&_td]:border [&_th]:border-gray-200 [&_td]:border-gray-200 dark:[&_th]:border-gray-700 dark:[&_td]:border-gray-700',
  muted:
    '[&_thead]:bg-gray-100 dark:[&_thead]:bg-gray-900 [&_tbody_tr]:border-b [&_tbody_tr]:border-gray-200 dark:[&_tbody_tr]:border-gray-700',
};

const SIZE_CLASSES: Record<TableSize, string> = {
  sm: 'text-xs [&_th]:px-2 [&_th]:py-1.5 [&_td]:px-2 [&_td]:py-1.5',
  md: 'text-sm [&_th]:px-3 [&_th]:py-2 [&_td]:px-3 [&_td]:py-2',
  lg: 'text-base [&_th]:px-4 [&_th]:py-3 [&_td]:px-4 [&_td]:py-3',
};

const STICKY_HEADER =
  '[&_thead_th]:sticky [&_thead_th]:top-0 [&_thead_th]:z-10 [&_thead_th]:bg-white dark:[&_thead_th]:bg-gray-950';

function Table({
  className,
  variant = 'default',
  size = 'md',
  scrollable = true,
  stickyHeader = false,
  caption,
  wrapperClassName,
  children,
  ...props
}: TableProps) {
  const tableEl = (
    <table
      className={cn(
        'w-full caption-bottom text-left',
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        stickyHeader && STICKY_HEADER,
        className
      )}
      {...props}
    >
      {caption ? <caption className="mt-2 text-sm text-gray-500 dark:text-gray-400">{caption}</caption> : null}
      {children}
    </table>
  );

  if (!scrollable) return tableEl;

  return (
    <div className={cn('my-6 w-full overflow-x-auto', wrapperClassName)}>{tableEl}</div>
  );
}

Table.displayName = 'Table';

/** @deprecated Use `Table`. Kept for existing `table` imports. */
const table = Table;

export { Table, table, VARIANT_CLASSES as TABLE_VARIANT_CLASSES, SIZE_CLASSES as TABLE_SIZE_CLASSES };
