import type { ReactNode } from 'react';

import {
  TooltipComp,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  type TooltipSize,
  type TooltipVariant,
} from './TooltipComp';

export type TooltipSide = 'top' | 'right' | 'bottom' | 'left';
export type TooltipAlign = 'start' | 'center' | 'end';

export type { TooltipSize, TooltipVariant };

export interface iTooltip {
  tooltipTrigger: ReactNode;
  tooltipContent: ReactNode;
  side?: TooltipSide;
  align?: TooltipAlign;
  variant?: TooltipVariant;
  size?: TooltipSize;
  /** Open delay in ms. */
  delayDuration?: number;
  /** Skip delay when moving between tooltips. */
  skipDelayDuration?: number;
  sideOffset?: number;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  className?: string;
  contentClassName?: string;
  triggerClassName?: string;
}

export type TooltipProps = iTooltip;

function Tooltip({
  tooltipTrigger,
  tooltipContent,
  side = 'top',
  align = 'center',
  variant = 'default',
  size = 'md',
  delayDuration = 100,
  skipDelayDuration = 300,
  sideOffset = 4,
  open,
  defaultOpen,
  onOpenChange,
  disabled = false,
  className,
  contentClassName,
  triggerClassName,
}: TooltipProps) {
  if (disabled) {
    return <>{tooltipTrigger}</>;
  }

  return (
    <TooltipProvider delayDuration={delayDuration} skipDelayDuration={skipDelayDuration}>
      <TooltipComp open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange} delayDuration={delayDuration}>
        <TooltipTrigger asChild className={triggerClassName}>
          {tooltipTrigger}
        </TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          sideOffset={sideOffset}
          variant={variant}
          size={size}
          className={contentClassName ?? className}
        >
          {tooltipContent}
        </TooltipContent>
      </TooltipComp>
    </TooltipProvider>
  );
}

Tooltip.displayName = 'Tooltip';

export {
  Tooltip,
  TooltipComp,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
};
