import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { ComponentPropsWithRef, forwardRef, memo } from 'react';
import { Input2 } from './Input2';
import {
  BaseInputProps,
  InputContainer,
  SuccessErrorMessage,
  PrefixSuffixWrapper,
  FormLabel,
} from './shared';

export type InputVariant = 'default' | 'filled' | 'outline' | 'ghost' | 'underline';
export type InputSize = 'sm' | 'md' | 'lg';

const inputStyles = cva(
  [
    'w-full',
    'transition-all',
    'duration-100',
    'outline-none',
    'placeholder:text-gray-400',
    'bg-transparent',
    'disabled:cursor-not-allowed',
    'disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: 'px-2 border-gray-300 dark:bg-gray-700',
        filled: 'px-2 bg-gray-50 dark:bg-gray-800',
        outline: 'px-2',
        ghost: 'px-2',
        underline: 'px-0 rounded-none',
      },
      size: {
        sm: 'py-1 text-sm',
        md: 'py-1.5 text-sm',
        lg: 'py-2 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const containerStyles = cva(
  'flex items-center justify-start border focus-within:border-2 transition-all duration-100',
  {
    variants: {
      variant: {
        default:
          'border-gray-200 p-2 rounded-lg focus-within:border-primary-500 dark:border-gray-600',
        filled:
          'border-transparent bg-gray-100 p-2 rounded-lg focus-within:border-primary-500 dark:bg-gray-800',
        outline:
          'border-gray-300 p-2 rounded-md focus-within:border-blue-500 dark:border-gray-500',
        ghost:
          'border-transparent p-2 rounded-lg hover:bg-gray-50 focus-within:border-gray-300 dark:hover:bg-gray-800',
        underline:
          'border-0 border-b-2 border-gray-200 rounded-none px-0 py-1 focus-within:border-primary-500 dark:border-gray-600',
      },
      size: {
        sm: 'gap-1.5',
        md: 'gap-2',
        lg: 'gap-2.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const formModeStyles = cva(
  [
    'flex w-full rounded-md border bg-white px-3 text-sm',
    'placeholder:text-gray-500',
    'focus:outline-none focus:ring-2 focus:border-transparent',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'dark:bg-gray-900 dark:border-gray-700',
  ],
  {
    variants: {
      variant: {
        default: 'border-gray-300 focus:ring-blue-500',
        filled: 'border-transparent bg-gray-100 focus:ring-blue-500 dark:bg-gray-800',
        outline: 'border-gray-300 focus:ring-blue-500',
        ghost: 'border-transparent focus:ring-gray-300',
        underline:
          'rounded-none border-0 border-b border-gray-300 px-0 focus:ring-0 focus:border-blue-500',
      },
      size: {
        sm: 'h-8 py-1 text-sm',
        md: 'h-10 py-2 text-sm',
        lg: 'h-12 py-2.5 text-base',
      },
      status: {
        default: '',
        success: 'border-green-500 focus:ring-green-500',
        error: 'border-red-500 focus:ring-red-500',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      status: 'default',
    },
  }
);

export interface InputProps
  extends Omit<ComponentPropsWithRef<'input'>, 'size'>,
    BaseInputProps,
    VariantProps<typeof inputStyles> {
  inputContainerClassName?: string;
  variant?: InputVariant;
  size?: InputSize;
}

const Input = memo(
  forwardRef<HTMLInputElement, InputProps>(
    (
      {
        className,
        variant = 'default',
        size = 'md',
        prefixElement,
        sufixElement,
        fullwidth,
        disabled,
        sucessMsg,
        errorMsg,
        placeholder,
        lable,
        lableClassName,
        sufixElementClassName,
        inputContainerClassName,
        prefixElementClassName,
        required,
        formMode = false,
        type = 'text',
        id,
        ...props
      },
      ref
    ) => {
      const status = errorMsg ? 'error' : sucessMsg ? 'success' : 'default';
      const inputId = id ?? 'inputElement';

      if (formMode) {
        return (
          <input
            ref={ref}
            id={inputId}
            type={type}
            autoComplete="off"
            placeholder={placeholder}
            className={cn(
              formModeStyles({ variant, size, status }),
              className
            )}
            {...props}
            disabled={disabled}
          />
        );
      }

      const inputElement = (
        <input
          ref={ref}
          id={inputId}
          type={type}
          autoComplete="off"
          placeholder={placeholder}
          className={cn(inputStyles({ variant, size }))}
          {...props}
          disabled={disabled}
        />
      );

      return (
        <div className={cn('mb-2', className)}>
          <FormLabel
            lable={lable}
            lableClassName={lableClassName}
            required={required}
            htmlFor={inputId}
          />
          <InputContainer
            baseClasses={containerStyles({ variant, size })}
            sucessMsg={sucessMsg}
            errorMsg={errorMsg}
            fullwidth={fullwidth}
            customClasses={inputContainerClassName}
          >
            <PrefixSuffixWrapper
              prefixElement={prefixElement}
              sufixElement={sufixElement}
              prefixElementClassName={prefixElementClassName}
              sufixElementClassName={sufixElementClassName}
            >
              {inputElement}
            </PrefixSuffixWrapper>
          </InputContainer>
          <SuccessErrorMessage sucessMsg={sucessMsg} errorMsg={errorMsg} />
        </div>
      );
    }
  )
);

Input.displayName = 'Input';

export { Input, Input2 };
