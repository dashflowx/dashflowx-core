import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '.';

const meta: Meta<typeof Skeleton> = {
  title: 'Element/Skeleton',
  component: Skeleton,
  parameters: { layout: 'centered' },
  argTypes: {
    color: {
      control: 'select',
      options: [
        'default',
        'muted',
        'gray',
        'slate',
        'zinc',
        'blue',
        'red',
        'green',
        'purple',
        'yellow',
        'pink',
        'gradient',
        'glass',
      ],
    },
    variant: {
      control: 'select',
      options: ['default', 'circular', 'rectangular', 'text', 'avatar'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    animation: {
      control: 'select',
      options: ['pulse', 'wave', 'none'],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: '200px',
    color: 'default',
    variant: 'default',
    size: 'md',
    animation: 'pulse',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="w-64 space-y-3">
      <Skeleton variant="default" width="200px" />
      <Skeleton variant="text" width="150px" />
      <Skeleton variant="rectangular" width="200px" height="48px" />
      <div className="flex gap-3">
        <Skeleton variant="circular" size="md" />
        <Skeleton variant="avatar" size="lg" />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="w-64 space-y-3">
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Skeleton key={size} size={size} width="200px" />
      ))}
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="w-64 space-y-3">
      {(
        [
          'default',
          'muted',
          'blue',
          'red',
          'green',
          'purple',
          'yellow',
          'pink',
          'gradient',
          'glass',
        ] as const
      ).map((color) => (
        <div key={color} className="space-y-1">
          <div className="text-xs font-medium capitalize">{color}</div>
          <Skeleton color={color} width="100%" />
        </div>
      ))}
    </div>
  ),
};

export const CardPlaceholder: Story = {
  render: () => (
    <div className="w-72 space-y-3 rounded-lg border p-4">
      <div className="flex items-center gap-3">
        <Skeleton variant="avatar" size="md" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" size="sm" width="40%" />
        </div>
      </div>
      <Skeleton variant="rectangular" height={120} />
      <Skeleton variant="text" />
      <Skeleton variant="text" width="80%" />
    </div>
  ),
};
