import { cn } from '@/lib/utils';
import { ComponentPropsWithRef, forwardRef } from 'react';

export type H6Variant = 'default' | 'display' | 'muted' | 'gradient' | 'bordered';
export type H6Size = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
export type H6Weight = 'thin' | 'normal' | 'medium' | 'semibold' | 'bold' | 'black';
export type H6Align = 'left' | 'center' | 'right';

export interface H6Props extends ComponentPropsWithRef<'h6'> {
  variant?: H6Variant;
  size?: H6Size;
  weight?: H6Weight;
  align?: H6Align;
  italic?: boolean;
  underline?: boolean;
}

const VARIANT_CLASSES: Record<H6Variant, string> = {
  default: 'mt-8 scroll-m-20 tracking-tight',
  display: 'mt-8 scroll-m-20 tracking-tighter',
  muted: 'mt-8 scroll-m-20 tracking-tight text-gray-500',
  gradient:
    'mt-8 scroll-m-20 tracking-tight bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent',
  bordered: 'mt-8 scroll-m-20 tracking-tight border-b pb-2',
};

const SIZE_CLASSES: Record<H6Size, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
};

const WEIGHT_CLASSES: Record<H6Weight, string> = {
  thin: 'font-thin',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  black: 'font-black',
};

const ALIGN_CLASSES: Record<H6Align, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export const H6 = forwardRef<HTMLHeadingElement, H6Props>(
  (
    {
      children,
      className,
      variant = 'default',
      size = 'md',
      weight = 'semibold',
      align = 'left',
      italic = false,
      underline = false,
      ...props
    },
    ref
  ) => {
    return (
      <h6
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
      </h6>
    );
  }
);

H6.displayName = 'H6';

/** @deprecated Use `H6`. Kept for existing `h6` imports. */
export const h6 = H6;
