import { cn } from '@/lib/utils';
import React, { 
  useState, 
  useCallback, 
  useRef, 
  useEffect, 
  useMemo,
  memo,
  useTransition
} from 'react';
import { Plus, X, GripVertical, Settings, Maximize2, Minimize2, Loader2 } from 'lucide-react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from './ResizableComp';
import type { PanelConfig, DynamicResizableProps } from './types';
import { getColorClasses } from './utils';

// Panel Templates (must be in component file for JSX)
const PANEL_TEMPLATES = {
  basic: {
    id: 'panel-1',
    title: 'Panel One',
    content: (
      <div className="flex h-[200px] items-center justify-center p-6 bg-gray-50">
        <span className="font-semibold text-gray-700">Panel One</span>
      </div>
    ),
    defaultSize: 50,
    color: 'gray',
    closable: true,
  },
  editor: {
    id: 'editor',
    title: 'Code Editor',
    content: (
      <div className="flex h-full items-center justify-center p-6 bg-blue-50">
        <div className="text-center">
          <h3 className="font-semibold text-blue-700 mb-2">Code Editor</h3>
          <p className="text-blue-600 text-sm">Write your code here</p>
        </div>
      </div>
    ),
    defaultSize: 50,
    color: 'blue',
    closable: true,
    resizable: true,
    collapsible: true,
  },
  preview: {
    id: 'preview',
    title: 'Preview',
    content: (
      <div className="flex h-full items-center justify-center p-6 bg-green-50">
        <div className="text-center">
          <h3 className="font-semibold text-green-700 mb-2">Preview</h3>
          <p className="text-green-600 text-sm">See your changes</p>
        </div>
      </div>
    ),
    defaultSize: 50,
    color: 'green',
    closable: true,
    resizable: true,
    collapsible: true,
  },
} as const;

const createPanelTemplate = (template: keyof typeof PANEL_TEMPLATES, overrides: Partial<PanelConfig> = {}): PanelConfig => ({
  ...PANEL_TEMPLATES[template],
  id: `${template}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  ...overrides,
});

// Memoized Components
const PanelControls = memo(({ 
  panel, 
  onRemove, 
  onCollapse, 
  onSettings,
  removable = true,
  collapsible = true,
  debug = false
}: {
  panel: PanelConfig;
  onRemove?: (id: string) => void;
  onCollapse?: (id: string, collapsed: boolean) => void;
  onSettings?: (id: string) => void;
  removable?: boolean;
  collapsible?: boolean;
  debug?: boolean;
}) => {
  const handleRemove = useCallback(() => {
    onRemove?.(panel.id);
  }, [onRemove, panel.id]);

  const handleCollapse = useCallback(() => {
    onCollapse?.(panel.id, !panel.collapsed);
  }, [onCollapse, panel.id, panel.collapsed]);

  const handleSettings = useCallback(() => {
    onSettings?.(panel.id);
  }, [onSettings, panel.id]);

  if (debug) {
    console.log('PanelControls render:', panel.id);
  }

  return (
    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
      {collapsible && (
        <button
          onClick={handleCollapse}
          className="p-1 rounded bg-white/80 hover:bg-white shadow-sm border transition-colors"
          title={panel.collapsed ? "Expand" : "Collapse"}
          aria-label={panel.collapsed ? "Expand panel" : "Collapse panel"}
        >
          {panel.collapsed ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
        </button>
      )}
      {onSettings && (
        <button
          onClick={handleSettings}
          className="p-1 rounded bg-white/80 hover:bg-white shadow-sm border transition-colors"
          title="Settings"
          aria-label="Panel settings"
        >
          <Settings className="h-3 w-3" />
        </button>
      )}
      {removable && (
        <button
          onClick={handleRemove}
          className="p-1 rounded bg-red-100 hover:bg-red-200 text-red-600 shadow-sm border transition-colors"
          title="Remove"
          aria-label="Remove panel"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
});

PanelControls.displayName = 'PanelControls';

const PanelTitle = memo(({ title, color }: { title: string; color?: string }) => {
  const colorClasses = getColorClasses(color);
  
  return (
    <div className={cn(
      "absolute top-2 left-2 bg-white/80 px-2 py-1 rounded text-xs font-medium border",
      colorClasses
    )}>
      {title}
    </div>
  );
});

PanelTitle.displayName = 'PanelTitle';

const LoadingPanel = memo(({ title }: { title?: string }) => (
  <div className="flex h-full items-center justify-center p-6 bg-gray-100">
    <div className="text-center">
      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-gray-500" />
      <p className="text-sm text-gray-600">{title || 'Loading...'}</p>
    </div>
  </div>
));

LoadingPanel.displayName = 'LoadingPanel';

const ErrorPanel = memo(({ error, onRetry }: { error: string; onRetry?: () => void }) => (
  <div className="flex h-full items-center justify-center p-6 bg-red-50">
    <div className="text-center">
      <div className="text-red-600 mb-2">⚠️</div>
      <p className="text-sm text-red-700 mb-2">{error}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded text-xs"
        >
          Retry
        </button>
      )}
    </div>
  </div>
));

ErrorPanel.displayName = 'ErrorPanel';

// Main Panel Component with optimizations
const DynamicPanel = memo(({ 
  panel, 
  direction, 
  onRemove,
  onCollapse,
  onSettings,
  removable = true,
  collapsible = true,
  draggable = false,
  debug = false
}: { 
  panel: PanelConfig; 
  direction: 'horizontal' | 'vertical';
  onRemove?: (id: string) => void;
  onCollapse?: (id: string, collapsed: boolean) => void;
  onSettings?: (id: string) => void;
  removable?: boolean;
  collapsible?: boolean;
  draggable?: boolean;
  debug?: boolean;
}) => {
  const [isLoaded, setIsLoaded] = useState(!panel.lazy);
  const [isLoading, setIsLoading] = useState(panel.lazy && !isLoaded);
  const [error, setError] = useState<string | null>(panel.error || null);

  // Lazy loading effect
  useEffect(() => {
    if (panel.lazy && !isLoaded) {
      setIsLoading(true);
      // Simulate async loading
      const timer = setTimeout(() => {
        setIsLoaded(true);
        setIsLoading(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [panel.lazy, isLoaded]);

  const handleRetry = useCallback(() => {
    setError(null);
    setIsLoaded(false);
    setIsLoading(true);
  }, []);

  const panelStyle = useMemo(() => ({
    display: panel.collapsed ? 'none' : 'block',
    backgroundColor: panel.color ? `${panel.color}20` : undefined
  }), [panel.collapsed, panel.color]);

  const panelClassName = useMemo(() => cn(
    'relative group',
    panel.className,
    panel.collapsed && 'pointer-events-none'
  ), [panel.className, panel.collapsed]);

  if (debug) {
    console.log('DynamicPanel render:', panel.id, { isLoaded, isLoading, error });
  }

  // Render loading state
  if (isLoading) {
    return (
      <ResizablePanel
        key={panel.id}
        defaultSize={panel.defaultSize}
        minSize={panel.minSize}
        maxSize={panel.maxSize}
        className={panelClassName}
        style={panelStyle}
      >
        <PanelTitle title={panel.title || 'Loading...'} color={panel.color} />
        <LoadingPanel title={panel.title} />
      </ResizablePanel>
    );
  }

  // Render error state
  if (error) {
    return (
      <ResizablePanel
        key={panel.id}
        defaultSize={panel.defaultSize}
        minSize={panel.minSize}
        maxSize={panel.maxSize}
        className={panelClassName}
        style={panelStyle}
      >
        <PanelTitle title={panel.title || 'Error'} color="red" />
        <ErrorPanel error={error} onRetry={handleRetry} />
      </ResizablePanel>
    );
  }

  // Render nested panels
  if (panel.children && panel.children.length > 0) {
    return (
      <ResizablePanel
        key={panel.id}
        defaultSize={panel.defaultSize}
        minSize={panel.minSize}
        maxSize={panel.maxSize}
        className={panelClassName}
        style={panelStyle}
      >
        <PanelControls
          panel={panel}
          onRemove={onRemove}
          onCollapse={onCollapse}
          onSettings={onSettings}
          removable={removable}
          collapsible={collapsible}
          debug={debug}
        />
        <PanelTitle title={panel.title || 'Container'} color={panel.color} />
        <ResizablePanelGroup direction={direction === 'horizontal' ? 'vertical' : 'horizontal'}>
          {panel.children.map((childPanel, index) => (
            <React.Fragment key={childPanel.id}>
              <DynamicPanel 
                panel={childPanel} 
                direction={direction === 'horizontal' ? 'vertical' : 'horizontal'}
                onRemove={onRemove}
                onCollapse={onCollapse}
                onSettings={onSettings}
                removable={removable}
                collapsible={collapsible}
                draggable={draggable}
                debug={debug}
              />
              {index < panel.children!.length - 1 && <ResizableHandle />}
            </React.Fragment>
          ))}
        </ResizablePanelGroup>
      </ResizablePanel>
    );
  }

  // Render single panel
  return (
    <ResizablePanel
      key={panel.id}
      defaultSize={panel.defaultSize}
      minSize={panel.minSize}
      maxSize={panel.maxSize}
      className={panelClassName}
      style={panelStyle}
    >
      <PanelControls
        panel={panel}
        onRemove={onRemove}
        onCollapse={onCollapse}
        onSettings={onSettings}
        removable={removable}
        collapsible={collapsible}
        debug={debug}
      />
      {panel.title && <PanelTitle title={panel.title} color={panel.color} />}
      {panel.content}
    </ResizablePanel>
  );
});

DynamicPanel.displayName = 'DynamicPanel';

// Control Bar Component
const ControlBar = memo(({
  addable,
  onAddPanel,
  panelCount,
  controlsPosition,
  debug = false
}: {
  addable: boolean;
  onAddPanel: () => void;
  panelCount: number;
  controlsPosition: 'top' | 'bottom' | 'left' | 'right';
  debug?: boolean;
}) => {
  const controlBarClassName = useMemo(() => cn(
    'flex gap-2 p-2 bg-gray-100 border-b',
    controlsPosition === 'top' && 'order-first',
    controlsPosition === 'bottom' && 'order-last',
    controlsPosition === 'left' && 'flex-col',
    controlsPosition === 'right' && 'flex-col'
  ), [controlsPosition]);

  if (debug) {
    console.log('ControlBar render:', { addable, panelCount });
  }

  return (
    <div className={controlBarClassName}>
      {addable && (
        <button
          onClick={onAddPanel}
          className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm transition-colors"
          aria-label="Add new panel"
        >
          <Plus className="h-4 w-4" />
          Add Panel
        </button>
      )}
      <div className="flex items-center gap-2 text-xs text-gray-600">
        <GripVertical className="h-4 w-4" />
        {panelCount} panels
      </div>
    </div>
  );
});

ControlBar.displayName = 'ControlBar';

// Main Resizable Component
export const Resizable = React.forwardRef<HTMLDivElement, DynamicResizableProps>(
  ({ 
    className, 
    direction = 'horizontal', 
    type = 'basic',
    panels: initialPanels,
    height = '400px',
    width = '100%',
    showHandles = true,
    handleClassName,
    removable = true,
    draggable = false,
    collapsible = true,
    addable = false,
    onPanelsChange,
    onPanelAdd,
    onPanelRemove,
    onPanelCollapse,
    onPanelError,
    showControls = false,
    controlsPosition = 'top',
    enableVirtualization = false,
    maxPanels = 10,
    debounceMs = 300,
    debug = false,
    ...props
  }, ref) => {
    const [panels, setPanels] = useState<PanelConfig[]>(initialPanels || []);
    const [isPending, startTransition] = useTransition();
    const containerRef = useRef<HTMLDivElement>(null);
    const debounceRef = useRef<NodeJS.Timeout>();

    // Debug logging
    useEffect(() => {
      if (debug) {
        console.log('Resizable render:', { 
          panelsCount: panels.length, 
          type, 
          direction,
          isPending 
        });
      }
    }, [panels.length, type, direction, isPending, debug]);

    // Optimized panel update with debouncing
    const updatePanels = useCallback((newPanels: PanelConfig[]) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      
      debounceRef.current = setTimeout(() => {
        startTransition(() => {
          setPanels(newPanels);
          onPanelsChange?.(newPanels);
        });
      }, debounceMs);
    }, [onPanelsChange, debounceMs]);

    // Update panels when initialPanels changes
    useEffect(() => {
      if (initialPanels && initialPanels !== panels) {
        setPanels(initialPanels);
      }
    }, [initialPanels]);

    // Memoized predefined panel configurations
    const predefinedPanels = useMemo(() => {
      const configs = {
        nested: [
          createPanelTemplate('editor', { 
            id: 'panel-1', 
            title: 'Main Panel',
            defaultSize: 50 
          }),
          {
            id: 'panel-2',
            title: 'Nested Container',
            content: null,
            defaultSize: 50,
            color: 'green',
            children: [
              createPanelTemplate('preview', { 
                id: 'panel-2a', 
                title: 'Sub Panel A',
                defaultSize: 25,
                color: 'green'
              }),
              createPanelTemplate('basic', { 
                id: 'panel-2b', 
                title: 'Sub Panel B',
                defaultSize: 75,
                color: 'purple'
              }),
            ],
          },
        ],
        vertical: [
          createPanelTemplate('basic', { 
            id: 'panel-1', 
            title: 'Left Panel',
            defaultSize: 40,
            color: 'red'
          }),
          createPanelTemplate('basic', { 
            id: 'panel-2', 
            title: 'Right Panel',
            defaultSize: 60,
            color: 'yellow'
          }),
        ],
        basic: [
          createPanelTemplate('basic', { id: 'panel-1', title: 'Panel One' }),
          createPanelTemplate('basic', { id: 'panel-2', title: 'Panel Two' }),
        ],
      };
      return configs[type as keyof typeof configs] || configs.basic;
    }, [type]);

    // Optimized panel operations
    const handleAddPanel = useCallback(() => {
      if (panels.length >= maxPanels) {
        console.warn(`Maximum panels limit reached: ${maxPanels}`);
        return;
      }

      const newPanel = createPanelTemplate('basic', {
        title: `New Panel ${panels.length + 1}`,
        defaultSize: Math.max(10, 100 / (panels.length + 1)),
        color: 'indigo',
        closable: true,
        resizable: true,
        collapsible: true,
        lazy: true, // Enable lazy loading for new panels
      });
      
      const newPanels = [...panels, newPanel];
      updatePanels(newPanels);
      onPanelAdd?.(newPanel);
    }, [panels, maxPanels, updatePanels, onPanelAdd]);

    const handleRemovePanel = useCallback((panelId: string) => {
      const newPanels = panels.filter(panel => panel.id !== panelId);
      updatePanels(newPanels);
      onPanelRemove?.(panelId);
    }, [panels, updatePanels, onPanelRemove]);

    const handleCollapsePanel = useCallback((panelId: string, collapsed: boolean) => {
      const updatePanel = (panel: PanelConfig): PanelConfig => {
        if (panel.id === panelId) {
          return { ...panel, collapsed };
        }
        if (panel.children) {
          return { ...panel, children: panel.children.map(updatePanel) };
        }
        return panel;
      };

      const newPanels = panels.map(updatePanel);
      updatePanels(newPanels);
      onPanelCollapse?.(panelId, collapsed);
    }, [panels, updatePanels, onPanelCollapse]);

    // Drag and drop handlers
    const handleDragOver = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      const draggedId = e.dataTransfer.getData('text/plain');
      if (draggedId) {
        console.log('Dropped panel:', draggedId);
        // TODO: Implement panel reordering logic
      }
    }, []);

    // Memoized panels to use
    const panelsToUse = useMemo(() => {
      return panels.length > 0 ? panels : predefinedPanels;
    }, [panels, predefinedPanels]);

    // Memoized container style
    const containerStyle = useMemo(() => ({
      height,
      width,
    }), [height, width]);

    // Cleanup on unmount
    useEffect(() => {
      return () => {
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
        }
      };
    }, []);

    return (
      <div 
        ref={ref || containerRef}
        className="relative"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        {...props}
      >
        {showControls && (
          <ControlBar
            addable={addable}
            onAddPanel={handleAddPanel}
            panelCount={panelsToUse.length}
            controlsPosition={controlsPosition}
            debug={debug}
          />
        )}
        
        <ResizablePanelGroup
          direction={direction}
          className={cn('rounded-lg border', className)}
          style={containerStyle}
        >
          {panelsToUse.map((panel, index) => (
            <React.Fragment key={panel.id}>
              <DynamicPanel 
                panel={panel} 
                direction={direction}
                onRemove={removable ? handleRemovePanel : undefined}
                onCollapse={collapsible ? handleCollapsePanel : undefined}
                removable={removable}
                collapsible={collapsible}
                draggable={draggable}
                debug={debug}
              />
              {showHandles && index < panelsToUse.length - 1 && (
                <ResizableHandle className={handleClassName} />
              )}
            </React.Fragment>
          ))}
        </ResizablePanelGroup>
        
        {debug && (
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs p-2 rounded">
            <div>Panels: {panelsToUse.length}</div>
            <div>Pending: {isPending ? 'Yes' : 'No'}</div>
            <div>Type: {type}</div>
          </div>
        )}
      </div>
    );
  }
);

Resizable.displayName = 'Resizable';

export {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
};