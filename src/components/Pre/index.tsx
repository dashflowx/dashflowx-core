import { cn } from '@/lib/utils';
import { ComponentPropsWithRef, forwardRef } from 'react';
import { CopyButton, CopyNpmCommandButton } from '../CopyButton';

export type PreVariant = 'default' | 'muted' | 'soft' | 'bordered' | 'terminal';
export type PreSize = 'sm' | 'md' | 'lg';
export type PreStyle = 'default' | 'new-york';

export interface PreNpmCommands {
  __bunCommand__: string;
  __npmCommand__: string;
  __yarnCommand__: string;
  __pnpmCommand__: string;
}

export interface PreProps extends ComponentPropsWithRef<'pre'> {
  variant?: PreVariant;
  size?: PreSize;
  /** MDX / rehype style token. Prefer over clashing with CSS `style`. */
  __style__?: PreStyle;
  __src__?: string;
  __rawString__?: string;
  __withMeta__?: boolean;
  __bunCommand__?: string;
  __npmCommand__?: string;
  __yarnCommand__?: string;
  __pnpmCommand__?: string;
  showCopy?: boolean;
}

const VARIANT_CLASSES: Record<PreVariant, string> = {
  default: 'border bg-zinc-950 text-white dark:bg-zinc-900',
  muted: 'border border-zinc-700 bg-zinc-900 text-zinc-200',
  soft: 'border border-slate-200 bg-slate-100 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100',
  bordered: 'border-2 border-zinc-500 bg-zinc-950 text-white dark:bg-zinc-900',
  terminal: 'border border-emerald-900 bg-black font-mono text-emerald-400',
};

const SIZE_CLASSES: Record<PreSize, string> = {
  sm: 'max-h-[320px] py-2 text-xs',
  md: 'max-h-[650px] py-4 text-sm',
  lg: 'max-h-[800px] py-5 text-base',
};

const STYLE_CLASSES: Record<PreStyle, string> = {
  default: 'rounded-lg',
  'new-york': 'rounded-md',
};

export const Pre = forwardRef<HTMLPreElement, PreProps>(
  (
    {
      children,
      className,
      variant = 'default',
      size = 'md',
      showCopy = true,
      __src__,
      __style__ = 'default',
      __withMeta__,
      __rawString__,
      __bunCommand__,
      __npmCommand__,
      __yarnCommand__,
      __pnpmCommand__,
      ...props
    },
    ref
  ) => {
    const hasNpmCommands = Boolean(
      __npmCommand__ && __yarnCommand__ && __pnpmCommand__ && __bunCommand__
    );
    const showCopyButton = showCopy && Boolean(__rawString__) && !hasNpmCommands;
    const showNpmCopy = showCopy && hasNpmCommands;

    return (
      <div className="relative">
        <pre
          ref={ref}
          className={cn(
            'mb-4 mt-6 overflow-x-auto',
            VARIANT_CLASSES[variant],
            SIZE_CLASSES[size],
            STYLE_CLASSES[__style__],
            className
          )}
          {...props}
        >
          {children}
        </pre>

        {showCopyButton ? (
          <CopyButton
            value={__rawString__!}
            src={__src__}
            className={cn('absolute right-4 top-4', __withMeta__ && 'top-16')}
          />
        ) : null}

        {showNpmCopy ? (
          <CopyNpmCommandButton
            commands={{
              __bunCommand__: __bunCommand__!,
              __npmCommand__: __npmCommand__!,
              __yarnCommand__: __yarnCommand__!,
              __pnpmCommand__: __pnpmCommand__!,
            }}
            className={cn('absolute right-4 top-4', __withMeta__ && 'top-16')}
          />
        ) : null}
      </div>
    );
  }
);

Pre.displayName = 'Pre';

/** @deprecated Use `Pre`. Kept for existing `pre` imports. */
export const pre = Pre;
