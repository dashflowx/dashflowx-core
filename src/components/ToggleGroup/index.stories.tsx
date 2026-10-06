import type { Meta, StoryObj } from '@storybook/react';
import { ToggleGroup } from '.';

const meta: Meta<typeof ToggleGroup> = {
  title: 'Element/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
    },
    variant: {
      control: 'select',
      options: ['default', 'outline', 'primary', 'ghost'],
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
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Multiple: Story = {
  args: {
    type: 'multiple',
    variant: 'default',
    size: 'md',
    orientation: 'horizontal',
    defaultValue: ['bold'],
  },
};

export const Single: Story = {
  args: {
    type: 'single',
    variant: 'outline',
    size: 'md',
    defaultValue: 'italic',
  },
};

export const Primary: Story = {
  args: {
    type: 'multiple',
    variant: 'primary',
    defaultValue: ['italic'],
  },
};

export const Ghost: Story = {
  args: {
    type: 'multiple',
    variant: 'ghost',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    variant: 'outline',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    variant: 'outline',
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    variant: 'outline',
    type: 'single',
    defaultValue: 'bold',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: ['bold'],
  },
};

export const CustomItems: Story = {
  args: {
    type: 'single',
    variant: 'primary',
    items: [
      { value: 'left', label: 'Left' },
      { value: 'center', label: 'Center' },
      { value: 'right', label: 'Right' },
    ],
    defaultValue: 'center',
  },
};
