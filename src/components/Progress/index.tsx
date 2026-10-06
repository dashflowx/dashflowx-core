import { cn } from '@/lib/utils';

export type ProgressVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
export type ProgressSize = 'sm' | 'md' | 'lg';

/** @deprecated Prefer `ProgressProps`. Kept for existing `iProgress` imports. */
export interface iProgress {
  progress: number | string;
  className?: string;
  variant?: ProgressVariant;
  size?: ProgressSize;
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  striped?: boolean;
}

export type ProgressProps = iProgress;

const SIZE_CLASSES: Record<ProgressSize, string> = {
  sm: 'h-1',
  md: 'h-2.5',
  lg: 'h-4',
};

const VARIANT_CLASSES: Record<ProgressVariant, string> = {
  default: 'bg-blue-600',
  success: 'bg-green-600',
  warning: 'bg-yellow-500',
  error: 'bg-red-600',
  info: 'bg-blue-500',
};

const BACKGROUND_CLASSES: Record<ProgressVariant, string> = {
  default: 'bg-gray-200 dark:bg-gray-700',
  success: 'bg-green-100 dark:bg-green-950',
  warning: 'bg-yellow-100 dark:bg-yellow-950',
  error: 'bg-red-100 dark:bg-red-950',
  info: 'bg-blue-100 dark:bg-blue-950',
};

function parseProgress(value: number | string): number {
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  return typeof value === 'number' && !Number.isNaN(value) ? value : 0;
}

function Progress({
  progress,
  className = '',
  variant = 'default',
  size = 'md',
  showLabel = false,
  label,
  animated = false,
  striped = false,
}: ProgressProps) {
  const progressWidth = Math.min(Math.max(parseProgress(progress), 0), 100);

  return (
    <div className="w-full">
      {showLabel ? (
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {label || 'Progress'}
          </span>
          <span className="font-mono text-sm text-gray-500 dark:text-gray-400">
            {progressWidth}%
          </span>
        </div>
      ) : null}

      <div
        className={cn(
          'w-full overflow-hidden rounded-full',
          BACKGROUND_CLASSES[variant],
          SIZE_CLASSES[size],
          className
        )}
        role="progressbar"
        aria-valuenow={progressWidth}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || 'Progress'}
      >
        <div
          className={cn(
            'rounded-full transition-all duration-300 ease-in-out',
            VARIANT_CLASSES[variant],
            SIZE_CLASSES[size],
            animated && 'animate-pulse'
          )}
          style={{
            width: `${progressWidth}%`,
            ...(striped
              ? {
                  backgroundImage:
                    'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.3) 10px, rgba(255,255,255,0.3) 20px)',
                  backgroundSize: '20px 20px',
                }
              : null),
          }}
        />
      </div>
    </div>
  );
}

Progress.displayName = 'Progress';

/** Compatibility alias for callers that import `ProgressComp`. */
export const ProgressComp = Progress;

export { Progress };
