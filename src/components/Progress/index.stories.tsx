import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from '.';

const meta: Meta<typeof Progress> = {
  title: 'Element/Progress',
  component: Progress,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    progress: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    showLabel: { control: 'boolean' },
    animated: { control: 'boolean' },
    striped: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    progress: 66,
    variant: 'default',
    size: 'md',
    className: 'w-[400px]',
  },
};

export const WithLabel: Story = {
  args: {
    progress: 75,
    showLabel: true,
    label: 'Upload Progress',
    className: 'w-[400px]',
  },
};

export const Success: Story = {
  args: {
    progress: 100,
    variant: 'success',
    showLabel: true,
    label: 'Completed',
    className: 'w-[400px]',
  },
};

export const Warning: Story = {
  args: {
    progress: 60,
    variant: 'warning',
    showLabel: true,
    label: 'Almost Complete',
    className: 'w-[400px]',
  },
};

export const Error: Story = {
  args: {
    progress: 25,
    variant: 'error',
    showLabel: true,
    label: 'Failed',
    className: 'w-[400px]',
  },
};

export const Info: Story = {
  args: {
    progress: 45,
    variant: 'info',
    showLabel: true,
    label: 'Processing',
    className: 'w-[400px]',
  },
};

export const Small: Story = {
  args: {
    progress: 80,
    size: 'sm',
    className: 'w-[400px]',
  },
};

export const Large: Story = {
  args: {
    progress: 90,
    size: 'lg',
    className: 'w-[400px]',
  },
};

export const Animated: Story = {
  args: {
    progress: 75,
    animated: true,
    showLabel: true,
    label: 'Loading...',
    className: 'w-[400px]',
  },
};

export const Striped: Story = {
  args: {
    progress: 60,
    striped: true,
    showLabel: true,
    label: 'Processing',
    className: 'w-[400px]',
  },
};

export const AnimatedStriped: Story = {
  args: {
    progress: 85,
    animated: true,
    striped: true,
    showLabel: true,
    label: 'Uploading...',
    className: 'w-[400px]',
  },
};

export const StringProgress: Story = {
  args: {
    progress: '75.5',
    showLabel: true,
    label: 'String Progress',
    className: 'w-[400px]',
  },
};
