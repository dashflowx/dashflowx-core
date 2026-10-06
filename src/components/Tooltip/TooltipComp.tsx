import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';

import { cn } from '@/lib/utils';

export type TooltipVariant = 'default' | 'muted' | 'soft' | 'dark' | 'destructive';
export type TooltipSize = 'sm' | 'md' | 'lg';

export const TOOLTIP_VARIANT_CLASSES: Record<TooltipVariant, string> = {
  default: 'border border-gray-200 bg-white text-gray-900 shadow-md',
  muted: 'border border-gray-200 bg-gray-50 text-gray-700 shadow-sm',
  soft: 'border border-blue-100 bg-blue-50 text-blue-900 shadow-sm',
  dark: 'border border-gray-700 bg-gray-900 text-white shadow-lg',
  destructive: 'border border-red-200 bg-red-50 text-red-800 shadow-sm',
};

export const TOOLTIP_SIZE_CLASSES: Record<TooltipSize, string> = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base',
};

const TooltipProvider = TooltipPrimitive.Provider;

const TooltipComp = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

export type TooltipContentProps = React.ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Content
> & {
  variant?: TooltipVariant;
  size?: TooltipSize;
};

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, sideOffset = 4, variant = 'default', size = 'md', ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-50 overflow-hidden rounded-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      TOOLTIP_VARIANT_CLASSES[variant],
      TOOLTIP_SIZE_CLASSES[size],
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { TooltipComp, TooltipContent, TooltipProvider, TooltipTrigger };
