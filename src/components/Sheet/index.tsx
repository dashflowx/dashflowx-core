import * as React from 'react';
import { Button, type ButtonVariant } from '../Button';
import { cn } from '@/lib/utils';
import {
  SheetClose,
  SheetComp,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
  type SheetSide,
  type SheetSize,
} from './SheetComp';

export type { SheetSide, SheetSize };

export type SheetType = 'default' | 'info' | 'confirmation' | 'settings';

export type SheetBackground =
  | 'default'
  | 'white'
  | 'muted'
  | 'glass'
  | 'gradient'
  | 'blue'
  | 'yellow'
  | 'gray'
  | 'red'
  | 'green'
  | 'purple';

/** @deprecated Prefer `SheetBackground`. Kept for DynamicSheet / config callers. */
export type SheetBgColor =
  | 'white'
  | 'gray'
  | 'slate'
  | 'zinc'
  | 'neutral'
  | 'stone'
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose'
  | 'transparent'
  | 'glass'
  | 'gradient';

/** @deprecated Prefer `SheetBackground`. Kept for DynamicSheet / config callers. */
export type SheetBgIntensity =
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | '950';

export interface SheetAction {
  id?: string;
  label: string;
  variant?: ButtonVariant;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  closeOnClick?: boolean;
}

export interface SheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  triggerText?: string;
  triggerVariant?: ButtonVariant;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  actions?: SheetAction[];
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  side?: SheetSide;
  size?: SheetSize;
  type?: SheetType;
  background?: SheetBackground;
  customBgColor?: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
  onActionClick?: (actionId: string) => void;
}

export interface SheetConfig {
  id: string;
  title: string;
  description?: string;
  side?: SheetSide;
  size?: SheetSize;
  actions?: SheetAction[];
  content?: React.ReactNode;
  className?: string;
  showClose?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  background?: SheetBackground;
  /** @deprecated Prefer `background`. */
  backgroundColor?: SheetBgColor;
  /** @deprecated Prefer `background`. */
  backgroundIntensity?: SheetBgIntensity;
  customBgColor?: string;
}

export interface DynamicSheetProps {
  config: SheetConfig;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onActionClick?: (actionId: string) => void;
  className?: string;
}

const BACKGROUND_CLASSES: Record<SheetBackground, string> = {
  default: 'bg-white dark:bg-gray-950',
  white: 'bg-white',
  muted: 'bg-gray-50 dark:bg-gray-900',
  glass: 'bg-white/10 backdrop-blur-md border border-white/20',
  gradient: 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950',
  blue: 'bg-blue-50 dark:bg-blue-950',
  yellow: 'bg-yellow-50 dark:bg-yellow-950',
  gray: 'bg-gray-50 dark:bg-gray-900',
  red: 'bg-red-50 dark:bg-red-950',
  green: 'bg-green-50 dark:bg-green-950',
  purple: 'bg-purple-50 dark:bg-purple-950',
};

const LEGACY_BG_MAP: Partial<Record<SheetBgColor, SheetBackground>> = {
  white: 'white',
  gray: 'gray',
  slate: 'muted',
  zinc: 'muted',
  neutral: 'muted',
  stone: 'muted',
  red: 'red',
  orange: 'yellow',
  amber: 'yellow',
  yellow: 'yellow',
  lime: 'green',
  green: 'green',
  emerald: 'green',
  teal: 'blue',
  cyan: 'blue',
  sky: 'blue',
  blue: 'blue',
  indigo: 'purple',
  violet: 'purple',
  purple: 'purple',
  fuchsia: 'purple',
  pink: 'red',
  rose: 'red',
  transparent: 'default',
  glass: 'glass',
  gradient: 'gradient',
};

const TYPE_CONFIGS: Record<
  SheetType,
  {
    title: string;
    description: string;
    side: SheetSide;
    size: SheetSize;
    background: SheetBackground;
    actions: SheetAction[];
  }
> = {
  default: {
    title: 'Sheet',
    description: '',
    side: 'right',
    size: 'md',
    background: 'default',
    actions: [{ id: 'close', label: 'Close', variant: 'outline', closeOnClick: true }],
  },
  info: {
    title: 'Information',
    description: 'This is an informational sheet.',
    side: 'right',
    size: 'md',
    background: 'blue',
    actions: [{ id: 'ok', label: 'OK', variant: 'primary', closeOnClick: true }],
  },
  confirmation: {
    title: 'Confirm Action',
    description: 'Are you sure you want to proceed? This action cannot be undone.',
    side: 'top',
    size: 'sm',
    background: 'yellow',
    actions: [
      { id: 'confirm', label: 'Confirm', variant: 'destructive', closeOnClick: true },
      { id: 'cancel', label: 'Cancel', variant: 'outline', closeOnClick: true },
    ],
  },
  settings: {
    title: 'Settings',
    description: 'Configure your application settings.',
    side: 'right',
    size: 'lg',
    background: 'gray',
    actions: [
      { id: 'save', label: 'Save', variant: 'primary', closeOnClick: true },
      { id: 'cancel', label: 'Cancel', variant: 'outline', closeOnClick: true },
    ],
  },
};

function resolveBackground(
  background?: SheetBackground,
  backgroundColor?: SheetBgColor,
  customBgColor?: string
): { className: string; style?: React.CSSProperties; hasCustom: boolean } {
  if (customBgColor) {
    return { className: '', style: { backgroundColor: customBgColor }, hasCustom: true };
  }
  if (background) {
    return {
      className: BACKGROUND_CLASSES[background],
      hasCustom: background !== 'default',
    };
  }
  if (backgroundColor) {
    const mapped = LEGACY_BG_MAP[backgroundColor] ?? 'default';
    return {
      className: BACKGROUND_CLASSES[mapped],
      hasCustom: mapped !== 'default',
    };
  }
  return { className: BACKGROUND_CLASSES.default, hasCustom: false };
}

const Sheet: React.FC<SheetProps> = React.memo(
  ({
    open,
    onOpenChange,
    trigger,
    triggerText = 'Open Sheet',
    triggerVariant = 'outline',
    title,
    description,
    children,
    actions,
    showCloseButton = true,
    closeOnOverlayClick = true,
    closeOnEscape = true,
    showHeader = true,
    showFooter = true,
    side,
    size,
    type = 'default',
    background,
    customBgColor,
    loading = false,
    disabled = false,
    className,
    contentClassName,
    headerClassName,
    footerClassName,
    onActionClick,
  }) => {
    const [isOpen, setIsOpen] = React.useState(open ?? false);
    const preset = TYPE_CONFIGS[type];

    React.useEffect(() => {
      if (open !== undefined) setIsOpen(open);
    }, [open]);

    const finalTitle = title ?? preset.title;
    const finalDescription = description ?? preset.description;
    const finalActions = actions ?? preset.actions;
    const finalSide = side ?? preset.side;
    const finalSize = size ?? preset.size;
    const bg = resolveBackground(background ?? preset.background, undefined, customBgColor);

    const handleOpenChange = React.useCallback(
      (next: boolean) => {
        setIsOpen(next);
        onOpenChange?.(next);
      },
      [onOpenChange]
    );

    const handleActionClick = React.useCallback(
      (action: SheetAction) => {
        action.onClick?.();
        if (action.id) onActionClick?.(action.id);
        if (action.closeOnClick !== false) {
          handleOpenChange(false);
        }
      },
      [handleOpenChange, onActionClick]
    );

    const handlePointerDownOutside = React.useCallback(
      (event: Event) => {
        if (!closeOnOverlayClick) event.preventDefault();
      },
      [closeOnOverlayClick]
    );

    const handleEscapeKeyDown = React.useCallback(
      (event: KeyboardEvent) => {
        if (!closeOnEscape) event.preventDefault();
      },
      [closeOnEscape]
    );

    const triggerElement = trigger ? (
      <SheetTrigger asChild>{trigger}</SheetTrigger>
    ) : (
      <SheetTrigger asChild>
        <Button variant={triggerVariant} disabled={disabled}>
          {triggerText}
        </Button>
      </SheetTrigger>
    );

    return (
      <SheetComp open={isOpen} onOpenChange={handleOpenChange}>
        {triggerElement}
        <SheetContent
          side={finalSide}
          size={finalSize}
          showCloseButton={showCloseButton}
          hasCustomBackground={bg.hasCustom}
          className={cn(bg.className, contentClassName, className)}
          style={bg.style}
          onPointerDownOutside={handlePointerDownOutside}
          onEscapeKeyDown={handleEscapeKeyDown}
        >
          {showHeader ? (
            <SheetHeader className={headerClassName}>
              <SheetTitle>{finalTitle}</SheetTitle>
              {finalDescription ? (
                <SheetDescription>{finalDescription}</SheetDescription>
              ) : null}
            </SheetHeader>
          ) : null}

          {children ? <div className="flex-1 py-2">{children}</div> : null}

          {showFooter && finalActions.length > 0 ? (
            <SheetFooter className={footerClassName}>
              {finalActions.map((action, index) => (
                <Button
                  key={action.id ?? `${action.label}-${index}`}
                  type={action.type ?? 'button'}
                  variant={action.variant ?? 'primary'}
                  disabled={action.disabled || disabled || loading}
                  className={loading ? 'opacity-50' : undefined}
                  onClick={() => handleActionClick(action)}
                >
                  {action.label}
                </Button>
              ))}
            </SheetFooter>
          ) : null}
        </SheetContent>
      </SheetComp>
    );
  }
);

Sheet.displayName = 'Sheet';

function DynamicSheet({
  config,
  trigger,
  open,
  onOpenChange,
  onActionClick,
  className,
}: DynamicSheetProps) {
  const mappedBackground =
    config.background ??
    (config.backgroundColor ? LEGACY_BG_MAP[config.backgroundColor] : undefined);

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
      trigger={trigger}
      triggerText={`Open ${config.title}`}
      title={config.title}
      description={config.description}
      side={config.side}
      size={config.size}
      actions={config.actions}
      showCloseButton={config.showClose !== false}
      closeOnOverlayClick={config.closeOnOverlayClick !== false}
      closeOnEscape={config.closeOnEscape !== false}
      showHeader={config.showHeader !== false}
      showFooter={config.showFooter !== false}
      background={mappedBackground}
      customBgColor={config.customBgColor}
      onActionClick={onActionClick}
      className={cn(config.className, className)}
    >
      {config.content}
    </Sheet>
  );
}

DynamicSheet.displayName = 'DynamicSheet';

function createSheet(config: SheetConfig) {
  return (props: Omit<DynamicSheetProps, 'config'>) => (
    <DynamicSheet {...props} config={config} />
  );
}

const InfoSheet = createSheet({
  id: 'info',
  title: 'Information',
  description: 'This is an informational sheet.',
  side: 'right',
  size: 'md',
  background: 'blue',
  content: (
    <div className="space-y-4 py-4">
      <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950">
        <h4 className="font-semibold text-blue-900 dark:text-blue-100">Information</h4>
        <p className="mt-1 text-sm text-blue-700 dark:text-blue-200">
          This is a simple informational sheet with custom content.
        </p>
      </div>
    </div>
  ),
  actions: [{ id: 'ok', label: 'OK', variant: 'primary', closeOnClick: true }],
});

const ConfirmationSheet = createSheet({
  id: 'confirmation',
  title: 'Confirm Action',
  description: 'Are you sure you want to proceed? This action cannot be undone.',
  side: 'top',
  size: 'sm',
  background: 'yellow',
  content: (
    <div className="py-4">
      <p className="text-sm text-yellow-700 dark:text-yellow-200">
        Are you sure you want to proceed?
      </p>
    </div>
  ),
  actions: [
    { id: 'confirm', label: 'Confirm', variant: 'destructive', closeOnClick: true },
    { id: 'cancel', label: 'Cancel', variant: 'outline', closeOnClick: true },
  ],
});

const SettingsSheet = createSheet({
  id: 'settings',
  title: 'Settings',
  description: 'Configure your application settings.',
  side: 'right',
  size: 'lg',
  background: 'gray',
  content: (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <h4 className="font-semibold">Appearance</h4>
        <label className="flex items-center justify-between text-sm">
          Dark Mode
          <input type="checkbox" className="rounded" />
        </label>
      </div>
      <div className="space-y-2">
        <h4 className="font-semibold">Privacy</h4>
        <label className="flex items-center justify-between text-sm">
          Analytics
          <input type="checkbox" className="rounded" />
        </label>
      </div>
    </div>
  ),
  actions: [
    { id: 'save', label: 'Save', variant: 'primary', closeOnClick: true },
    { id: 'cancel', label: 'Cancel', variant: 'outline', closeOnClick: true },
  ],
});

export {
  Sheet,
  DynamicSheet,
  InfoSheet,
  SettingsSheet,
  ConfirmationSheet,
  createSheet,
  SheetClose,
  SheetComp,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
  BACKGROUND_CLASSES as SHEET_BACKGROUND_CLASSES,
  TYPE_CONFIGS as SHEET_TYPE_CONFIGS,
};
