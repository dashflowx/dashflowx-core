import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from '.';

const meta: Meta<typeof Toggle> = {
  title: 'Element/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
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
    disabled: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: 'Airplane Mode',
    variant: 'primary',
    size: 'md',
    labelSide: 'right',
  },
};

export const Checked: Story = {
  args: {
    label: 'Enabled',
    variant: 'primary',
    defaultChecked: true,
  },
};

export const Success: Story = {
  args: {
    label: 'Success',
    variant: 'success',
    defaultChecked: true,
  },
};

export const Warning: Story = {
  args: {
    label: 'Warning',
    variant: 'warning',
    defaultChecked: true,
  },
};

export const Error: Story = {
  args: {
    label: 'Error',
    variant: 'error',
    defaultChecked: true,
  },
};

export const Small: Story = {
  args: {
    label: 'Small',
    size: 'sm',
    variant: 'primary',
    defaultChecked: true,
  },
};

export const Large: Story = {
  args: {
    label: 'Large',
    size: 'lg',
    variant: 'primary',
    defaultChecked: true,
  },
};

export const LabelLeft: Story = {
  args: {
    label: 'Label left',
    labelSide: 'left',
    variant: 'primary',
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    variant: 'primary',
    disabled: true,
    defaultChecked: true,
  },
};
