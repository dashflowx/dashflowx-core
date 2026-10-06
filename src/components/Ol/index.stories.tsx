import type { Meta, StoryObj } from '@storybook/react';
import { Ol } from '.';

const meta: Meta<typeof Ol> = {
  title: 'Element/Ol',
  component: Ol,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'roman', 'alpha', 'inside', 'muted'],
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
    spacing: 'md',
    indent: 'md',
    size: 'md',
    children: items,
  },
};

export const Roman: Story = {
  args: {
    variant: 'roman',
    children: items,
  },
};

export const Alpha: Story = {
  args: {
    variant: 'alpha',
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
