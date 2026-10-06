import type { Meta, StoryObj } from '@storybook/react';
import { H2 } from '.';

const meta: Meta<typeof H2> = {
  title: 'Element/H2',
  component: H2,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'display', 'muted', 'gradient', 'plain'],
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
    size: '2xl',
    weight: 'semibold',
    align: 'left',
    children: 'Section title',
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

export const Plain: Story = {
  args: {
    variant: 'plain',
    children: 'Plain heading',
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
