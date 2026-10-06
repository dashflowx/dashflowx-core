import { cn } from '@/lib/utils';
import {
  CSSProperties,
  ComponentPropsWithRef,
  ReactNode,
  forwardRef,
} from 'react';

export type SkeletonVariant =
  | 'default'
  | 'circular'
  | 'rectangular'
  | 'text'
  | 'avatar';

export type SkeletonSize = 'sm' | 'md' | 'lg' | 'xl';

export type SkeletonAnimation = 'pulse' | 'wave' | 'none';

/** Curated colors with static Tailwind classes (dynamic `bg-${color}` does not emit). */
export type SkeletonColor =
  | 'default'
  | 'muted'
  | 'gray'
  | 'slate'
  | 'zinc'
  | 'blue'
  | 'red'
  | 'green'
  | 'purple'
  | 'yellow'
  | 'pink'
  | 'gradient'
  | 'glass';

/** @deprecated Prefer `SkeletonColor`. Intensity is baked into each color class. */
export type SkeletonColorIntensity =
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

export interface iSkeleton {
  color?: SkeletonColor;
  /** @deprecated Unused. Colors use fixed intensities so Tailwind can emit classes. */
  colorIntensity?: SkeletonColorIntensity;
  variant?: SkeletonVariant;
  size?: SkeletonSize;
  width?: string | number;
  height?: string | number;
  animation?: SkeletonAnimation;
  children?: ReactNode;
}

export type SkeletonProps = Omit<ComponentPropsWithRef<'div'>, 'color'> & iSkeleton;

const COLOR_CLASSES: Record<SkeletonColor, string> = {
  default: 'bg-gray-200 dark:bg-gray-700',
  muted: 'bg-gray-100 dark:bg-gray-800',
  gray: 'bg-gray-300 dark:bg-gray-600',
  slate: 'bg-slate-200 dark:bg-slate-700',
  zinc: 'bg-zinc-200 dark:bg-zinc-700',
  blue: 'bg-blue-200 dark:bg-blue-800',
  red: 'bg-red-200 dark:bg-red-800',
  green: 'bg-green-200 dark:bg-green-800',
  purple: 'bg-purple-200 dark:bg-purple-800',
  yellow: 'bg-yellow-200 dark:bg-yellow-800',
  pink: 'bg-pink-200 dark:bg-pink-800',
  gradient:
    'bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700',
  glass: 'bg-white/20 backdrop-blur-sm border border-white/30',
};

const VARIANT_CLASSES: Record<SkeletonVariant, string> = {
  default: 'rounded-md',
  circular: 'rounded-full',
  rectangular: 'rounded-none',
  text: 'rounded-sm',
  avatar: 'rounded-full',
};

const SIZE_BAR: Record<SkeletonSize, string> = {
  sm: 'h-3',
  md: 'h-4',
  lg: 'h-6',
  xl: 'h-8',
};

const SIZE_CIRCLE: Record<SkeletonSize, string> = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
};

const ANIMATION_CLASSES: Record<SkeletonAnimation, string> = {
  pulse: 'animate-pulse',
  wave: 'animate-pulse bg-[length:200%_100%] motion-safe:animate-[skeleton-wave_1.5s_ease-in-out_infinite]',
  none: '',
};

function toCssSize(value: string | number | undefined): string | undefined {
  if (value === undefined) return undefined;
  return typeof value === 'number' ? `${value}px` : value;
}

export const SkeletonComp = forwardRef<HTMLDivElement, ComponentPropsWithRef<'div'>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('rounded-md bg-gray-200 dark:bg-gray-700', className)}
      {...props}
    />
  )
);

SkeletonComp.displayName = 'SkeletonComp';

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      color = 'default',
      colorIntensity: _colorIntensity,
      variant = 'default',
      size = 'md',
      width,
      height,
      animation = 'pulse',
      children,
      style,
      ...props
    },
    ref
  ) => {
    const isCircle = variant === 'circular' || variant === 'avatar';
    const hasExplicitWidth = width !== undefined;
    const hasExplicitHeight = height !== undefined;

    const dimensions: CSSProperties = {
      ...style,
      ...(hasExplicitWidth ? { width: toCssSize(width) } : null),
      ...(hasExplicitHeight ? { height: toCssSize(height) } : null),
    };

    return (
      <SkeletonComp
        ref={ref}
        className={cn(
          COLOR_CLASSES[color],
          VARIANT_CLASSES[variant],
          isCircle
            ? !hasExplicitWidth && !hasExplicitHeight && SIZE_CIRCLE[size]
            : !hasExplicitHeight && SIZE_BAR[size],
          !isCircle && !hasExplicitWidth && 'w-full',
          ANIMATION_CLASSES[animation],
          className
        )}
        style={dimensions}
        {...props}
      >
        {children}
      </SkeletonComp>
    );
  }
);

Skeleton.displayName = 'Skeleton';

export { Skeleton, COLOR_CLASSES as SKELETON_COLOR_CLASSES };
