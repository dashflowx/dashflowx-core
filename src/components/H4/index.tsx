import { cn } from '@/lib/utils';
import { ComponentPropsWithRef, forwardRef } from 'react';

export type H4Variant = 'default' | 'display' | 'muted' | 'gradient' | 'bordered';
export type H4Size = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
export type H4Weight = 'thin' | 'normal' | 'medium' | 'semibold' | 'bold' | 'black';
export type H4Align = 'left' | 'center' | 'right';

export interface H4Props extends ComponentPropsWithRef<'h4'> {
  variant?: H4Variant;
  size?: H4Size;
  weight?: H4Weight;
  align?: H4Align;
  italic?: boolean;
  underline?: boolean;
}

const VARIANT_CLASSES: Record<H4Variant, string> = {
  default: 'font-heading mt-8 scroll-m-20 tracking-tight',
  display: 'font-heading mt-8 scroll-m-20 tracking-tighter',
  muted: 'font-heading mt-8 scroll-m-20 tracking-tight text-gray-500',
  gradient:
    'font-heading mt-8 scroll-m-20 tracking-tight bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent',
  bordered: 'font-heading mt-8 scroll-m-20 tracking-tight border-b pb-2',
};

const SIZE_CLASSES: Record<H4Size, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
};

const WEIGHT_CLASSES: Record<H4Weight, string> = {
  thin: 'font-thin',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  black: 'font-black',
};

const ALIGN_CLASSES: Record<H4Align, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export const H4 = forwardRef<HTMLHeadingElement, H4Props>(
  (
    {
      children,
      className,
      variant = 'default',
      size = 'lg',
      weight = 'semibold',
      align = 'left',
      italic = false,
      underline = false,
      ...props
    },
    ref
  ) => {
    return (
      <h4
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
      </h4>
    );
  }
);

H4.displayName = 'H4';

/** @deprecated Use `H4`. Kept for existing `h4` imports. */
export const h4 = H4;
