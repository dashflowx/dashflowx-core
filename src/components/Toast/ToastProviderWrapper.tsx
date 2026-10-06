import * as React from 'react';
import { useToast } from '@/lib/use-toast';
import {
  ToastProvider,
  ToastViewport,
  ToastComp,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from './ToastComp';

interface ToastProviderWrapperProps {
  children: React.ReactNode;
}

export const ToastProviderWrapper: React.FC<ToastProviderWrapperProps> = ({
  children,
}) => {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {children}
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        className,
        variant,
        size,
        ...props
      }) {
        return (
          <ToastComp
            key={id}
            variant={variant}
            size={size}
            className={className}
            {...props}
          >
            <div className="grid gap-1">
              {title ? <ToastTitle>{title}</ToastTitle> : null}
              {description ? (
                <ToastDescription>{description}</ToastDescription>
              ) : null}
            </div>
            {action}
            <ToastClose />
          </ToastComp>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
};
