import { cn } from '@/lib/utils';
import { ComponentPropsWithRef, forwardRef } from 'react';

export type LiVariant = 'default' | 'muted' | 'strong' | 'check' | 'bordered';
export type LiSpacing = 'none' | 'sm' | 'md' | 'lg';
export type LiSize = 'sm' | 'md' | 'lg';

export interface LiProps extends ComponentPropsWithRef<'li'> {
  variant?: LiVariant;
  spacing?: LiSpacing;
  size?: LiSize;
}

const VARIANT_CLASSES: Record<LiVariant, string> = {
  default: '',
  muted: 'text-gray-500',
  strong: 'font-semibold text-gray-900 dark:text-gray-100',
  check: "list-none before:mr-2 before:text-green-600 before:content-['✓']",
  bordered: 'border-l-2 border-gray-200 pl-3 dark:border-gray-600',
};

const SPACING_CLASSES: Record<LiSpacing, string> = {
  none: 'mt-0',
  sm: 'mt-2',
  md: 'mt-4',
  lg: 'mt-6',
};

const SIZE_CLASSES: Record<LiSize, string> = {
  sm: 'text-sm',
  md: '',
  lg: 'text-lg',
};

export const Li = forwardRef<HTMLLIElement, LiProps>(
  (
    {
      children,
      className,
      variant = 'default',
      spacing = 'sm',
      size = 'md',
      ...props
    },
    ref
  ) => {
    return (
      <li
        ref={ref}
        className={cn(
          SPACING_CLASSES[spacing],
          VARIANT_CLASSES[variant],
          SIZE_CLASSES[size],
          className
        )}
        {...props}
      >
        {children}
      </li>
    );
  }
);

Li.displayName = 'Li';

/** @deprecated Use `Li`. Kept for existing `li` imports. */
export const li = Li;
