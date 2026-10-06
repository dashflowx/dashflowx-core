import type { ThHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

/**
 * @deprecated Prefer `@dashflowx/datagrid` for data grids. Core keeps this
 * presentational header cell so existing Markdoc/docs imports still compile (G02).
 */

export type ThVariant = 'default' | 'muted' | 'bordered' | 'soft';
export type ThSize = 'sm' | 'md' | 'lg';
export type ThAlign = 'left' | 'center' | 'right';

export interface iTh extends ThHTMLAttributes<HTMLTableCellElement> {
  variant?: ThVariant;
  size?: ThSize;
  align?: ThAlign;
  /** Stick the header cell while the table body scrolls. */
  sticky?: boolean;
  /** Truncate overflowing text with an ellipsis. */
  truncate?: boolean;
  /** Monospace type — useful for codes and IDs. */
  mono?: boolean;
}

export type ThProps = iTh;

const VARIANT_CLASSES: Record<ThVariant, string> = {
  default: 'font-semibold text-gray-900 dark:text-gray-100',
  muted: 'font-semibold text-gray-500 dark:text-gray-400',
  bordered: 'font-semibold border border-gray-200 text-gray-900 dark:border-gray-700 dark:text-gray-100',
  soft: 'font-semibold bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100',
};

const SIZE_CLASSES: Record<ThSize, string> = {
  sm: 'px-2 py-1.5 text-xs',
  md: 'px-3 py-2 text-sm',
  lg: 'px-4 py-3 text-base',
};

const ALIGN_CLASSES: Record<ThAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

function Th({
  className,
  variant = 'default',
  size = 'md',
  align = 'left',
  sticky = false,
  truncate = false,
  mono = false,
  children,
  ...props
}: ThProps) {
  return (
    <th
      className={cn(
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        ALIGN_CLASSES[align],
        sticky && 'sticky top-0 z-10 bg-white dark:bg-gray-950',
        truncate && 'max-w-[12rem] truncate',
        mono && 'font-mono',
        className
      )}
      {...props}
    >
      {children}
    </th>
  );
}

Th.displayName = 'Th';

/** @deprecated Use `Th`. Kept for existing `th` imports. */
const th = Th;

export { Th, th, VARIANT_CLASSES as TH_VARIANT_CLASSES, SIZE_CLASSES as TH_SIZE_CLASSES };
