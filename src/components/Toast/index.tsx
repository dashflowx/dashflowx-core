import * as React from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/lib/use-toast';
import { Button, type ButtonVariant } from '../Button';
import {
  ToastAction,
  ToastActionElement,
  ToastClose,
  ToastComp,
  ToastDescription,
  ToastProps as ToastRootProps,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  type ToastSize,
  type ToastVariant,
} from './ToastComp';
import { toastSurfaceClass } from './ToastSurfaces';
import type { ToastBgColor, ToastBgIntensity } from './types';

export type { ToastBgColor, ToastBgIntensity, ToastSize, ToastVariant };
export type { ToastRootProps };

export interface ToastActionConfig {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'destructive';
}

/** Trigger button that enqueues a Radix toast via `useToast`. */
export interface iToast {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  variant?: ToastVariant;
  size?: ToastSize;
  className?: string;
  /** Optional palette background. Overrides the variant surface when set. */
  bgColor?: ToastBgColor;
  bgIntensity?: ToastBgIntensity;
  duration?: number;
  autoDismiss?: boolean;
  action?: ToastActionConfig;
  onOpenChange?: (open: boolean) => void;
  /** Extra classes applied to the toast card (not the trigger). */
  toastClassName?: string;
  /** Trigger button classes. */
  triggerClassName?: string;
  triggerVariant?: ButtonVariant;
}

/** @deprecated Prefer `iToast`. */
export type DynamicToastProps = iToast;

/**
 * `ToastProps` remains the Radix root props for `useToast` / `ToasterToast`.
 * Trigger API is `iToast`.
 */
export type ToastProps = ToastRootProps;

const Toast = React.memo<iToast>(function Toast({
  title,
  description,
  children,
  variant = 'default',
  size = 'md',
  className,
  bgColor,
  bgIntensity = '50',
  duration = 5000,
  autoDismiss = true,
  action,
  onOpenChange,
  toastClassName,
  triggerClassName,
  triggerVariant = 'outline',
}) {
  const { toast } = useToast();

  const handleToast = React.useCallback(() => {
    const surface = toastSurfaceClass(bgColor, bgIntensity);
    toast({
      title,
      description,
      variant,
      size,
      duration: autoDismiss ? duration : Number.POSITIVE_INFINITY,
      onOpenChange,
      className: cn(bgColor ? surface : undefined, toastClassName, className),
      action: action ? (
        <ToastAction
          altText={action.label}
          onClick={action.onClick}
          className={
            action.variant === 'destructive'
              ? 'text-red-600 hover:text-red-700'
              : undefined
          }
        >
          {action.label}
        </ToastAction>
      ) : undefined,
    });
  }, [
    toast,
    title,
    description,
    variant,
    size,
    bgColor,
    bgIntensity,
    duration,
    autoDismiss,
    action,
    onOpenChange,
    toastClassName,
    className,
  ]);

  return (
    <Button
      variant={triggerVariant}
      onClick={handleToast}
      className={triggerClassName}
    >
      {children || 'Show Toast'}
    </Button>
  );
});

Toast.displayName = 'Toast';

export {
  Toast,
  ToastAction,
  ToastClose,
  ToastComp,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  type ToastActionElement,
};

export { ToastProviderWrapper } from './ToastProviderWrapper';
export { toastSurfaceClass, TOAST_SURFACE } from './ToastSurfaces';
