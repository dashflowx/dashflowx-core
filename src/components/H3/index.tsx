import { cn } from '@/lib/utils';
import { ComponentPropsWithRef, forwardRef } from 'react';

export type H3Variant = 'default' | 'display' | 'muted' | 'gradient' | 'bordered';
export type H3Size = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
export type H3Weight = 'thin' | 'normal' | 'medium' | 'semibold' | 'bold' | 'black';
export type H3Align = 'left' | 'center' | 'right';

export interface H3Props extends ComponentPropsWithRef<'h3'> {
  variant?: H3Variant;
  size?: H3Size;
  weight?: H3Weight;
  align?: H3Align;
  italic?: boolean;
  underline?: boolean;
}

const VARIANT_CLASSES: Record<H3Variant, string> = {
  default: 'font-heading mt-8 scroll-m-20 tracking-tight',
  display: 'font-heading mt-8 scroll-m-20 tracking-tighter',
  muted: 'font-heading mt-8 scroll-m-20 tracking-tight text-gray-500',
  gradient:
    'font-heading mt-8 scroll-m-20 tracking-tight bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent',
  bordered: 'font-heading mt-8 scroll-m-20 tracking-tight border-b pb-2',
};

const SIZE_CLASSES: Record<H3Size, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
};

const WEIGHT_CLASSES: Record<H3Weight, string> = {
  thin: 'font-thin',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  black: 'font-black',
};

const ALIGN_CLASSES: Record<H3Align, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export const H3 = forwardRef<HTMLHeadingElement, H3Props>(
  (
    {
      children,
      className,
      variant = 'default',
      size = 'xl',
      weight = 'semibold',
      align = 'left',
      italic = false,
      underline = false,
      ...props
    },
    ref
  ) => {
    return (
      <h3
        ref={ref}
        className={cn(
          VARIANT_CLASSES[variant],
          SIZE_CLASSES[size],
          WEIGHT_CLASSES[weight],
          ALIGN_CLASSES[align],
          italic && 'italic',
          underline && 'underline underline-offset-4',
          className
        )}
        {...props}
      >
        {children}
      </h3>
    );
  }
);

H3.displayName = 'H3';

/** @deprecated Use `H3`. Kept for existing `h3` imports. */
export const h3 = H3;
