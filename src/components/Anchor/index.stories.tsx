import type { Meta, StoryObj } from '@storybook/react';
import { Anchor } from '.';

const meta: Meta<typeof Anchor> = {
  title: 'Element/Anchor',
  component: Anchor,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'muted', 'primary', 'soft', 'plain'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
    },
    underline: {
      control: 'select',
      options: ['always', 'hover', 'none'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
    weight: 'medium',
    href: '#',
    children: 'Read the docs',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    href: '#',
    children: 'Primary link',
  },
};

export const Soft: Story = {
  args: {
    variant: 'soft',
    href: '#',
    children: 'Hover to underline',
  },
};

export const Plain: Story = {
  args: {
    variant: 'plain',
    href: '#',
    children: 'Plain link',
  },
};

export const Muted: Story = {
  args: {
    variant: 'muted',
    href: '#',
    children: 'Muted link',
  },
};
