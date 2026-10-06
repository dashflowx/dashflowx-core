import {
  type ChangeEvent,
  type ComponentPropsWithRef,
  type ReactNode,
  forwardRef,
  useId,
} from 'react';

import { cn } from '@/lib/utils';

export type ToggleVariant = 'default' | 'primary' | 'success' | 'warning' | 'error';
export type ToggleSize = 'sm' | 'md' | 'lg';
export type ToggleLabelSide = 'left' | 'right';

export interface iToggle {
  label?: ReactNode;
  variant?: ToggleVariant;
  size?: ToggleSize;
  labelSide?: ToggleLabelSide;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  value?: string;
  /** Classes on the track (peer toggle pill). */
  toggleClassName?: string;
  /** Classes on the label text. */
  labelClassName?: string;
  /** Classes on the outer label wrapper. */
  className?: string;
}

export type ToggleProps = Omit<ComponentPropsWithRef<'label'>, keyof iToggle> & iToggle;

const SIZE_CLASSES: Record<
  ToggleSize,
  { track: string; label: string }
> = {
  sm: {
    track:
      "w-9 h-5 after:h-4 after:w-4 after:top-[2px] after:start-[2px] peer-checked:after:translate-x-4 rtl:peer-checked:after:-translate-x-4",
    label: 'text-xs',
  },
  md: {
    track:
      "w-11 h-6 after:h-5 after:w-5 after:top-[2px] after:start-[2px] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full",
    label: 'text-sm',
  },
  lg: {
    track:
      "w-14 h-7 after:h-6 after:w-6 after:top-[2px] after:start-[2px] peer-checked:after:translate-x-7 rtl:peer-checked:after:-translate-x-7",
    label: 'text-base',
  },
};

const VARIANT_CLASSES: Record<ToggleVariant, string> = {
  default:
    'peer-focus:ring-gray-300 dark:peer-focus:ring-gray-600 peer-checked:bg-gray-900 dark:peer-checked:bg-gray-100',
  primary:
    'peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:bg-blue-600',
  success:
    'peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:bg-green-600',
  warning:
    'peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-700 peer-checked:bg-yellow-500',
  error:
    'peer-focus:ring-red-300 dark:peer-focus:ring-red-800 peer-checked:bg-red-600',
};

const BASE_TRACK =
  "relative bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer dark:bg-gray-700 after:content-[''] after:absolute after:bg-white after:border-gray-300 after:border after:rounded-full after:transition-all dark:border-gray-600 peer-checked:after:border-white peer-disabled:cursor-not-allowed peer-disabled:opacity-50";

export const Toggle = forwardRef<HTMLLabelElement, ToggleProps>(
  (
    {
      label,
      variant = 'primary',
      size = 'md',
      labelSide = 'right',
      checked,
      defaultChecked,
      onCheckedChange,
      disabled = false,
      required = false,
      name,
      id: idProp,
      value = '',
      toggleClassName,
      labelClassName,
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const sizes = SIZE_CLASSES[size];

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onCheckedChange?.(event.target.checked);
    };

    const control = (
      <>
        <input
          id={id}
          name={name}
          type="checkbox"
          value={value}
          className="sr-only peer"
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          required={required}
          onChange={handleChange}
        />
        <div
          className={cn(
            BASE_TRACK,
            sizes.track,
            VARIANT_CLASSES[variant],
            toggleClassName
          )}
          aria-hidden
        />
      </>
    );

    const text =
      label != null && label !== '' ? (
        <span
          className={cn(
            'font-medium text-gray-900 dark:text-gray-300',
            sizes.label,
            labelSide === 'left' ? 'me-3' : 'ms-3',
            labelClassName
          )}
        >
          {label}
        </span>
      ) : null;

    return (
      <label
        ref={ref}
        htmlFor={id}
        className={cn(
          'inline-flex cursor-pointer items-center',
          labelSide === 'left' && 'flex-row-reverse',
          disabled && 'cursor-not-allowed opacity-70',
          className
        )}
        onClick={onClick}
        {...props}
      >
        {control}
        {text}
      </label>
    );
  }
);

Toggle.displayName = 'Toggle';

export {
  SIZE_CLASSES as TOGGLE_SIZE_CLASSES,
  VARIANT_CLASSES as TOGGLE_VARIANT_CLASSES,
};
