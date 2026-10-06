import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { toggleVariants } from './Toggle';

export type ToggleGroupOrientation = 'horizontal' | 'vertical';

const ToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants>>({
  size: 'md',
  variant: 'default',
});

export type ToggleGroupCompProps = React.ComponentPropsWithoutRef<
  typeof ToggleGroupPrimitive.Root
> &
  VariantProps<typeof toggleVariants> & {
    orientation?: ToggleGroupOrientation;
  };

const ORIENTATION_CLASSES: Record<ToggleGroupOrientation, string> = {
  horizontal: 'flex-row items-center',
  vertical: 'flex-col items-stretch',
};

const ToggleGroupComp = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  ToggleGroupCompProps
>(({ className, variant = 'default', size = 'md', orientation = 'horizontal', children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    orientation={orientation}
    className={cn(
      'flex justify-center gap-1',
      ORIENTATION_CLASSES[orientation],
      className
    )}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));

ToggleGroupComp.displayName = ToggleGroupPrimitive.Root.displayName;

export type ToggleGroupItemProps = React.ComponentPropsWithoutRef<
  typeof ToggleGroupPrimitive.Item
> &
  VariantProps<typeof toggleVariants>;

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  ToggleGroupItemProps
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: variant ?? context.variant,
          size: size ?? context.size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export {
  ToggleGroupComp,
  ToggleGroupItem,
  ORIENTATION_CLASSES as TOGGLE_GROUP_ORIENTATION_CLASSES,
};
