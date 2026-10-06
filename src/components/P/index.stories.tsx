import type { Meta, StoryObj } from '@storybook/react';
import { P } from '.';

const meta: Meta<typeof P> = {
  title: 'Element/P',
  component: P,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'muted', 'lead', 'subtle', 'flush'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const sample =
  'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.';

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
    weight: 'normal',
    align: 'left',
    children: sample,
  },
};

export const Muted: Story = {
  args: {
    variant: 'muted',
    children: sample,
  },
};

export const Lead: Story = {
  args: {
    variant: 'lead',
    children: sample,
  },
};

export const Subtle: Story = {
  args: {
    variant: 'subtle',
    children: sample,
  },
};

export const Flush: Story = {
  args: {
    variant: 'flush',
    children: sample,
  },
};

export const Center: Story = {
  args: {
    align: 'center',
    children: sample,
  },
};
