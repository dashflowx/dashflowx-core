import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

export type LabelVariant = 'default' | 'muted' | 'destructive' | 'success';
export type LabelSize = 'sm' | 'md' | 'lg';
export type LabelWeight = 'normal' | 'medium' | 'semibold' | 'bold';

const labelVariants = cva(
  'leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  {
    variants: {
      variant: {
        default: 'text-gray-900 dark:text-gray-100',
        muted: 'text-gray-500 dark:text-gray-400',
        destructive: 'text-red-600 dark:text-red-400',
        success: 'text-green-600 dark:text-green-400',
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
      weight: {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      weight: 'medium',
    },
  }
);

export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
  variant?: LabelVariant;
  size?: LabelSize;
  weight?: LabelWeight;
  /** Shows a red asterisk after the label text. */
  required?: boolean;
}

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      weight = 'medium',
      required = false,
      children,
      ...props
    },
    ref
  ) => (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants({ variant, size, weight }), className)}
      {...props}
    >
      {children}
      {required ? <span className="text-red-500"> *</span> : null}
    </LabelPrimitive.Root>
  )
);
Label.displayName = LabelPrimitive.Root.displayName;

export { Label, labelVariants };
