import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { ComponentPropsWithRef, forwardRef, memo, useId } from 'react';
import {
  BaseInputProps,
  InputContainer,
  SuccessErrorMessage,
  PrefixSuffixWrapper,
  FormLabel,
} from '../Input/shared';

export type TextAreaVariant = 'default' | 'filled' | 'outline' | 'ghost' | 'underline';
export type TextAreaSize = 'sm' | 'md' | 'lg';
export type TextAreaResize = 'none' | 'vertical' | 'both' | 'horizontal';

const textAreaStyles = cva(
  [
    'w-full',
    'transition-all',
    'duration-100',
    'outline-none',
    'placeholder:text-gray-400',
    'bg-transparent',
    'disabled:cursor-not-allowed',
    'disabled:opacity-50',
    'dark:text-white',
  ],
  {
    variants: {
      variant: {
        default: 'px-2',
        filled: 'px-2',
        outline: 'px-2',
        ghost: 'px-2',
        underline: 'px-0 rounded-none',
      },
      size: {
        sm: 'py-1 text-sm min-h-[4rem]',
        md: 'py-1.5 text-sm min-h-[5rem]',
        lg: 'py-2 text-base min-h-[6rem]',
      },
      resize: {
        none: 'resize-none',
        vertical: 'resize-y',
        both: 'resize',
        horizontal: 'resize-x',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      resize: 'vertical',
    },
  }
);

const containerStyles = cva(
  'flex items-start justify-start border focus-within:border-2 transition-all duration-100',
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
    'flex w-full rounded-md border bg-white px-3 py-2 text-sm',
    'placeholder:text-gray-500',
    'focus:outline-none focus:ring-2 focus:border-transparent',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'dark:bg-gray-900 dark:border-gray-700 dark:text-white',
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
        sm: 'min-h-[4rem] text-sm',
        md: 'min-h-[5rem] text-sm',
        lg: 'min-h-[6rem] text-base',
      },
      status: {
        default: '',
        success: 'border-green-500 focus:ring-green-500',
        error: 'border-red-500 focus:ring-red-500',
      },
      resize: {
        none: 'resize-none',
        vertical: 'resize-y',
        both: 'resize',
        horizontal: 'resize-x',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      status: 'default',
      resize: 'vertical',
    },
  }
);

export interface iTextArea
  extends Omit<ComponentPropsWithRef<'textarea'>, 'size'>,
    BaseInputProps,
    VariantProps<typeof textAreaStyles> {
  textareaContainerClassName?: string;
  variant?: TextAreaVariant;
  size?: TextAreaSize;
  resize?: TextAreaResize;
  /** @deprecated Unused. Prefer `rows`. Kept for existing callers. */
  multiLine?: boolean;
  /** @deprecated Prefer CSS `max-h-*` via `className`. Kept for existing callers. */
  maxRow?: number;
}

export type TextAreaProps = iTextArea;

const TextArea = memo(
  forwardRef<HTMLTextAreaElement, TextAreaProps>(
    (
      {
        className,
        variant = 'default',
        size = 'md',
        resize = 'vertical',
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
        prefixElementClassName,
        textareaContainerClassName,
        required,
        formMode = false,
        rows = 3,
        multiLine: _multiLine,
        maxRow: _maxRow,
        id,
        ...props
      },
      ref
    ) => {
      const generatedId = useId();
      const textareaId = id ?? generatedId;
      const status = errorMsg ? 'error' : sucessMsg ? 'success' : 'default';

      if (formMode) {
        return (
          <textarea
            ref={ref}
            id={textareaId}
            rows={rows}
            placeholder={placeholder}
            className={cn(formModeStyles({ variant, size, status, resize }), className)}
            {...props}
            disabled={disabled}
          />
        );
      }

      const textareaElement = (
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          placeholder={placeholder}
          className={cn(textAreaStyles({ variant, size, resize }))}
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
            htmlFor={textareaId}
          />
          <InputContainer
            baseClasses={containerStyles({ variant, size })}
            sucessMsg={sucessMsg}
            errorMsg={errorMsg}
            fullwidth={fullwidth}
            customClasses={textareaContainerClassName}
          >
            <PrefixSuffixWrapper
              prefixElement={prefixElement}
              sufixElement={sufixElement}
              prefixElementClassName={cn('mt-1', prefixElementClassName)}
              sufixElementClassName={cn('mt-1', sufixElementClassName)}
            >
              {textareaElement}
            </PrefixSuffixWrapper>
          </InputContainer>
          <SuccessErrorMessage sucessMsg={sucessMsg} errorMsg={errorMsg} />
        </div>
      );
    }
  )
);

TextArea.displayName = 'TextArea';

export { TextArea };
