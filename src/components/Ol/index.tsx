import { cn } from '@/lib/utils';
import { ComponentPropsWithRef, forwardRef } from 'react';

export type OlVariant = 'default' | 'roman' | 'alpha' | 'inside' | 'muted';
export type OlSpacing = 'none' | 'sm' | 'md' | 'lg';
export type OlIndent = 'none' | 'sm' | 'md' | 'lg';
export type OlSize = 'sm' | 'md' | 'lg';

export interface OlProps extends ComponentPropsWithRef<'ol'> {
  variant?: OlVariant;
  spacing?: OlSpacing;
  indent?: OlIndent;
  size?: OlSize;
}

const VARIANT_CLASSES: Record<OlVariant, string> = {
  default: 'list-decimal',
  roman: 'list-[upper-roman]',
  alpha: 'list-[lower-alpha]',
  inside: 'list-decimal list-inside',
  muted: 'list-decimal text-gray-500',
};

const SPACING_CLASSES: Record<OlSpacing, string> = {
  none: 'my-0',
  sm: 'my-2',
  md: 'my-6',
  lg: 'my-8',
};

const INDENT_CLASSES: Record<OlIndent, string> = {
  none: 'ml-0',
  sm: 'ml-3',
  md: 'ml-6',
  lg: 'ml-10',
};

const SIZE_CLASSES: Record<OlSize, string> = {
  sm: 'text-sm',
  md: '',
  lg: 'text-lg',
};

export const Ol = forwardRef<HTMLOListElement, OlProps>(
  (
    {
      children,
      className,
      variant = 'default',
      spacing = 'md',
      indent = 'md',
      size = 'md',
      ...props
    },
    ref
  ) => {
    return (
      <ol
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
      </ol>
    );
  }
);

Ol.displayName = 'Ol';

/** @deprecated Use `Ol`. Kept for existing `ol` imports. */
export const ol = Ol;
