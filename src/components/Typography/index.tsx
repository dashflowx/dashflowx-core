import { type ComponentPropsWithRef, type ReactNode, forwardRef } from 'react';
import {
  TypographyComp,
  type TypographyAlign,
  type TypographyEmphasis,
  type TypographySize,
  type TypographyTone,
  type TypographyWeight,
} from './TypographyComp';

export type TypographyVariant = 'one' | 'two' | 'three' | 'four' | 'five' | 'six' | 'para';

export type {
  TypographyAlign,
  TypographyEmphasis,
  TypographySize,
  TypographyTone,
  TypographyWeight,
};

const VARIANT_AS: Record<TypographyVariant, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'> = {
  one: 'h1',
  two: 'h2',
  three: 'h3',
  four: 'h4',
  five: 'h5',
  six: 'h6',
  para: 'p',
};

/** Default size per semantic variant when `size` is omitted. */
const VARIANT_DEFAULT_SIZE: Record<TypographyVariant, TypographySize> = {
  one: '3xl',
  two: '2xl',
  three: 'xl',
  four: 'lg',
  five: 'base',
  six: 'sm',
  para: 'base',
};

/** Default weight per semantic variant when `weight` is omitted. */
const VARIANT_DEFAULT_WEIGHT: Record<TypographyVariant, TypographyWeight> = {
  one: 'bold',
  two: 'semibold',
  three: 'semibold',
  four: 'medium',
  five: 'medium',
  six: 'medium',
  para: 'normal',
};

export interface iTypography {
  variant?: TypographyVariant;
  size?: TypographySize | null;
  weight?: TypographyWeight | null;
  align?: TypographyAlign | null;
  italic?: boolean | null;
  underline?: boolean;
  emphasis?: TypographyEmphasis | null;
  tone?: TypographyTone;
  className?: string;
  children?: ReactNode;
}

/** @deprecated Prefer `iTypography`. Kept for existing `HeroOneProps` imports. */
export type HeroOneProps = ComponentPropsWithRef<'div'> & iTypography;

export type TypographyProps = HeroOneProps;

const Typography = forwardRef<HTMLDivElement, TypographyProps>(
  (
    {
      align = 'left',
      size,
      emphasis,
      italic = false,
      underline = false,
      weight,
      className,
      variant = 'para',
      tone = 'default',
      children,
      ...props
    },
    ref
  ) => {
    const resolvedVariant = variant in VARIANT_AS ? variant : 'para';
    const as = VARIANT_AS[resolvedVariant];
    const resolvedSize = size ?? VARIANT_DEFAULT_SIZE[resolvedVariant];
    const resolvedWeight = weight ?? VARIANT_DEFAULT_WEIGHT[resolvedVariant];

    return (
      <div ref={ref} className="w-full" {...props}>
        <TypographyComp
          as={as}
          className={className}
          size={resolvedSize}
          weight={resolvedWeight}
          align={align ?? 'left'}
          italic={Boolean(italic)}
          underline={Boolean(underline)}
          emphasis={emphasis}
          tone={tone}
        >
          {children}
        </TypographyComp>
      </div>
    );
  }
);

Typography.displayName = 'Typography';

export { Typography, TypographyComp, VARIANT_AS as TYPOGRAPHY_VARIANT_AS };
