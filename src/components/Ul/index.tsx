import { cn } from '@/lib/utils';
import { ComponentPropsWithRef, forwardRef } from 'react';

export type UlVariant = 'default' | 'circle' | 'square' | 'inside' | 'muted';
export type UlSpacing = 'none' | 'sm' | 'md' | 'lg';
export type UlIndent = 'none' | 'sm' | 'md' | 'lg';
export type UlSize = 'sm' | 'md' | 'lg';

export interface UlProps extends ComponentPropsWithRef<'ul'> {
  variant?: UlVariant;
  spacing?: UlSpacing;
  indent?: UlIndent;
  size?: UlSize;
}

const VARIANT_CLASSES: Record<UlVariant, string> = {
  default: 'list-disc',
  circle: 'list-[circle]',
  square: 'list-[square]',
  inside: 'list-disc list-inside',
  muted: 'list-disc text-gray-500',
};

const SPACING_CLASSES: Record<UlSpacing, string> = {
  none: 'my-0',
  sm: 'my-2',
  md: 'my-6',
  lg: 'my-8',
};

const INDENT_CLASSES: Record<UlIndent, string> = {
  none: 'ml-0',
  sm: 'ml-3',
  md: 'ml-6',
  lg: 'ml-10',
};

const SIZE_CLASSES: Record<UlSize, string> = {
  sm: 'text-sm',
  md: '',
  lg: 'text-lg',
};

export const Ul = forwardRef<HTMLUListElement, UlProps>(
  (
    {
      children,
      className,
      variant = 'default',
      spacing = 'none',
      indent = 'md',
      size = 'md',
      ...props
    },
    ref
  ) => {
    return (
      <ul
        ref={ref}
        className={cn(
          SPACING_CLASSES[spacing],
          INDENT_CLASSES[indent],
          VARIANT_CLASSES[variant],
          SIZE_CLASSES[size],
          className
        )}
        {...props}
      >
        {children}
      </ul>
    );
  }
);

Ul.displayName = 'Ul';

/** @deprecated Use `Ul`. Kept for existing `ul` imports. */
export const ul = Ul;
