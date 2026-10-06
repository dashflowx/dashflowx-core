import * as React from 'react';
import { cn } from '@/lib/utils';

export type PopoverVariant = 'default' | 'muted' | 'bordered' | 'soft' | 'dark';
export type PopoverSize = 'sm' | 'md' | 'lg';
export type PopoverAlign = 'start' | 'center' | 'end';
export type PopoverSide = 'top' | 'bottom' | 'left' | 'right';
export type PopoverOpenOn = 'hover' | 'click';

/** @deprecated Prefer `PopoverProps`. Kept for existing `iPopover` imports. */
export interface iPopover {
  popoverTrigger: React.ReactNode;
  popoverContent: React.ReactNode;
  triggerClassName?: string;
  contentClassName?: string;
  className?: string;
  align?: PopoverAlign;
  side?: PopoverSide;
  sideOffset?: number;
  variant?: PopoverVariant;
  size?: PopoverSize;
  openOn?: PopoverOpenOn;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
}

export type PopoverProps = iPopover;

const VARIANT_CLASSES: Record<PopoverVariant, string> = {
  default: 'border bg-white text-gray-900 shadow-md',
  muted: 'border border-gray-200 bg-gray-50 text-gray-700 shadow-sm',
  bordered: 'border-2 border-gray-800 bg-white text-gray-900 shadow-sm',
  soft: 'border border-blue-100 bg-blue-50 text-blue-900 shadow-sm',
  dark: 'border border-gray-700 bg-gray-900 text-white shadow-lg',
};

const SIZE_CLASSES: Record<PopoverSize, string> = {
  sm: 'w-56 p-3 text-sm',
  md: 'w-80 p-4 text-sm',
  lg: 'w-96 p-5 text-base',
};

function alignClasses(side: PopoverSide, align: PopoverAlign): string {
  if (side === 'top' || side === 'bottom') {
    if (align === 'start') return 'left-0';
    if (align === 'end') return 'right-0';
    return 'left-1/2 -translate-x-1/2';
  }
  if (align === 'start') return 'top-0';
  if (align === 'end') return 'bottom-0';
  return 'top-1/2 -translate-y-1/2';
}

function sideStyle(side: PopoverSide, sideOffset: number): React.CSSProperties {
  if (side === 'top') return { bottom: `calc(100% + ${sideOffset}px)` };
  if (side === 'left') return { right: `calc(100% + ${sideOffset}px)` };
  if (side === 'right') return { left: `calc(100% + ${sideOffset}px)` };
  return { top: `calc(100% + ${sideOffset}px)` };
}

function Popover({
  popoverTrigger,
  popoverContent,
  triggerClassName = '',
  contentClassName = '',
  className,
  align = 'center',
  side = 'bottom',
  sideOffset = 4,
  variant = 'default',
  size = 'md',
  openOn = 'hover',
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
}: PopoverProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : uncontrolledOpen;
  const rootRef = React.useRef<HTMLDivElement>(null);

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (disabled) return;
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [disabled, isControlled, onOpenChange]
  );

  React.useEffect(() => {
    if (openOn !== 'click' || !open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [open, openOn, setOpen]);

  const visible =
    !disabled &&
    (openOn === 'hover'
      ? undefined
      : open);

  return (
    <div
      ref={rootRef}
      className={cn(
        'relative inline-block',
        openOn === 'hover' && !disabled ? 'group' : '',
        className
      )}
    >
      <div
        className={cn(
          'cursor-pointer',
          disabled ? 'pointer-events-none opacity-50' : '',
          triggerClassName
        )}
        onClick={() => {
          if (openOn === 'click') setOpen(!open);
        }}
      >
        {popoverTrigger}
      </div>

      <div
        className={cn(
          'absolute z-50 rounded-md outline-none transition-all duration-200',
          VARIANT_CLASSES[variant],
          SIZE_CLASSES[size],
          alignClasses(side, align),
          openOn === 'hover'
            ? 'invisible opacity-0 group-hover:visible group-hover:opacity-100'
            : visible
              ? 'visible opacity-100'
              : 'invisible opacity-0 pointer-events-none',
          contentClassName
        )}
        style={sideStyle(side, sideOffset)}
        role="dialog"
        aria-hidden={openOn === 'click' ? !open : undefined}
      >
        {popoverContent}
      </div>
    </div>
  );
}

Popover.displayName = 'Popover';

export const PopoverComp = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('relative inline-block', className)} {...props}>
    {children}
  </div>
);
PopoverComp.displayName = 'PopoverComp';

export const PopoverContent = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('w-80 rounded-md border bg-white p-4 shadow-md', className)} {...props}>
    {children}
  </div>
);
PopoverContent.displayName = 'PopoverContent';

export const PopoverTrigger = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('cursor-pointer', className)} {...props}>
    {children}
  </div>
);
PopoverTrigger.displayName = 'PopoverTrigger';

export { Popover };
