import { cn } from '@/lib/utils';
import { ComponentPropsWithRef, forwardRef } from 'react';

export type ImgVariant = 'default' | 'bordered' | 'shadow' | 'ring' | 'muted';
export type ImgRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ImgFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
export type ImgSize = 'auto' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ImgProps extends ComponentPropsWithRef<'img'> {
  variant?: ImgVariant;
  rounded?: ImgRounded;
  fit?: ImgFit;
  size?: ImgSize;
}

const VARIANT_CLASSES: Record<ImgVariant, string> = {
  default: '',
  bordered: 'border border-gray-200',
  shadow: 'shadow-md',
  ring: 'ring-2 ring-gray-200 ring-offset-2',
  muted: 'opacity-75 grayscale',
};

const ROUNDED_CLASSES: Record<ImgRounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
};

const FIT_CLASSES: Record<ImgFit, string> = {
  cover: 'object-cover',
  contain: 'object-contain',
  fill: 'object-fill',
  none: 'object-none',
  'scale-down': 'object-scale-down',
};

const SIZE_CLASSES: Record<ImgSize, string> = {
  auto: '',
  sm: 'h-16 w-16',
  md: 'h-24 w-24',
  lg: 'h-32 w-32',
  xl: 'h-48 w-48',
  full: 'h-auto w-full',
};

export const Img = forwardRef<HTMLImageElement, ImgProps>(
  (
    {
      alt = '',
      className,
      variant = 'default',
      rounded = 'md',
      fit,
      size = 'auto',
      ...props
    },
    ref
  ) => {
    return (
      <img
        ref={ref}
        alt={alt}
        className={cn(
          ROUNDED_CLASSES[rounded],
          VARIANT_CLASSES[variant],
          SIZE_CLASSES[size],
          fit && FIT_CLASSES[fit],
          className
        )}
        {...props}
      />
    );
  }
);

Img.displayName = 'Img';

/** @deprecated Use `Img`. Kept for existing `img` imports. */
export const img = Img;
