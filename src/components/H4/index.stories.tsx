import type { Meta, StoryObj } from '@storybook/react';
import { H4 } from '.';

const meta: Meta<typeof H4> = {
  title: 'Element/H4',
  component: H4,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'display', 'muted', 'gradient', 'bordered'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
    },
    weight: {
      control: 'select',
      options: ['thin', 'normal', 'medium', 'semibold', 'bold', 'black'],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
    italic: { control: 'boolean' },
    underline: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'lg',
    weight: 'semibold',
    align: 'left',
    children: 'Nested title',
  },
};

export const Display: Story = {
  args: {
    variant: 'display',
    children: 'Display heading',
  },
};

export const Muted: Story = {
  args: {
    variant: 'muted',
    children: 'Muted heading',
  },
};

export const Gradient: Story = {
  args: {
    variant: 'gradient',
    children: 'Gradient heading',
  },
};

export const Bordered: Story = {
  args: {
    variant: 'bordered',
    children: 'Bordered heading',
  },
};

export const Sizes: Story = {
  args: {
    size: 'xl',
    children: 'Sized heading',
  },
};

export const Align: Story = {
  args: {
    align: 'center',
    children: 'Centered heading',
  },
};
