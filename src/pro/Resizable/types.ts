import type { ComponentPropsWithRef, ReactNode } from 'react';

export interface PanelConfig {
  id: string;
  content: ReactNode;
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  className?: string;
  children?: PanelConfig[];
  title?: string;
  closable?: boolean;
  resizable?: boolean;
  collapsible?: boolean;
  collapsed?: boolean;
  draggable?: boolean;
  color?: string;
  lazy?: boolean;
  loading?: boolean;
  error?: string;
  metadata?: Record<string, any>;
}

export interface DynamicResizableProps extends ComponentPropsWithRef<'div'> {
  direction?: 'horizontal' | 'vertical';
  type?: 'basic' | 'vertical' | 'nested' | 'dynamic';
  className?: string;
  panels?: PanelConfig[];
  height?: string | number;
  width?: string | number;
  showHandles?: boolean;
  handleClassName?: string;
  editable?: boolean;
  addable?: boolean;
  removable?: boolean;
  draggable?: boolean;
  collapsible?: boolean;
  onPanelsChange?: (panels: PanelConfig[]) => void;
  onPanelAdd?: (panel: PanelConfig) => void;
  onPanelRemove?: (panelId: string) => void;
  onPanelCollapse?: (panelId: string, collapsed: boolean) => void;
  onPanelError?: (panelId: string, error: string) => void;
  showControls?: boolean;
  controlsPosition?: 'top' | 'bottom' | 'left' | 'right';
  enableVirtualization?: boolean;
  maxPanels?: number;
  debounceMs?: number;
  debug?: boolean;
}
