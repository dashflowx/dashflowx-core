import * as React from 'react';
import { cn } from '@/lib/utils';

export type SonnerToastType = 'default' | 'success' | 'error' | 'warning' | 'info';
export type SonnerPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';
export type SonnerSize = 'sm' | 'md' | 'lg';

export interface SonnerToastAction {
  label: string;
  onClick: () => void;
}

export interface SonnerToastProps {
  title?: string;
  description?: string;
  /** Prefer `variant`. Kept for existing callers. */
  type?: SonnerToastType;
  variant?: SonnerToastType;
  size?: SonnerSize;
  duration?: number;
  action?: SonnerToastAction;
  cancel?: SonnerToastAction;
  className?: string;
  position?: SonnerPosition;
  showCloseButton?: boolean;
  onClose?: () => void;
}

/** @deprecated Use `SonnerToastProps`. */
export type ToastProps = SonnerToastProps;

export type SonnerToastRecord = SonnerToastProps & { id: number };

export interface SonnerProps {
  position?: SonnerPosition;
  size?: SonnerSize;
  gap?: SonnerSize;
  className?: string;
  isolatedState?: ReturnType<typeof createIsolatedToastState>;
}

const TYPE_CLASSES: Record<
  SonnerToastType,
  { container: string; icon: string; title: string; description: string }
> = {
  default: {
    container: 'bg-white border-gray-200 dark:bg-gray-950 dark:border-gray-700',
    icon: 'text-gray-600 dark:text-gray-300',
    title: 'text-gray-800 dark:text-gray-100',
    description: 'text-gray-700 dark:text-gray-300',
  },
  success: {
    container: 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800',
    icon: 'text-green-600 dark:text-green-400',
    title: 'text-green-800 dark:text-green-100',
    description: 'text-green-700 dark:text-green-200',
  },
  error: {
    container: 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800',
    icon: 'text-red-600 dark:text-red-400',
    title: 'text-red-800 dark:text-red-100',
    description: 'text-red-700 dark:text-red-200',
  },
  warning: {
    container: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800',
    icon: 'text-yellow-600 dark:text-yellow-400',
    title: 'text-yellow-800 dark:text-yellow-100',
    description: 'text-yellow-700 dark:text-yellow-200',
  },
  info: {
    container: 'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800',
    icon: 'text-blue-600 dark:text-blue-400',
    title: 'text-blue-800 dark:text-blue-100',
    description: 'text-blue-700 dark:text-blue-200',
  },
};

const TYPE_ICON: Record<SonnerToastType, string> = {
  default: '•',
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ',
};

const SIZE_CLASSES: Record<SonnerSize, string> = {
  sm: 'p-3 pr-5 text-xs gap-2',
  md: 'p-4 pr-6 text-sm gap-3',
  lg: 'p-5 pr-7 text-base gap-4',
};

const POSITION_CLASSES: Record<SonnerPosition, string> = {
  'top-left': 'top-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'top-right': 'top-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-4 right-4',
};

const GAP_CLASSES: Record<SonnerSize, string> = {
  sm: 'space-y-1',
  md: 'space-y-2',
  lg: 'space-y-3',
};

function resolveType(toast: Pick<SonnerToastProps, 'type' | 'variant'>): SonnerToastType {
  return toast.variant ?? toast.type ?? 'default';
}

let toastId = 0;
const toasts: SonnerToastRecord[] = [];
const toastListeners: Array<(next: SonnerToastRecord[]) => void> = [];

function notifyListeners() {
  toastListeners.forEach((listener) => listener([...toasts]));
}

function removeToast(id: number) {
  const index = toasts.findIndex((item) => item.id === id);
  if (index > -1) {
    toasts.splice(index, 1);
    notifyListeners();
  }
}

function clearAllToasts() {
  toasts.length = 0;
  notifyListeners();
}

function addToast(toastData: SonnerToastProps) {
  const id = ++toastId;
  const newToast: SonnerToastRecord = { ...toastData, id };
  toasts.push(newToast);
  notifyListeners();

  const duration = toastData.duration ?? 5000;
  if (duration > 0) {
    setTimeout(() => removeToast(id), duration);
  }

  return id;
}

function createIsolatedToastState() {
  let instanceToastId = 0;
  const instanceToasts: SonnerToastRecord[] = [];
  const instanceListeners: Array<(next: SonnerToastRecord[]) => void> = [];

  const remove = (id: number) => {
    const index = instanceToasts.findIndex((item) => item.id === id);
    if (index > -1) {
      instanceToasts.splice(index, 1);
      instanceListeners.forEach((listener) => listener([...instanceToasts]));
    }
  };

  const add = (toastData: SonnerToastProps) => {
    const id = ++instanceToastId;
    instanceToasts.push({ ...toastData, id });
    instanceListeners.forEach((listener) => listener([...instanceToasts]));

    const duration = toastData.duration ?? 5000;
    if (duration > 0) {
      setTimeout(() => remove(id), duration);
    }
    return id;
  };

  const clear = () => {
    instanceToasts.length = 0;
    instanceListeners.forEach((listener) => listener([...instanceToasts]));
  };

  const api = {
    success: (title: string, options?: Partial<SonnerToastProps>) =>
      add({ ...options, title, type: 'success', variant: 'success' }),
    error: (title: string, options?: Partial<SonnerToastProps>) =>
      add({ ...options, title, type: 'error', variant: 'error' }),
    warning: (title: string, options?: Partial<SonnerToastProps>) =>
      add({ ...options, title, type: 'warning', variant: 'warning' }),
    info: (title: string, options?: Partial<SonnerToastProps>) =>
      add({ ...options, title, type: 'info', variant: 'info' }),
    default: (title: string, options?: Partial<SonnerToastProps>) =>
      add({ ...options, title, type: 'default', variant: 'default' }),
  };

  return {
    toasts: instanceToasts,
    listeners: instanceListeners,
    toast: api,
    clearAllToasts: clear,
    removeToast: remove,
  };
}

const toast = {
  success: (title: string, options?: Partial<SonnerToastProps>) =>
    addToast({ ...options, title, type: 'success', variant: 'success' }),
  error: (title: string, options?: Partial<SonnerToastProps>) =>
    addToast({ ...options, title, type: 'error', variant: 'error' }),
  warning: (title: string, options?: Partial<SonnerToastProps>) =>
    addToast({ ...options, title, type: 'warning', variant: 'warning' }),
  info: (title: string, options?: Partial<SonnerToastProps>) =>
    addToast({ ...options, title, type: 'info', variant: 'info' }),
  default: (title: string, options?: Partial<SonnerToastProps>) =>
    addToast({ ...options, title, type: 'default', variant: 'default' }),
};

export function ToastItem({
  toast: item,
  size = 'md',
  onDismiss,
}: {
  toast: SonnerToastRecord | SonnerToastProps;
  size?: SonnerSize;
  onDismiss?: () => void;
}) {
  const type = resolveType(item);
  const typeClasses = TYPE_CLASSES[type];
  const toastSize = item.size ?? size;
  const id = 'id' in item ? item.id : undefined;

  return (
    <div
      role="status"
      className={cn(
        'relative flex w-full max-w-sm items-start overflow-hidden rounded-md border shadow-lg transition-all',
        SIZE_CLASSES[toastSize],
        typeClasses.container,
        item.className
      )}
    >
      <div className={cn('flex-shrink-0 text-lg leading-none', typeClasses.icon)} aria-hidden>
        {TYPE_ICON[type]}
      </div>

      <div className="min-w-0 flex-1 space-y-1">
        {item.title ? (
          <div className={cn('font-semibold', typeClasses.title)}>{item.title}</div>
        ) : null}
        {item.description ? (
          <div className={cn(typeClasses.description)}>{item.description}</div>
        ) : null}
        {(item.action || item.cancel) && (
          <div className="flex gap-2 pt-1">
            {item.action ? (
              <button
                type="button"
                onClick={item.action.onClick}
                className="rounded-md bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700"
              >
                {item.action.label}
              </button>
            ) : null}
            {item.cancel ? (
              <button
                type="button"
                onClick={item.cancel.onClick}
                className="rounded-md bg-gray-200 px-3 py-1 text-xs text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200"
              >
                {item.cancel.label}
              </button>
            ) : null}
          </div>
        )}
      </div>

      {item.showCloseButton ? (
        <button
          type="button"
          aria-label="Close"
          onClick={() => {
            if (onDismiss) onDismiss();
            else if (id !== undefined) removeToast(id);
            item.onClose?.();
          }}
          className="absolute right-2 top-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          ×
        </button>
      ) : null}
    </div>
  );
}

export function ToastContainer({
  position = 'top-right',
  size = 'md',
  gap = 'md',
  className,
  isolatedState,
}: SonnerProps) {
  const [toastList, setToastList] = React.useState<SonnerToastRecord[]>([]);

  React.useEffect(() => {
    const listener = (next: SonnerToastRecord[]) => setToastList(next);

    if (isolatedState) {
      isolatedState.listeners.push(listener);
      setToastList([...isolatedState.toasts]);
      return () => {
        const index = isolatedState.listeners.indexOf(listener);
        if (index > -1) isolatedState.listeners.splice(index, 1);
      };
    }

    toastListeners.push(listener);
    setToastList([...toasts]);
    return () => {
      const index = toastListeners.indexOf(listener);
      if (index > -1) toastListeners.splice(index, 1);
    };
  }, [isolatedState]);

  if (toastList.length === 0) return null;

  return (
    <div
      className={cn(
        'fixed z-50 flex w-full max-w-sm flex-col',
        POSITION_CLASSES[position],
        GAP_CLASSES[gap],
        className
      )}
    >
      {toastList.map((item) => (
        <ToastItem
          key={item.id}
          toast={item}
          size={size}
          onDismiss={() => {
            if (isolatedState) isolatedState.removeToast(item.id);
            else removeToast(item.id);
          }}
        />
      ))}
    </div>
  );
}

function Sonner(props: SonnerProps) {
  return <ToastContainer {...props} />;
}

Sonner.displayName = 'Sonner';

const SonnerComp = Sonner;

export {
  Sonner,
  SonnerComp,
  toast,
  createIsolatedToastState,
  clearAllToasts,
  removeToast,
  TYPE_CLASSES as SONNER_TYPE_CLASSES,
  POSITION_CLASSES as SONNER_POSITION_CLASSES,
  SIZE_CLASSES as SONNER_SIZE_CLASSES,
};
