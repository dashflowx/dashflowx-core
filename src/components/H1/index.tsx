import { cn } from '@/lib/utils';
import { ComponentPropsWithRef, forwardRef } from 'react';

export type H1Variant = 'default' | 'display' | 'muted' | 'gradient' | 'bordered';
export type H1Size = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
export type H1Weight = 'thin' | 'normal' | 'medium' | 'semibold' | 'bold' | 'black';
export type H1Align = 'left' | 'center' | 'right';

export interface H1Props extends ComponentPropsWithRef<'h1'> {
  variant?: H1Variant;
  size?: H1Size;
  weight?: H1Weight;
  align?: H1Align;
  italic?: boolean;
  underline?: boolean;
}

const VARIANT_CLASSES: Record<H1Variant, string> = {
  default: 'font-heading mt-2 scroll-m-20',
  display: 'font-heading mt-2 scroll-m-20 tracking-tight',
  muted: 'font-heading mt-2 scroll-m-20 text-gray-500',
  gradient:
    'font-heading mt-2 scroll-m-20 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent',
  bordered: 'font-heading mt-2 scroll-m-20 border-b pb-2',
};

const SIZE_CLASSES: Record<H1Size, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
};

const WEIGHT_CLASSES: Record<H1Weight, string> = {
  thin: 'font-thin',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  black: 'font-black',
};

const ALIGN_CLASSES: Record<H1Align, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export const H1 = forwardRef<HTMLHeadingElement, H1Props>(
  (
    {
      children,
      className,
      variant = 'default',
      size = '4xl',
      weight = 'bold',
      align = 'left',
      italic = false,
      underline = false,
      ...props
    },
    ref
  ) => {
    return (
      <h1
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
      </h1>
    );
  }
);

H1.displayName = 'H1';

/** @deprecated Use `H1`. Kept for existing `h1` imports. */
export const h1 = H1;
