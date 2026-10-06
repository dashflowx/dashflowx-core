import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

export type ToggleGroupVariant = 'default' | 'outline' | 'primary' | 'ghost';
export type ToggleGroupSize = 'sm' | 'md' | 'lg';

const toggleVariants = cva(
  'inline-flex items-center justify-center gap-1 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-transparent text-gray-700 hover:bg-gray-100 data-[state=on]:bg-gray-900 data-[state=on]:text-white dark:text-gray-200 dark:hover:bg-gray-800 dark:data-[state=on]:bg-gray-100 dark:data-[state=on]:text-gray-900',
        outline:
          'border border-gray-200 bg-transparent text-gray-700 hover:bg-gray-50 data-[state=on]:border-gray-900 data-[state=on]:bg-gray-900 data-[state=on]:text-white dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:data-[state=on]:border-gray-100 dark:data-[state=on]:bg-gray-100 dark:data-[state=on]:text-gray-900',
        primary:
          'bg-transparent text-blue-700 hover:bg-blue-50 data-[state=on]:bg-blue-600 data-[state=on]:text-white dark:text-blue-300 dark:hover:bg-blue-950',
        ghost:
          'bg-transparent text-gray-600 hover:bg-gray-100 data-[state=on]:bg-gray-100 data-[state=on]:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:data-[state=on]:bg-gray-800 dark:data-[state=on]:text-gray-50',
      },
      size: {
        sm: 'h-8 min-w-8 px-2 text-xs',
        md: 'h-9 min-w-9 px-3 text-sm',
        lg: 'h-11 min-w-11 px-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export type ToggleCompProps = React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>;

const ToggleComp = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  ToggleCompProps
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size }), className)}
    {...props}
  />
));

ToggleComp.displayName = TogglePrimitive.Root.displayName;

export { ToggleComp, toggleVariants };
