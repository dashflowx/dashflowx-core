import * as React from 'react';
import { cn } from '@/lib/utils';
import { SliderComp } from './SliderComp';

export type SliderSize = 'sm' | 'md' | 'lg';
export type SliderVariant = 'default' | 'primary' | 'success' | 'warning' | 'error';
export type SliderOrientation = 'horizontal' | 'vertical';

export interface iSlider {
  value?: number[];
  defaultValue?: number[];
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  trackClassName?: string;
  rangeClassName?: string;
  thumbClassName?: string;
  disabled?: boolean;
  orientation?: SliderOrientation;
  inverted?: boolean;
  showLabels?: boolean;
  showValue?: boolean;
  showTicks?: boolean;
  tickCount?: number;
  label?: string;
  valueLabel?: string;
  onValueChange?: (value: number[]) => void;
  onValueCommit?: (value: number[]) => void;
  size?: SliderSize;
  variant?: SliderVariant;
}

export type SliderProps = iSlider;

const SIZE_CONFIG: Record<
  SliderSize,
  { track: string; trackVertical: string; thumb: string; spacing: string }
> = {
  sm: {
    track: 'h-1',
    trackVertical: 'w-1',
    thumb: 'h-3 w-3',
    spacing: 'space-y-1',
  },
  md: {
    track: 'h-2',
    trackVertical: 'w-2',
    thumb: 'h-5 w-5',
    spacing: 'space-y-2',
  },
  lg: {
    track: 'h-3',
    trackVertical: 'w-3',
    thumb: 'h-6 w-6',
    spacing: 'space-y-3',
  },
};

const VARIANT_CONFIG: Record<
  SliderVariant,
  { track: string; range: string; thumb: string }
> = {
  default: {
    track: 'bg-gray-200 dark:bg-gray-700',
    range: 'bg-gray-600 dark:bg-gray-300',
    thumb: 'border-gray-600 dark:border-gray-300 bg-white dark:bg-gray-950',
  },
  primary: {
    track: 'bg-blue-100 dark:bg-blue-950',
    range: 'bg-blue-600',
    thumb: 'border-blue-600 bg-white dark:bg-gray-950',
  },
  success: {
    track: 'bg-green-100 dark:bg-green-950',
    range: 'bg-green-600',
    thumb: 'border-green-600 bg-white dark:bg-gray-950',
  },
  warning: {
    track: 'bg-yellow-100 dark:bg-yellow-950',
    range: 'bg-yellow-500',
    thumb: 'border-yellow-500 bg-white dark:bg-gray-950',
  },
  error: {
    track: 'bg-red-100 dark:bg-red-950',
    range: 'bg-red-600',
    thumb: 'border-red-600 bg-white dark:bg-gray-950',
  },
};

const Slider: React.FC<SliderProps> = React.memo(
  ({
    value,
    defaultValue = [50],
    min = 0,
    max = 100,
    step = 1,
    className,
    trackClassName,
    rangeClassName,
    thumbClassName,
    disabled = false,
    orientation = 'horizontal',
    inverted = false,
    showLabels = false,
    showValue = false,
    showTicks = false,
    tickCount = 5,
    label,
    valueLabel,
    onValueChange,
    onValueCommit,
    size = 'md',
    variant = 'default',
  }) => {
    const sizeConfig = SIZE_CONFIG[size];
    const variantConfig = VARIANT_CONFIG[variant];
    const vertical = orientation === 'vertical';

    const ticks = React.useMemo(() => {
      if (!showTicks || tickCount < 2) return [];
      const tickStep = (max - min) / (tickCount - 1);
      return Array.from({ length: tickCount }, (_, i) =>
        Math.round((min + tickStep * i) * 1000) / 1000
      );
    }, [showTicks, min, max, tickCount]);

    const displayValue = (value ?? defaultValue)[0] ?? 0;

    return (
      <div
        className={cn(
          vertical ? 'inline-flex flex-col items-center' : 'w-full',
          sizeConfig.spacing,
          className
        )}
      >
        {showLabels && label ? (
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {label}
          </label>
        ) : null}

        {showValue ? (
          <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {valueLabel ?? String(displayValue)}
          </div>
        ) : null}

        <SliderComp
          value={value}
          defaultValue={value === undefined ? defaultValue : undefined}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          orientation={orientation}
          inverted={inverted}
          onValueChange={onValueChange}
          onValueCommit={onValueCommit}
          trackClassName={cn(
            vertical ? sizeConfig.trackVertical : sizeConfig.track,
            variantConfig.track,
            trackClassName
          )}
          rangeClassName={cn(variantConfig.range, rangeClassName)}
          thumbClassName={cn(sizeConfig.thumb, variantConfig.thumb, thumbClassName)}
        />

        {showTicks && ticks.length > 0 && !vertical ? (
          <div className="mt-1 flex justify-between">
            {ticks.map((tick, index) => (
              <div
                key={`${tick}-${index}`}
                className="text-center text-xs text-gray-500 dark:text-gray-400"
                style={{ width: `${100 / (tickCount - 1)}%` }}
              >
                {tick}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
);

Slider.displayName = 'Slider';

/** Thin Radix slider without labels/ticks. Prefer `Slider`. */
type LegacySliderProps = React.ComponentProps<typeof SliderComp>;

function LegacySlider({ className, ...props }: LegacySliderProps) {
  return (
    <SliderComp
      defaultValue={[50]}
      max={100}
      step={1}
      className={cn('w-[60%]', className)}
      {...props}
    />
  );
}

export {
  Slider,
  LegacySlider,
  SliderComp,
  SIZE_CONFIG as SLIDER_SIZE_CONFIG,
  VARIANT_CONFIG as SLIDER_VARIANT_CONFIG,
};
