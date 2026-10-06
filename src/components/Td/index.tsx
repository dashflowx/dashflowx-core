import type { TdHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

/**
 * @deprecated Prefer `@dashflowx/datagrid` for data grids. Core keeps this
 * presentational cell so existing Markdoc/docs imports still compile (G02).
 */

export type TdVariant = 'default' | 'muted' | 'bordered' | 'numeric';
export type TdSize = 'sm' | 'md' | 'lg';
export type TdAlign = 'left' | 'center' | 'right';

export interface iTd extends TdHTMLAttributes<HTMLTableCellElement> {
  variant?: TdVariant;
  size?: TdSize;
  align?: TdAlign;
  /** Truncate overflowing text with an ellipsis. */
  truncate?: boolean;
  /** Monospace type — useful for IDs and amounts. */
  mono?: boolean;
}

export type TdProps = iTd;

const VARIANT_CLASSES: Record<TdVariant, string> = {
  default: 'text-gray-900 dark:text-gray-100',
  muted: 'text-gray-500 dark:text-gray-400',
  bordered: 'border border-gray-200 dark:border-gray-700',
  numeric: 'tabular-nums text-gray-900 dark:text-gray-100',
};

const SIZE_CLASSES: Record<TdSize, string> = {
  sm: 'px-2 py-1.5 text-xs',
  md: 'px-3 py-2 text-sm',
  lg: 'px-4 py-3 text-base',
};

const ALIGN_CLASSES: Record<TdAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

function Td({
  className,
  variant = 'default',
  size = 'md',
  align = 'left',
  truncate = false,
  mono = false,
  children,
  ...props
}: TdProps) {
  return (
    <td
      className={cn(
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        ALIGN_CLASSES[align],
        truncate && 'max-w-[12rem] truncate',
        mono && 'font-mono',
        className
      )}
      {...props}
    >
      {children}
    </td>
  );
}

Td.displayName = 'Td';

/** @deprecated Use `Td`. Kept for existing `td` imports. */
const td = Td;

export { Td, td, VARIANT_CLASSES as TD_VARIANT_CLASSES, SIZE_CLASSES as TD_SIZE_CLASSES };
