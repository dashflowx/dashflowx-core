import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Resizable } from '.';
import type { PanelConfig } from './types';

const meta: Meta<typeof Resizable> = {
  title: 'Components/Resizable',
  component: Resizable,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['basic', 'vertical', 'nested', 'dynamic'],
    },
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    className: {
      control: 'text',
    },
    height: {
      control: 'text',
    },
    width: {
      control: 'text',
    },
    showHandles: {
      control: 'boolean',
    },
    editable: {
      control: 'boolean',
    },
    addable: {
      control: 'boolean',
    },
    removable: {
      control: 'boolean',
    },
    draggable: {
      control: 'boolean',
    },
    collapsible: {
      control: 'boolean',
    },
    showControls: {
      control: 'boolean',
    },
    controlsPosition: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    enableVirtualization: {
      control: 'boolean',
    },
    maxPanels: {
      control: 'number',
    },
    debounceMs: {
      control: 'number',
    },
    debug: {
      control: 'boolean',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    type: 'basic',
    direction: 'horizontal',
    className: 'max-w-2xl',
  },
};

export const Dynamic: Story = {
  args: {
    type: 'dynamic',
    direction: 'horizontal',
    className: 'max-w-4xl',
    height: '500px',
    showControls: true,
    addable: true,
    removable: true,
    collapsible: true,
    panels: [
      {
        id: 'panel-1',
        title: 'Code Editor',
        content: (
          <div className="flex h-full items-center justify-center p-6 bg-blue-50">
            <div className="text-center">
              <h3 className="font-semibold text-blue-700 mb-2">Code Editor</h3>
              <p className="text-blue-600 text-sm">Write your code here</p>
            </div>
          </div>
        ),
        defaultSize: 40,
        minSize: 20,
        maxSize: 60,
        color: 'blue',
        closable: true,
        resizable: true,
        collapsible: true,
      },
      {
        id: 'panel-2',
        title: 'Preview',
        content: (
          <div className="flex h-full items-center justify-center p-6 bg-green-50">
            <div className="text-center">
              <h3 className="font-semibold text-green-700 mb-2">Preview</h3>
              <p className="text-green-600 text-sm">See your changes</p>
            </div>
          </div>
        ),
        defaultSize: 60,
        minSize: 40,
        maxSize: 80,
        color: 'green',
        closable: true,
        resizable: true,
        collapsible: true,
      },
    ],
  },
};

export const FullyDynamic: Story = {
  args: {
    type: 'dynamic',
    direction: 'horizontal',
    className: 'max-w-6xl',
    height: '600px',
    showControls: true,
    addable: true,
    removable: true,
    draggable: true,
    collapsible: true,
    controlsPosition: 'top',
    panels: [
      {
        id: 'sidebar',
        title: 'Sidebar',
        content: (
          <div className="flex h-full items-center justify-center p-6 bg-gray-50">
            <div className="text-center">
              <h3 className="font-semibold text-gray-700 mb-2">Sidebar</h3>
              <p className="text-gray-600 text-sm">Navigation</p>
            </div>
          </div>
        ),
        defaultSize: 25,
        minSize: 15,
        maxSize: 35,
        color: 'gray',
        closable: true,
        resizable: true,
        collapsible: true,
        draggable: true,
      },
      {
        id: 'main-content',
        title: 'Main Content',
        content: (
          <div className="flex h-full items-center justify-center p-6 bg-orange-50">
            <div className="text-center">
              <h3 className="font-semibold text-orange-700 mb-2">Main Content</h3>
              <p className="text-orange-600 text-sm">Your content area</p>
            </div>
          </div>
        ),
        defaultSize: 50,
        minSize: 30,
        maxSize: 70,
        color: 'orange',
        closable: true,
        resizable: true,
        collapsible: true,
        draggable: true,
      },
      {
        id: 'properties',
        title: 'Properties',
        content: (
          <div className="flex h-full items-center justify-center p-6 bg-purple-50">
            <div className="text-center">
              <h3 className="font-semibold text-purple-700 mb-2">Properties</h3>
              <p className="text-purple-600 text-sm">Settings & Options</p>
            </div>
          </div>
        ),
        defaultSize: 25,
        minSize: 15,
        maxSize: 35,
        color: 'purple',
        closable: true,
        resizable: true,
        collapsible: true,
        draggable: true,
      },
    ],
  },
};

export const CollapsiblePanels: Story = {
  args: {
    type: 'dynamic',
    direction: 'vertical',
    className: 'max-w-md',
    height: '600px',
    showControls: true,
    addable: true,
    removable: true,
    collapsible: true,
    controlsPosition: 'top',
    panels: [
      {
        id: 'header',
        title: 'Header',
        content: (
          <div className="flex h-full items-center justify-center p-6 bg-purple-50">
            <div className="text-center">
              <h3 className="font-semibold text-purple-700 mb-2">Header</h3>
              <p className="text-purple-600 text-sm">Navigation & Tools</p>
            </div>
          </div>
        ),
        defaultSize: 15,
        minSize: 10,
        maxSize: 25,
        color: 'purple',
        closable: true,
        collapsible: true,
      },
      {
        id: 'content',
        title: 'Main Content',
        content: (
          <div className="flex h-full items-center justify-center p-6 bg-orange-50">
            <div className="text-center">
              <h3 className="font-semibold text-orange-700 mb-2">Main Content</h3>
              <p className="text-orange-600 text-sm">Your content area</p>
            </div>
          </div>
        ),
        defaultSize: 70,
        minSize: 50,
        maxSize: 80,
        color: 'orange',
        closable: true,
        collapsible: true,
      },
      {
        id: 'footer',
        title: 'Footer',
        content: (
          <div className="flex h-full items-center justify-center p-6 bg-teal-50">
            <div className="text-center">
              <h3 className="font-semibold text-teal-700 mb-2">Footer</h3>
              <p className="text-teal-600 text-sm">Status & Info</p>
            </div>
          </div>
        ),
        defaultSize: 15,
        minSize: 10,
        maxSize: 25,
        color: 'teal',
        closable: true,
        collapsible: true,
      },
    ],
  },
};

export const DraggablePanels: Story = {
  args: {
    type: 'dynamic',
    direction: 'horizontal',
    className: 'max-w-4xl',
    height: '400px',
    showControls: true,
    addable: true,
    removable: true,
    draggable: true,
    collapsible: true,
    controlsPosition: 'top',
    panels: [
      {
        id: 'panel-1',
        title: 'Panel 1',
        content: (
          <div className="flex h-full items-center justify-center p-6 bg-red-50">
            <span className="font-semibold text-red-700">Drag me!</span>
          </div>
        ),
        defaultSize: 33,
        color: 'red',
        closable: true,
        draggable: true,
      },
      {
        id: 'panel-2',
        title: 'Panel 2',
        content: (
          <div className="flex h-full items-center justify-center p-6 bg-yellow-50">
            <span className="font-semibold text-yellow-700">Drag me!</span>
          </div>
        ),
        defaultSize: 33,
        color: 'yellow',
        closable: true,
        draggable: true,
      },
      {
        id: 'panel-3',
        title: 'Panel 3',
        content: (
          <div className="flex h-full items-center justify-center p-6 bg-green-50">
            <span className="font-semibold text-green-700">Drag me!</span>
          </div>
        ),
        defaultSize: 34,
        color: 'green',
        closable: true,
        draggable: true,
      },
    ],
  },
};

export const OptimizedPerformance: Story = {
  args: {
    type: 'dynamic',
    direction: 'horizontal',
    className: 'max-w-6xl',
    height: '600px',
    showControls: true,
    addable: true,
    removable: true,
    collapsible: true,
    enableVirtualization: true,
    maxPanels: 8,
    debounceMs: 200,
    debug: true,
    panels: [
      {
        id: 'editor-1',
        title: 'Code Editor',
        content: (
          <div className="flex h-full items-center justify-center p-6 bg-blue-50">
            <div className="text-center">
              <h3 className="font-semibold text-blue-700 mb-2">Code Editor</h3>
              <p className="text-blue-600 text-sm">Write your code here</p>
            </div>
          </div>
        ),
        defaultSize: 40,
        color: 'blue',
        lazy: true,
        closable: true,
        resizable: true,
        collapsible: true,
      },
      {
        id: 'preview-1',
        title: 'Live Preview',
        content: (
          <div className="flex h-full items-center justify-center p-6 bg-green-50">
            <div className="text-center">
              <h3 className="font-semibold text-green-700 mb-2">Preview</h3>
              <p className="text-green-600 text-sm">See your changes</p>
            </div>
          </div>
        ),
        defaultSize: 35,
        color: 'green',
        lazy: true,
        closable: true,
        resizable: true,
        collapsible: true,
      },
      {
        id: 'terminal-1',
        title: 'Terminal',
        content: (
          <div className="flex h-full items-center justify-center p-6 bg-gray-50">
            <span className="font-semibold text-gray-700">Terminal</span>
          </div>
        ),
        defaultSize: 25,
        color: 'gray',
        lazy: true,
        closable: true,
      },
    ],
  },
};

export const LazyLoading: Story = {
  args: {
    type: 'dynamic',
    direction: 'horizontal',
    className: 'max-w-4xl',
    height: '500px',
    showControls: true,
    addable: true,
    removable: true,
    collapsible: true,
    debug: true,
    panels: [
      {
        id: 'instant-panel',
        title: 'Instant Panel',
        content: (
          <div className="flex h-full items-center justify-center p-6 bg-green-50">
            <span className="font-semibold text-green-700">Loaded Instantly</span>
          </div>
        ),
        defaultSize: 50,
        color: 'green',
        lazy: false,
      },
      {
        id: 'lazy-panel-1',
        title: 'Lazy Panel 1',
        content: (
          <div className="flex h-full items-center justify-center p-6 bg-blue-50">
            <span className="font-semibold text-blue-700">Lazy Loaded</span>
          </div>
        ),
        defaultSize: 25,
        color: 'blue',
        lazy: true,
      },
      {
        id: 'lazy-panel-2',
        title: 'Lazy Panel 2',
        content: (
          <div className="flex h-full items-center justify-center p-6 bg-purple-50">
            <span className="font-semibold text-purple-700">Also Lazy</span>
          </div>
        ),
        defaultSize: 25,
        color: 'purple',
        lazy: true,
      },
    ],
  },
};

export const ErrorHandling: Story = {
  args: {
    type: 'dynamic',
    direction: 'horizontal',
    className: 'max-w-4xl',
    height: '400px',
    showControls: true,
    addable: true,
    removable: true,
    collapsible: true,
    debug: true,
    panels: [
      {
        id: 'working-panel',
        title: 'Working Panel',
        content: (
          <div className="flex h-full items-center justify-center p-6 bg-green-50">
            <span className="font-semibold text-green-700">Working Panel</span>
          </div>
        ),
        defaultSize: 50,
        color: 'green',
        closable: true,
      },
      {
        id: 'error-panel',
        title: 'Error Panel',
        content: null,
        defaultSize: 50,
        color: 'red',
        error: 'Failed to load content',
        closable: true,
      },
    ],
    onPanelError: (panelId: string, error: Error) => {
      console.log(`Panel ${panelId} error:`, error);
    },
  },
};

export const PerformanceComparison: Story = {
  render: () => {
    const [panels, setPanels] = React.useState<PanelConfig[]>(() => 
      Array.from({ length: 6 }, (_, i) => ({
        id: `panel-${i}`,
        title: `Panel ${i + 1}`,
        content: (
          <div className={`flex h-full items-center justify-center p-6 bg-${['blue', 'green', 'red', 'yellow', 'purple', 'orange'][i]}-50`}>
            <span className={`font-semibold text-${['blue', 'green', 'red', 'yellow', 'purple', 'orange'][i]}-700`}>Panel {i + 1}</span>
          </div>
        ),
        defaultSize: 100 / 6,
        color: ['blue', 'green', 'red', 'yellow', 'purple', 'orange'][i],
        lazy: i > 2, // First 3 panels load instantly, rest are lazy
        closable: true,
      }))
    );

    return (
      <div className="space-y-6 max-w-6xl">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2 text-blue-800">Performance Optimized Resizable</h3>
          <p className="text-sm text-blue-700 mb-4">
            Features: Memoization, Lazy Loading, Debounced Updates, Virtualization Ready
          </p>
          <div className="grid grid-cols-2 gap-4 text-xs text-blue-600">
            <div>
              <strong>Current Panels:</strong> {panels.length}
            </div>
            <div>
              <strong>Lazy Panels:</strong> {panels.filter(p => p.lazy).length}
            </div>
          </div>
        </div>
        
        <Resizable
          type="dynamic"
          direction="horizontal"
          className="max-w-6xl"
          height="500px"
          panels={panels}
          showControls={true}
          addable={true}
          removable={true}
          collapsible={true}
          enableVirtualization={true}
          maxPanels={10}
          debounceMs={150}
          debug={true}
          controlsPosition="top"
          onPanelsChange={setPanels}
          onPanelAdd={(panel) => console.log('Panel added:', panel)}
          onPanelRemove={(id) => console.log('Panel removed:', id)}
          onPanelCollapse={(id, collapsed) => console.log('Panel collapsed:', id, collapsed)}
        />
        
        <div className="p-3 bg-gray-100 rounded text-xs text-gray-600">
          <strong>Performance Features:</strong>
          <ul className="mt-1 space-y-1">
            <li>• Memoized components prevent unnecessary re-renders</li>
            <li>• Lazy loading reduces initial render time</li>
            <li>• Debounced updates prevent excessive state changes</li>
            <li>• Panel limits prevent memory issues</li>
            <li>• Debug mode shows performance metrics</li>
          </ul>
        </div>
      </div>
    );
  },
};

export const InteractiveDemo: Story = {
  render: () => {
    const [panels, setPanels] = React.useState<PanelConfig[]>([
      {
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
        lazy: false,
        closable: true,
        resizable: true,
        collapsible: true,
      },
      {
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
        lazy: false,
        closable: true,
        resizable: true,
        collapsible: true,
      },
    ]);

    return (
      <div className="space-y-4 max-w-6xl">
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold mb-2">Interactive Dynamic Resizable</h3>
          <p className="text-sm text-gray-600 mb-4">
            Try adding panels, removing them, collapsing, and dragging to reorder!
          </p>
          <div className="text-xs text-gray-500">
            Current panels: {panels.map(p => p.title).join(', ')}
          </div>
        </div>
        
        <Resizable
          type="dynamic"
          direction="horizontal"
          className="max-w-6xl"
          height="500px"
          panels={panels}
          showControls={true}
          addable={true}
          removable={true}
          draggable={true}
          collapsible={true}
          controlsPosition="top"
          maxPanels={8}
          debounceMs={200}
          onPanelsChange={setPanels}
          onPanelAdd={(panel) => console.log('Panel added:', panel)}
          onPanelRemove={(id) => console.log('Panel removed:', id)}
          onPanelCollapse={(id, collapsed) => console.log('Panel collapsed:', id, collapsed)}
        />
      </div>
    );
  },
};

export const AllTypes: Story = {
  render: () => (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Layout</h3>
        <Resizable type="basic" direction="horizontal" className="max-w-2xl" />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Vertical Layout</h3>
        <Resizable type="vertical" direction="horizontal" className="max-w-2xl" />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Nested Layout</h3>
        <Resizable type="nested" direction="horizontal" className="max-w-2xl" />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Dynamic Layout with Controls</h3>
        <Resizable
          type="dynamic"
          direction="horizontal"
          className="max-w-4xl"
          height="400px"
          showControls={true}
          addable={true}
          removable={true}
          collapsible={true}
          panels={[
            {
              id: 'left',
              title: 'Left Panel',
              content: (
                <div className="flex h-full items-center justify-center p-6 bg-indigo-50">
                  <span className="font-semibold text-indigo-700">Dynamic Left</span>
                </div>
              ),
              defaultSize: 30,
              color: 'indigo',
              closable: true,
            },
            {
              id: 'center',
              title: 'Center Panel',
              content: (
                <div className="flex h-full items-center justify-center p-6 bg-pink-50">
                  <span className="font-semibold text-pink-700">Dynamic Center</span>
                </div>
              ),
              defaultSize: 40,
              color: 'pink',
              closable: true,
            },
            {
              id: 'right',
              title: 'Right Panel',
              content: (
                <div className="flex h-full items-center justify-center p-6 bg-cyan-50">
                  <span className="font-semibold text-cyan-700">Dynamic Right</span>
                </div>
              ),
              defaultSize: 30,
              color: 'cyan',
              closable: true,
            },
          ]}
        />
      </div>
    </div>
  ),
};
