import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from '.';

const meta: Meta<typeof Separator> = {
  title: 'Element/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    color: {
      control: 'select',
      options: [
        'default',
        'primary',
        'secondary',
        'accent',
        'muted',
        'destructive',
        'success',
        'warning',
      ],
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    decorative: { control: 'boolean' },
    className: { control: 'text' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    orientation: 'horizontal',
    color: 'default',
    variant: 'solid',
    size: 'md',
  },
  render: (args) => (
    <div className="w-64 space-y-3">
      <p className="text-sm text-gray-600">Above</p>
      <Separator {...args} />
      <p className="text-sm text-gray-600">Below</p>
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    color: 'default',
    variant: 'solid',
    size: 'md',
  },
  render: (args) => (
    <div className="flex h-24 items-center gap-4">
      <span className="text-sm text-gray-600">Left</span>
      <Separator {...args} />
      <span className="text-sm text-gray-600">Right</span>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="w-64 space-y-3">
      {(
        [
          'default',
          'primary',
          'secondary',
          'accent',
          'muted',
          'destructive',
          'success',
          'warning',
        ] as const
      ).map((color) => (
        <div key={color} className="space-y-1">
          <div className="text-xs font-medium capitalize">{color}</div>
          <Separator color={color} />
        </div>
      ))}
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="w-64 space-y-3">
      {(['solid', 'dashed', 'dotted'] as const).map((variant) => (
        <div key={variant} className="space-y-1">
          <div className="text-xs font-medium capitalize">{variant}</div>
          <Separator variant={variant} color="primary" />
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="w-64 space-y-3">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} className="space-y-1">
          <div className="text-xs font-medium uppercase">{size}</div>
          <Separator size={size} color="primary" />
        </div>
      ))}
    </div>
  ),
};

export const LayoutExample: Story = {
  render: () => (
    <div className="flex h-40 w-80 flex-col rounded-lg border p-4">
      <div className="mb-2 text-sm font-medium">Header</div>
      <Separator className="mb-3" />
      <div className="flex flex-1">
        <div className="flex-1 text-sm text-gray-600">Main</div>
        <Separator orientation="vertical" className="mx-3" />
        <div className="flex-1 text-sm text-gray-600">Sidebar</div>
      </div>
      <Separator className="mt-3" />
      <div className="mt-2 text-sm font-medium">Footer</div>
    </div>
  ),
};
