import { cn } from '@/lib/utils';
import { ComponentPropsWithRef, forwardRef } from 'react';

export type AnchorVariant = 'default' | 'muted' | 'primary' | 'soft' | 'plain';
export type AnchorSize = 'sm' | 'md' | 'lg';
export type AnchorWeight = 'normal' | 'medium' | 'semibold' | 'bold';
export type AnchorUnderline = 'always' | 'hover' | 'none';

export interface AnchorProps extends ComponentPropsWithRef<'a'> {
  variant?: AnchorVariant;
  size?: AnchorSize;
  weight?: AnchorWeight;
  underline?: AnchorUnderline;
}

const VARIANT_CLASSES: Record<AnchorVariant, string> = {
  default: 'text-inherit',
  muted: 'text-gray-500 dark:text-gray-400',
  primary: 'text-blue-600 dark:text-blue-400',
  soft: 'text-gray-700 dark:text-gray-300',
  plain: 'text-inherit',
};

const SIZE_CLASSES: Record<AnchorSize, string> = {
  sm: 'text-sm',
  md: '',
  lg: 'text-lg',
};

const WEIGHT_CLASSES: Record<AnchorWeight, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const UNDERLINE_CLASSES: Record<AnchorUnderline, string> = {
  always: 'underline underline-offset-4',
  hover: 'no-underline hover:underline hover:underline-offset-4',
  none: 'no-underline',
};

/** Soft defaults to hover underline; plain defaults to none; others keep always. */
const VARIANT_DEFAULT_UNDERLINE: Record<AnchorVariant, AnchorUnderline> = {
  default: 'always',
  muted: 'always',
  primary: 'always',
  soft: 'hover',
  plain: 'none',
};

export const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>(
  (
    {
      children,
      className,
      variant = 'default',
      size = 'md',
      weight = 'medium',
      underline,
      ...props
    },
    ref
  ) => {
    const resolvedUnderline = underline ?? VARIANT_DEFAULT_UNDERLINE[variant];

    return (
      <a
        ref={ref}
        className={cn(
          VARIANT_CLASSES[variant],
          SIZE_CLASSES[size],
          WEIGHT_CLASSES[weight],
          UNDERLINE_CLASSES[resolvedUnderline],
          className
        )}
        {...props}
      >
        {children}
      </a>
    );
  }
);

Anchor.displayName = 'Anchor';

/** @deprecated Use `Anchor`. Kept for existing `a` imports. */
export const a = Anchor;
