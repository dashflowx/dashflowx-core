import type { Meta, StoryObj } from '@storybook/react';
import { Ul } from '.';

const meta: Meta<typeof Ul> = {
  title: 'Element/Ul',
  component: Ul,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'circle', 'square', 'inside', 'muted'],
    },
    spacing: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    indent: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const items = (
  <>
    <li>First</li>
    <li>Second</li>
    <li>Third</li>
  </>
);

export const Default: Story = {
  args: {
    variant: 'default',
    spacing: 'none',
    indent: 'md',
    size: 'md',
    children: items,
  },
};

export const Circle: Story = {
  args: {
    variant: 'circle',
    children: items,
  },
};

export const Square: Story = {
  args: {
    variant: 'square',
    children: items,
  },
};

export const Inside: Story = {
  args: {
    variant: 'inside',
    children: items,
  },
};

export const Muted: Story = {
  args: {
    variant: 'muted',
    children: items,
  },
};
