'use client';

import { useToast } from '@/lib/use-toast';
import { cn } from '@/lib/utils';
import {
  ToastClose,
  ToastComp,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '../Toast';

export type ToasterPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface ToasterCompProps {
  /** Viewport corner / edge. */
  position?: ToasterPosition;
  /** Max visible toasts (newest first). */
  maxToasts?: number;
  /** Show the × control on each toast. */
  closeButton?: boolean;
  /** Extra classes on the viewport. */
  className?: string;
}

const POSITION_CLASSES: Record<ToasterPosition, string> = {
  'top-left':
    'fixed top-0 left-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:flex-col md:max-w-[420px]',
  'top-center':
    'fixed top-0 left-1/2 z-[100] flex max-h-screen w-full -translate-x-1/2 flex-col-reverse p-4 sm:flex-col md:max-w-[420px]',
  'top-right':
    'fixed top-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:flex-col md:max-w-[420px]',
  'bottom-left':
    'fixed bottom-0 left-0 z-[100] flex max-h-screen w-full flex-col p-4 md:max-w-[420px]',
  'bottom-center':
    'fixed bottom-0 left-1/2 z-[100] flex max-h-screen w-full -translate-x-1/2 flex-col p-4 md:max-w-[420px]',
  'bottom-right':
    'fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col p-4 md:max-w-[420px]',
};

export function ToasterComp({
  position = 'bottom-right',
  maxToasts = 3,
  closeButton = true,
  className,
}: ToasterCompProps = {}) {
  const { toasts } = useToast();
  const visible = toasts.slice(0, Math.max(1, maxToasts));

  return (
    <ToastProvider>
      {visible.map(function ({
        id,
        title,
        description,
        action,
        className: toastClassName,
        variant,
        size,
        ...props
      }) {
        return (
          <ToastComp
            key={id}
            variant={variant}
            size={size}
            className={toastClassName}
            {...props}
          >
            <div className="grid gap-1">
              {title ? <ToastTitle>{title}</ToastTitle> : null}
              {description ? (
                <ToastDescription>{description}</ToastDescription>
              ) : null}
            </div>
            {action}
            {closeButton ? <ToastClose /> : null}
          </ToastComp>
        );
      })}
      <ToastViewport
        className={cn(
          // Wipe the default Viewport positioning so `position` wins via twMerge.
          'top-auto right-auto bottom-auto left-auto translate-x-0 sm:top-auto sm:bottom-auto sm:right-auto',
          POSITION_CLASSES[position],
          className
        )}
      />
    </ToastProvider>
  );
}

export { POSITION_CLASSES as TOASTER_POSITION_CLASSES };
