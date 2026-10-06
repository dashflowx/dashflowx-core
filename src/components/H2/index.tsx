import { cn } from '@/lib/utils';
import { ComponentPropsWithRef, forwardRef } from 'react';

export type H2Variant = 'default' | 'display' | 'muted' | 'gradient' | 'plain';
export type H2Size = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
export type H2Weight = 'thin' | 'normal' | 'medium' | 'semibold' | 'bold' | 'black';
export type H2Align = 'left' | 'center' | 'right';

export interface H2Props extends ComponentPropsWithRef<'h2'> {
  variant?: H2Variant;
  size?: H2Size;
  weight?: H2Weight;
  align?: H2Align;
  italic?: boolean;
  underline?: boolean;
}

const VARIANT_CLASSES: Record<H2Variant, string> = {
  default:
    'font-heading mt-12 scroll-m-20 border-b pb-2 tracking-tight first:mt-0',
  display:
    'font-heading mt-12 scroll-m-20 border-b pb-2 tracking-tighter first:mt-0',
  muted:
    'font-heading mt-12 scroll-m-20 border-b pb-2 tracking-tight first:mt-0 text-gray-500',
  gradient:
    'font-heading mt-12 scroll-m-20 border-b pb-2 tracking-tight first:mt-0 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent',
  plain: 'font-heading mt-12 scroll-m-20 tracking-tight first:mt-0',
};

const SIZE_CLASSES: Record<H2Size, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
};

const WEIGHT_CLASSES: Record<H2Weight, string> = {
  thin: 'font-thin',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  black: 'font-black',
};

const ALIGN_CLASSES: Record<H2Align, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export const H2 = forwardRef<HTMLHeadingElement, H2Props>(
  (
    {
      children,
      className,
      variant = 'default',
      size = '2xl',
      weight = 'semibold',
      align = 'left',
      italic = false,
      underline = false,
      ...props
    },
    ref
  ) => {
    return (
      <h2
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
      </h2>
    );
  }
);

H2.displayName = 'H2';

/** @deprecated Use `H2`. Kept for existing `h2` imports. */
export const h2 = H2;
