'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/lib/use-toast';
import { Button, type ButtonVariant } from '../Button';
import {
  ToastAction,
  toastSurfaceClass,
  type ToastActionConfig,
  type ToastBgColor,
  type ToastBgIntensity,
  type ToastSize,
  type ToastVariant,
} from '../Toast';
import { ToasterComp, type ToasterCompProps, type ToasterPosition } from './ToasterComp';

export type { ToasterPosition, ToasterCompProps };
export type { ToastActionConfig, ToastBgColor, ToastBgIntensity, ToastSize, ToastVariant };

/**
 * Demo host: mounts `ToasterComp` and a trigger that enqueues via `useToast`.
 * For app shells, prefer mounting `ToasterComp` once at the root and calling `toast()` /
 * `<Toast />` elsewhere.
 */
export interface iToaster {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  variant?: ToastVariant;
  size?: ToastSize;
  className?: string;
  bgColor?: ToastBgColor;
  bgIntensity?: ToastBgIntensity;
  duration?: number;
  autoDismiss?: boolean;
  action?: ToastActionConfig;
  onOpenChange?: (open: boolean) => void;
  position?: ToasterPosition;
  /** Mount the viewport host. Default true for Storybook/docs demos. */
  showToaster?: boolean;
  maxToasts?: number;
  /** @deprecated Sonner-style prop; ignored by the Radix host. Prefer `variant`. */
  expand?: boolean;
  /** @deprecated Sonner-style prop; ignored. Use `variant` / `bgColor`. */
  richColors?: boolean;
  closeButton?: boolean;
  toastClassName?: string;
  triggerClassName?: string;
  triggerVariant?: ButtonVariant;
}

/** @deprecated Prefer `iToaster`. */
export type DynamicToasterProps = iToaster;

export type ToasterProps = iToaster;

const Toaster = React.memo<iToaster>(function Toaster({
  title = 'Scheduled: Catch up',
  description = 'Friday, February 10, 2023 at 5:57 PM',
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
  position = 'bottom-right',
  showToaster = true,
  maxToasts = 3,
  closeButton = true,
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
    <div className="space-y-4">
      {showToaster ? (
        <ToasterComp
          position={position}
          maxToasts={maxToasts}
          closeButton={closeButton}
        />
      ) : null}
      <Button
        variant={triggerVariant}
        onClick={handleToast}
        className={triggerClassName}
      >
        {children || 'Add to calendar'}
      </Button>
    </div>
  );
});

Toaster.displayName = 'Toaster';

export { Toaster, ToasterComp };
