import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Switch } from '.';

const meta: Meta<typeof Switch> = {
  title: 'Element/Switch',
  component: Switch,
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
    labelSide: {
      control: 'select',
      options: ['left', 'right'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Airplane Mode',
    defaultChecked: false,
    size: 'md',
    variant: 'default',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(['default', 'primary', 'success', 'warning', 'error'] as const).map((variant) => (
        <Switch key={variant} label={variant} variant={variant} defaultChecked />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Switch key={size} label={size} size={size} variant="primary" defaultChecked />
      ))}
    </div>
  ),
};

export const LabelSides: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Switch label="Label right" labelSide="right" defaultChecked />
      <Switch label="Label left" labelSide="left" defaultChecked />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
    defaultChecked: true,
    variant: 'primary',
  },
};

export const Controlled: Story = {
  render: () => {
    const [on, setOn] = useState(false);
    return (
      <Switch
        label={on ? 'On' : 'Off'}
        checked={on}
        onCheckedChange={setOn}
        variant="primary"
      />
    );
  },
};
