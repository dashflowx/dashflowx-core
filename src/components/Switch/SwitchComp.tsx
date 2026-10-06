import * as SwitchPrimitives from '@radix-ui/react-switch';
import * as React from 'react';

import { cn } from '@/lib/utils';

export type SwitchSize = 'sm' | 'md' | 'lg';
export type SwitchVariant = 'default' | 'primary' | 'success' | 'warning' | 'error';

export type SwitchCompProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
  size?: SwitchSize;
  variant?: SwitchVariant;
  thumbClassName?: string;
};

const SIZE_CLASSES: Record<SwitchSize, { root: string; thumb: string; checked: string }> = {
  sm: {
    root: 'h-4 w-7',
    thumb: 'h-3 w-3',
    checked: 'data-[state=checked]:translate-x-3',
  },
  md: {
    root: 'h-6 w-11',
    thumb: 'h-5 w-5',
    checked: 'data-[state=checked]:translate-x-5',
  },
  lg: {
    root: 'h-7 w-14',
    thumb: 'h-6 w-6',
    checked: 'data-[state=checked]:translate-x-7',
  },
};

const VARIANT_CLASSES: Record<SwitchVariant, string> = {
  default:
    'data-[state=checked]:bg-gray-900 data-[state=unchecked]:bg-gray-200 dark:data-[state=checked]:bg-gray-100 dark:data-[state=unchecked]:bg-gray-700',
  primary:
    'data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-200 dark:data-[state=unchecked]:bg-gray-700',
  success:
    'data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-200 dark:data-[state=unchecked]:bg-gray-700',
  warning:
    'data-[state=checked]:bg-yellow-500 data-[state=unchecked]:bg-gray-200 dark:data-[state=unchecked]:bg-gray-700',
  error:
    'data-[state=checked]:bg-red-600 data-[state=unchecked]:bg-gray-200 dark:data-[state=unchecked]:bg-gray-700',
};

const SwitchComp = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchCompProps
>(({ className, size = 'md', variant = 'default', thumbClassName, ...props }, ref) => {
  const sizes = SIZE_CLASSES[size];

  return (
    <SwitchPrimitives.Root
      className={cn(
        'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 dark:focus-visible:ring-offset-gray-950',
        sizes.root,
        VARIANT_CLASSES[variant],
        className
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          'pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-0 dark:bg-gray-950',
          sizes.thumb,
          sizes.checked,
          thumbClassName
        )}
      />
    </SwitchPrimitives.Root>
  );
});
SwitchComp.displayName = SwitchPrimitives.Root.displayName;

export { SwitchComp, SIZE_CLASSES as SWITCH_SIZE_CLASSES, VARIANT_CLASSES as SWITCH_VARIANT_CLASSES };
