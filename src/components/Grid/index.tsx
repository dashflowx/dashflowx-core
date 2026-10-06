import { cn } from '@/lib/utils';
import { ComponentPropsWithRef, forwardRef } from 'react';

export type GridVariant = 'default' | 'auto-fit' | 'auto-fill' | 'dense';
export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 12;
export type GridGap = 'none' | 'sm' | 'md' | 'lg' | 'xl';
export type GridAlign = 'start' | 'center' | 'end' | 'stretch';

export interface GridProps extends ComponentPropsWithRef<'div'> {
  variant?: GridVariant;
  columns?: GridColumns;
  mdColumns?: GridColumns;
  lgColumns?: GridColumns;
  gap?: GridGap;
  align?: GridAlign;
}

const COLUMN_CLASSES: Record<GridColumns, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  12: 'grid-cols-12',
};

const MD_COLUMN_CLASSES: Record<GridColumns, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
  5: 'md:grid-cols-5',
  6: 'md:grid-cols-6',
  12: 'md:grid-cols-12',
};

const LG_COLUMN_CLASSES: Record<GridColumns, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
  6: 'lg:grid-cols-6',
  12: 'lg:grid-cols-12',
};

const GAP_CLASSES: Record<GridGap, string> = {
  none: 'gap-0',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
};

const ALIGN_CLASSES: Record<GridAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

const isAutoTemplate = (variant: GridVariant) =>
  variant === 'auto-fit' || variant === 'auto-fill';

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      children,
      className,
      variant = 'default',
      columns = 2,
      mdColumns = 3,
      lgColumns,
      gap = 'md',
      align = 'stretch',
      ...props
    },
    ref
  ) => {
    const auto = isAutoTemplate(variant);
    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          variant === 'auto-fit' &&
            'grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]',
          variant === 'auto-fill' &&
            'grid-cols-[repeat(auto-fill,minmax(10rem,1fr))]',
          variant === 'dense' && 'grid-flow-dense',
          !auto && COLUMN_CLASSES[columns],
          !auto && MD_COLUMN_CLASSES[mdColumns],
          !auto && lgColumns != null && LG_COLUMN_CLASSES[lgColumns],
          GAP_CLASSES[gap],
          ALIGN_CLASSES[align],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';
