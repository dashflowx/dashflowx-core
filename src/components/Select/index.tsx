import { cn } from '@/lib/utils';
import {
  ChangeEvent,
  ComponentPropsWithRef,
  ReactNode,
  forwardRef,
  useId,
} from 'react';

export type SelectVariant = 'default' | 'filled' | 'outline' | 'ghost';
export type SelectSize = 'sm' | 'md' | 'lg';

export interface iSelectItems {
  id: string;
  itemElement: ReactNode;
  disabled?: boolean;
}

export interface iSelect {
  items: iSelectItems[];
  selected?: string;
  defaultSelected?: string;
  onSelectedChange?: (id: string) => void;
  label?: string;
  placeholder?: string;
  variant?: SelectVariant;
  size?: SelectSize;
  disabled?: boolean;
  selectClassName?: string;
  /** @deprecated Unused with the native select. Kept for existing callers. */
  isOpen?: boolean;
  /** @deprecated Unused with the native select. Kept for existing callers. */
  onClose?: () => void;
}

export type SelectProps = Omit<ComponentPropsWithRef<'div'>, 'onChange' | 'value' | 'defaultValue'> & iSelect;

export type SelectCompProps = Omit<
  ComponentPropsWithRef<'div'>,
  'onChange' | 'value' | 'defaultValue'
> & {
  label?: string;
  variant?: SelectVariant;
  size?: SelectSize;
  disabled?: boolean;
  selectClassName?: string;
  selectId?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  name?: string;
  required?: boolean;
};

export type SelectItemsProps = ComponentPropsWithRef<'option'> & {
  selected?: boolean;
};

const VARIANT_CLASSES: Record<SelectVariant, string> = {
  default:
    'border border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500',
  filled:
    'border border-transparent bg-gray-100 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-white',
  outline:
    'border border-gray-400 bg-transparent text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:text-white',
  ghost:
    'border border-transparent bg-transparent text-gray-900 underline-offset-4 hover:underline focus:border-blue-500 focus:ring-blue-500 dark:text-white',
};

const SIZE_CLASSES: Record<SelectSize, string> = {
  sm: 'p-1.5 text-xs rounded-md',
  md: 'p-2.5 text-sm rounded-lg',
  lg: 'p-3 text-base rounded-lg',
};

export const SelectComp = forwardRef<HTMLDivElement, SelectCompProps>(
  (
    {
      label,
      children,
      className,
      selectClassName,
      variant = 'default',
      size = 'md',
      disabled = false,
      selectId,
      value,
      defaultValue,
      onChange,
      name,
      required,
      ...props
    },
    ref
  ) => {
    const autoId = useId();
    const id = selectId ?? autoId;

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {label ? (
          <label
            htmlFor={id}
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            {label}
          </label>
        ) : null}
        <select
          id={id}
          name={name}
          required={required}
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          className={cn(
            'block w-full focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            VARIANT_CLASSES[variant],
            SIZE_CLASSES[size],
            selectClassName
          )}
        >
          {children}
        </select>
      </div>
    );
  }
);

SelectComp.displayName = 'SelectComp';

export const SelectItems = forwardRef<HTMLOptionElement, SelectItemsProps>(
  ({ selected: _selected, children, ...props }, ref) => {
    return (
      <option ref={ref} {...props}>
        {children}
      </option>
    );
  }
);

SelectItems.displayName = 'SelectItems';

const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      items,
      selected,
      defaultSelected,
      onSelectedChange,
      label,
      placeholder,
      variant = 'default',
      size = 'md',
      disabled = false,
      selectClassName,
      className,
      isOpen: _isOpen,
      onClose: _onClose,
      ...props
    },
    ref
  ) => {
    const controlled = selected !== undefined;

    return (
      <SelectComp
        ref={ref}
        label={label}
        variant={variant}
        size={size}
        disabled={disabled}
        selectClassName={selectClassName}
        className={className}
        value={controlled ? selected : undefined}
        defaultValue={controlled ? undefined : defaultSelected}
        onChange={(event) => onSelectedChange?.(event.target.value)}
        {...props}
      >
        {placeholder ? (
          <SelectItems value="" disabled>
            {placeholder}
          </SelectItems>
        ) : null}
        {items.map((item) => (
          <SelectItems key={item.id} value={item.id} disabled={item.disabled}>
            {item.itemElement}
          </SelectItems>
        ))}
      </SelectComp>
    );
  }
);

Select.displayName = 'Select';

export { Select };
