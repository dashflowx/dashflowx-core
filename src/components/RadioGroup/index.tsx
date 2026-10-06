import { cn } from '@/lib/utils';
import { Label } from '../Label';
import { RadioGroupComp, RadioGroupItem } from './RadioGroupComp';

export type RadioGroupVariant = 'default' | 'muted' | 'card' | 'button';
export type RadioGroupSize = 'sm' | 'md' | 'lg';
export type RadioGroupOrientation = 'vertical' | 'horizontal';

export interface iRadioGroupItem {
  id: string;
  title: string;
  value: string;
  handleClick?: () => void;
  disabled?: boolean;
  description?: string;
}

export interface iRadioGroup {
  items: iRadioGroupItem[];
  className?: string;
  itemClassName?: string;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  variant?: RadioGroupVariant;
  size?: RadioGroupSize;
  orientation?: RadioGroupOrientation;
  disabled?: boolean;
  name?: string;
}

export type RadioGroupProps = iRadioGroup;

const ORIENTATION_CLASSES: Record<RadioGroupOrientation, string> = {
  vertical: 'grid gap-2',
  horizontal: 'flex flex-wrap items-center gap-4',
};

const ITEM_VARIANT_CLASSES: Record<RadioGroupVariant, string> = {
  default: 'flex items-center space-x-2',
  muted: 'flex items-center space-x-2 text-gray-500',
  card: 'flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-900',
  button:
    'flex items-center gap-2 rounded-full border border-gray-300 px-3 py-1.5 has-[[data-state=checked]]:border-blue-600 has-[[data-state=checked]]:bg-blue-50 dark:border-gray-600 dark:has-[[data-state=checked]]:bg-blue-950',
};

const RADIO_SIZE_CLASSES: Record<RadioGroupSize, string> = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

const LABEL_SIZE_CLASSES: Record<RadioGroupSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

function RadioGroup({
  items,
  defaultValue,
  value,
  onValueChange,
  className,
  itemClassName,
  variant = 'default',
  size = 'md',
  orientation = 'vertical',
  disabled = false,
  name,
}: RadioGroupProps) {
  return (
    <RadioGroupComp
      className={cn(ORIENTATION_CLASSES[orientation], className)}
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      name={name}
    >
      {items.map((item) => (
        <div
          key={item.id}
          className={cn(ITEM_VARIANT_CLASSES[variant], itemClassName)}
        >
          <RadioGroupItem
            value={item.value}
            id={item.id}
            disabled={disabled || item.disabled}
            onClick={item.handleClick}
            className={RADIO_SIZE_CLASSES[size]}
          />
          <div className="grid gap-0.5 leading-none">
            <Label
              htmlFor={item.id}
              className={cn(
                'cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                LABEL_SIZE_CLASSES[size],
                variant === 'muted' && 'text-gray-500'
              )}
            >
              {item.title}
            </Label>
            {item.description ? (
              <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
            ) : null}
          </div>
        </div>
      ))}
    </RadioGroupComp>
  );
}

RadioGroup.displayName = 'RadioGroup';

export { RadioGroup, RadioGroupComp, RadioGroupItem };
