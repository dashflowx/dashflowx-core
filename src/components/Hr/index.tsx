import { cn } from '@/lib/utils';
import { ComponentPropsWithRef, forwardRef } from 'react';

export type HrVariant = 'default' | 'muted' | 'strong' | 'dashed' | 'dotted';
export type HrSpacing = 'none' | 'sm' | 'md' | 'lg' | 'responsive';
export type HrThickness = 'thin' | 'medium' | 'thick';

export interface HrProps extends ComponentPropsWithRef<'hr'> {
  variant?: HrVariant;
  spacing?: HrSpacing;
  thickness?: HrThickness;
}

const VARIANT_CLASSES: Record<HrVariant, string> = {
  default: '',
  muted: 'border-0 border-t border-gray-300',
  strong: 'border-0 border-t border-gray-800',
  dashed: 'border-0 border-t border-dashed border-gray-400',
  dotted: 'border-0 border-t border-dotted border-gray-400',
};

const SPACING_CLASSES: Record<HrSpacing, string> = {
  none: 'my-0',
  sm: 'my-2',
  md: 'my-4',
  lg: 'my-8',
  responsive: 'my-4 md:my-8',
};

const THICKNESS_CLASSES: Record<HrThickness, string> = {
  thin: '',
  medium: 'border-t-2',
  thick: 'border-t-4',
};

export const Hr = forwardRef<HTMLHRElement, HrProps>(
  (
    {
      className,
      variant = 'default',
      spacing = 'responsive',
      thickness = 'thin',
      ...props
    },
    ref
  ) => {
    const thicknessNeedsBorder = variant === 'default' && thickness !== 'thin';

    return (
      <hr
        ref={ref}
        className={cn(
          SPACING_CLASSES[spacing],
          VARIANT_CLASSES[variant],
          thicknessNeedsBorder && 'border-0 border-t border-gray-200',
          THICKNESS_CLASSES[thickness],
          className
        )}
        {...props}
      />
    );
  }
);

Hr.displayName = 'Hr';

/** @deprecated Use `Hr`. Kept for existing `hr` imports. */
export const hr = Hr;
