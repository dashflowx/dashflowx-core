import type { ReactNode } from 'react';
import * as React from 'react';

import {
  ToggleComp,
  toggleVariants,
  type ToggleGroupSize,
  type ToggleGroupVariant,
} from './Toggle';
import {
  ToggleGroupComp,
  ToggleGroupItem,
  type ToggleGroupOrientation,
} from './ToggleGroupComp';

export type { ToggleGroupOrientation, ToggleGroupSize, ToggleGroupVariant };
export type { ToggleCompProps } from './Toggle';
export type { ToggleGroupCompProps, ToggleGroupItemProps } from './ToggleGroupComp';

export interface iToggleGroupItem {
  value: string;
  /** Visible label. Falls back to `value`. */
  label?: ReactNode;
  /** Accessible name when the label is decorative. */
  ariaLabel?: string;
  disabled?: boolean;
}

export interface iToggleGroup {
  /** Selection mode. */
  type?: 'single' | 'multiple';
  variant?: ToggleGroupVariant;
  size?: ToggleGroupSize;
  orientation?: ToggleGroupOrientation;
  /** Declarative items. When omitted, render `children` instead. */
  items?: iToggleGroupItem[];
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  disabled?: boolean;
  className?: string;
  itemClassName?: string;
  children?: ReactNode;
}

export type ToggleGroupProps = iToggleGroup;

const DEFAULT_ITEMS: iToggleGroupItem[] = [
  { value: 'bold', label: 'Bold', ariaLabel: 'Toggle bold' },
  { value: 'italic', label: 'Italic', ariaLabel: 'Toggle italic' },
  { value: 'underline', label: 'Underline', ariaLabel: 'Toggle underline' },
];

function ToggleGroup({
  type = 'multiple',
  variant = 'default',
  size = 'md',
  orientation = 'horizontal',
  items,
  value,
  defaultValue,
  onValueChange,
  disabled = false,
  className,
  itemClassName,
  children,
}: ToggleGroupProps) {
  const resolvedItems = items ?? (children == null ? DEFAULT_ITEMS : undefined);

  const handleValueChange = React.useCallback(
    (next: string | string[]) => {
      onValueChange?.(next);
    },
    [onValueChange]
  );

  const content =
    resolvedItems != null
      ? resolvedItems.map((item) => (
          <ToggleGroupItem
            key={item.value}
            value={item.value}
            disabled={item.disabled || disabled}
            aria-label={item.ariaLabel ?? (typeof item.label === 'string' ? item.label : item.value)}
            className={itemClassName}
          >
            {item.label ?? item.value}
          </ToggleGroupItem>
        ))
      : children;

  if (type === 'single') {
    return (
      <ToggleGroupComp
        type="single"
        variant={variant}
        size={size}
        orientation={orientation}
        disabled={disabled}
        className={className}
        value={typeof value === 'string' ? value : undefined}
        defaultValue={typeof defaultValue === 'string' ? defaultValue : undefined}
        onValueChange={handleValueChange as (value: string) => void}
      >
        {content}
      </ToggleGroupComp>
    );
  }

  return (
    <ToggleGroupComp
      type="multiple"
      variant={variant}
      size={size}
      orientation={orientation}
      disabled={disabled}
      className={className}
      value={Array.isArray(value) ? value : undefined}
      defaultValue={Array.isArray(defaultValue) ? defaultValue : undefined}
      onValueChange={handleValueChange as (value: string[]) => void}
    >
      {content}
    </ToggleGroupComp>
  );
}

ToggleGroup.displayName = 'ToggleGroup';

export {
  ToggleComp,
  ToggleGroup,
  ToggleGroupComp,
  ToggleGroupItem,
  toggleVariants,
};
