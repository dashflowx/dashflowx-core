import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { cn } from '@/lib/utils';
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';

export type SeparatorOrientation = 'horizontal' | 'vertical';
export type SeparatorColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'muted'
  | 'destructive'
  | 'success'
  | 'warning';
export type SeparatorVariant = 'solid' | 'dashed' | 'dotted';
export type SeparatorSize = 'sm' | 'md' | 'lg';

export interface iSeparator {
  orientation?: SeparatorOrientation;
  color?: SeparatorColor;
  variant?: SeparatorVariant;
  size?: SeparatorSize;
  decorative?: boolean;
}

export type SeparatorProps = Omit<
  ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>,
  'orientation' | 'decorative'
> &
  iSeparator;

export type SeparatorCompProps = ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>;

const COLOR_BG: Record<SeparatorColor, string> = {
  default: 'bg-gray-200 dark:bg-gray-700',
  primary: 'bg-blue-500',
  secondary: 'bg-gray-500',
  accent: 'bg-purple-500',
  muted: 'bg-gray-300 dark:bg-gray-600',
  destructive: 'bg-red-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
};

const COLOR_BORDER: Record<SeparatorColor, string> = {
  default: 'border-gray-200 dark:border-gray-700',
  primary: 'border-blue-500',
  secondary: 'border-gray-500',
  accent: 'border-purple-500',
  muted: 'border-gray-300 dark:border-gray-600',
  destructive: 'border-red-500',
  success: 'border-green-500',
  warning: 'border-yellow-500',
};

const SOLID_SIZE: Record<
  SeparatorSize,
  Record<SeparatorOrientation, string>
> = {
  sm: { horizontal: 'h-0.5 w-full', vertical: 'w-0.5 h-full' },
  md: { horizontal: 'h-px w-full', vertical: 'w-px h-full' },
  lg: { horizontal: 'h-1 w-full', vertical: 'w-1 h-full' },
};

const BORDER_SIZE: Record<
  SeparatorSize,
  Record<SeparatorOrientation, string>
> = {
  sm: {
    horizontal: 'w-full border-0 border-t',
    vertical: 'h-full border-0 border-l',
  },
  md: {
    horizontal: 'w-full border-0 border-t-2',
    vertical: 'h-full border-0 border-l-2',
  },
  lg: {
    horizontal: 'w-full border-0 border-t-4',
    vertical: 'h-full border-0 border-l-4',
  },
};

const VARIANT_BORDER: Record<Exclude<SeparatorVariant, 'solid'>, string> = {
  dashed: 'border-dashed bg-transparent',
  dotted: 'border-dotted bg-transparent',
};

export const SeparatorComp = forwardRef<
  ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorCompProps
>(({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      'shrink-0 bg-gray-200 dark:bg-gray-700',
      orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
      className
    )}
    {...props}
  />
));

SeparatorComp.displayName = SeparatorPrimitive.Root.displayName;

const Separator = forwardRef<
  ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(
  (
    {
      orientation = 'horizontal',
      color = 'default',
      variant = 'solid',
      size = 'md',
      decorative = true,
      className,
      ...props
    },
    ref
  ) => {
    const classes =
      variant === 'solid'
        ? cn(SOLID_SIZE[size][orientation], COLOR_BG[color])
        : cn(
            BORDER_SIZE[size][orientation],
            VARIANT_BORDER[variant],
            COLOR_BORDER[color]
          );

    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn('shrink-0', classes, className)}
        {...props}
      />
    );
  }
);

Separator.displayName = 'Separator';

export { Separator };
