import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from 'react';

import { cn } from '@/lib/utils';

export type SliderCompProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
  trackClassName?: string;
  rangeClassName?: string;
  thumbClassName?: string;
};

const SliderComp = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderCompProps
>(
  (
    {
      className,
      trackClassName,
      rangeClassName,
      thumbClassName,
      value,
      defaultValue,
      orientation = 'horizontal',
      ...props
    },
    ref
  ) => {
    const thumbCount = (value ?? defaultValue ?? [0]).length;

    return (
      <SliderPrimitive.Root
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        orientation={orientation}
        className={cn(
          'relative flex touch-none select-none items-center',
          orientation === 'vertical' ? 'h-64 w-fit flex-col' : 'w-full',
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track
          className={cn(
            'relative grow overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700',
            orientation === 'vertical' ? 'h-full w-2' : 'h-2 w-full',
            trackClassName
          )}
        >
          <SliderPrimitive.Range
            className={cn(
              'absolute rounded-full bg-gray-600 dark:bg-gray-300',
              orientation === 'vertical' ? 'w-full' : 'h-full',
              rangeClassName
            )}
          />
        </SliderPrimitive.Track>
        {Array.from({ length: thumbCount }).map((_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            className={cn(
              'block h-5 w-5 rounded-full border-2 border-gray-600 bg-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-300 dark:bg-gray-950',
              thumbClassName
            )}
          />
        ))}
      </SliderPrimitive.Root>
    );
  }
);

SliderComp.displayName = SliderPrimitive.Root.displayName;

export { SliderComp };
