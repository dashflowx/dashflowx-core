import * as React from 'react';

import { cn } from '@/lib/utils';
import { Label } from '../Label';
import {
  SwitchComp,
  type SwitchCompProps,
  type SwitchSize,
  type SwitchVariant,
} from './SwitchComp';

export type { SwitchSize, SwitchVariant, SwitchCompProps };

export type SwitchLabelSide = 'left' | 'right';

export interface iSwitch {
  id?: string;
  name?: string;
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  size?: SwitchSize;
  variant?: SwitchVariant;
  labelSide?: SwitchLabelSide;
  className?: string;
  switchClassName?: string;
  labelClassName?: string;
  thumbClassName?: string;
}

export type SwitchProps = iSwitch;

const LABEL_SIZE: Record<SwitchSize, 'sm' | 'md' | 'lg'> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

let switchId = 0;

function Switch({
  id: idProp,
  name,
  label,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled = false,
  required = false,
  size = 'md',
  variant = 'default',
  labelSide = 'right',
  className,
  switchClassName,
  labelClassName,
  thumbClassName,
}: SwitchProps) {
  const generatedId = React.useId();
  const id = idProp ?? generatedId ?? `switch-${++switchId}`;

  const control = (
    <SwitchComp
      id={id}
      name={name}
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      required={required}
      size={size}
      variant={variant}
      className={switchClassName}
      thumbClassName={thumbClassName}
    />
  );

  if (!label) {
    return control;
  }

  const labelNode = (
    <Label
      htmlFor={id}
      size={LABEL_SIZE[size]}
      className={cn(
        'cursor-pointer',
        disabled && 'cursor-not-allowed opacity-70',
        labelClassName
      )}
    >
      {label}
    </Label>
  );

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2',
        labelSide === 'left' && 'flex-row-reverse',
        className
      )}
    >
      {control}
      {labelNode}
    </div>
  );
}

Switch.displayName = 'Switch';

export { Switch, SwitchComp };
