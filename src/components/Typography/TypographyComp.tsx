import * as React from 'react';
import { cn } from '@/lib/utils';

export type TypographySize = 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
export type TypographyWeight = 'thin' | 'normal' | 'medium' | 'semibold' | 'bold' | 'black';
export type TypographyAlign = 'left' | 'center' | 'right';
export type TypographyEmphasis = 'low' | 'high';
export type TypographyTone = 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'error';

export const TYPOGRAPHY_SIZE_CLASSES: Record<TypographySize, string> = {
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
};

export const TYPOGRAPHY_WEIGHT_CLASSES: Record<TypographyWeight, string> = {
  thin: 'font-thin',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  black: 'font-black',
};

export const TYPOGRAPHY_ALIGN_CLASSES: Record<TypographyAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export const TYPOGRAPHY_EMPHASIS_CLASSES: Record<TypographyEmphasis, string> = {
  low: 'text-gray-600 font-light dark:text-gray-400',
  high: 'text-gray-950 font-semibold dark:text-white',
};

export const TYPOGRAPHY_TONE_CLASSES: Record<TypographyTone, string> = {
  default: 'text-gray-900 dark:text-gray-100',
  muted: 'text-gray-500 dark:text-gray-400',
  primary: 'text-blue-600 dark:text-blue-400',
  success: 'text-green-600 dark:text-green-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
  error: 'text-red-600 dark:text-red-400',
};

export interface TypographyCompProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  /** Next.js Link / anchor href when `as` is a link component. */
  href?: string;
  /** React Router `to` when `as` is a router Link. */
  to?: string;
  size?: TypographySize;
  weight?: TypographyWeight;
  align?: TypographyAlign;
  italic?: boolean;
  underline?: boolean;
  emphasis?: TypographyEmphasis | null;
  tone?: TypographyTone;
  className?: string;
  children?: React.ReactNode;
}

export const TypographyComp = React.forwardRef<HTMLElement, TypographyCompProps>(
  (
    {
      as: Component = 'span',
      size = 'base',
      weight = 'normal',
      align = 'left',
      italic = false,
      underline = false,
      emphasis,
      tone = 'default',
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          'w-full',
          TYPOGRAPHY_SIZE_CLASSES[size],
          TYPOGRAPHY_WEIGHT_CLASSES[weight],
          TYPOGRAPHY_ALIGN_CLASSES[align],
          emphasis ? TYPOGRAPHY_EMPHASIS_CLASSES[emphasis] : TYPOGRAPHY_TONE_CLASSES[tone],
          italic && 'italic',
          underline && 'underline underline-offset-2',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

TypographyComp.displayName = 'TypographyComp';
