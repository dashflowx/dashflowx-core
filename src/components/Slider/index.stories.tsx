import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Slider } from '.';

const meta: Meta<typeof Slider> = {
  title: 'Element/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    disabled: { control: 'boolean' },
    showLabels: { control: 'boolean' },
    showValue: { control: 'boolean' },
    showTicks: { control: 'boolean' },
    inverted: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: [50],
    variant: 'default',
    size: 'md',
    min: 0,
    max: 100,
    step: 1,
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
};

export const Primary: Story = {
  args: { ...Default.args, variant: 'primary' },
  decorators: Default.decorators,
};

export const Success: Story = {
  args: { ...Default.args, variant: 'success' },
  decorators: Default.decorators,
};

export const Warning: Story = {
  args: { ...Default.args, variant: 'warning' },
  decorators: Default.decorators,
};

export const Error: Story = {
  args: { ...Default.args, variant: 'error' },
  decorators: Default.decorators,
};

export const Small: Story = {
  args: { ...Default.args, size: 'sm', variant: 'primary' },
  decorators: Default.decorators,
};

export const Large: Story = {
  args: { ...Default.args, size: 'lg', variant: 'primary' },
  decorators: Default.decorators,
};

export const WithLabelsAndTicks: Story = {
  args: {
    defaultValue: [40],
    label: 'Volume',
    showLabels: true,
    showValue: true,
    showTicks: true,
    tickCount: 5,
    variant: 'primary',
  },
  decorators: Default.decorators,
};

export const Vertical: Story = {
  args: {
    defaultValue: [60],
    orientation: 'vertical',
    variant: 'primary',
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState([25]);
    return (
      <div className="w-72 space-y-2">
        <p className="text-sm text-gray-600">Value: {value[0]}</p>
        <Slider value={value} onValueChange={setValue} variant="primary" />
      </div>
    );
  },
};

export const Range: Story = {
  args: {
    defaultValue: [20, 80],
    variant: 'primary',
    showValue: true,
    valueLabel: 'Range',
  },
  decorators: Default.decorators,
};

export const Disabled: Story = {
  args: {
    defaultValue: [50],
    disabled: true,
    variant: 'primary',
  },
  decorators: Default.decorators,
};
