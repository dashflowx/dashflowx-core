import { cn } from '@/lib/utils';
import { ComponentPropsWithRef, forwardRef } from 'react';

export type PVariant = 'default' | 'muted' | 'lead' | 'subtle' | 'flush';
export type PSize = 'sm' | 'md' | 'lg' | 'xl';
export type PWeight = 'normal' | 'medium' | 'semibold' | 'bold';
export type PAlign = 'left' | 'center' | 'right';

export interface PProps extends ComponentPropsWithRef<'p'> {
  variant?: PVariant;
  size?: PSize;
  weight?: PWeight;
  align?: PAlign;
}

const VARIANT_CLASSES: Record<PVariant, string> = {
  default: 'leading-7 [&:not(:first-child)]:mt-6',
  muted: 'leading-7 text-gray-500 [&:not(:first-child)]:mt-6',
  lead: 'text-xl leading-8 text-gray-700 dark:text-gray-300 [&:not(:first-child)]:mt-6',
  subtle: 'text-sm leading-6 text-gray-500 [&:not(:first-child)]:mt-6',
  flush: 'leading-7',
};

const SIZE_CLASSES: Record<PSize, string> = {
  sm: 'text-sm',
  md: '',
  lg: 'text-lg',
  xl: 'text-xl',
};

const WEIGHT_CLASSES: Record<PWeight, string> = {
  normal: '',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const ALIGN_CLASSES: Record<PAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export const P = forwardRef<HTMLParagraphElement, PProps>(
  (
    {
      children,
      className,
      variant = 'default',
      size = 'md',
      weight = 'normal',
      align = 'left',
      ...props
    },
    ref
  ) => {
    return (
      <p
        ref={ref}
        className={cn(
          VARIANT_CLASSES[variant],
          SIZE_CLASSES[size],
          WEIGHT_CLASSES[weight],
          ALIGN_CLASSES[align],
          className
        )}
        {...props}
      >
        {children}
      </p>
    );
  }
);

P.displayName = 'P';

/** @deprecated Use `P`. Kept for existing `p` imports. */
export const p = P;
