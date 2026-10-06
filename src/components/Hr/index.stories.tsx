import type { Meta, StoryObj } from '@storybook/react';
import { Hr } from '.';

const meta: Meta<typeof Hr> = {
  title: 'Element/Hr',
  component: Hr,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'muted', 'strong', 'dashed', 'dotted'],
    },
    spacing: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'responsive'],
    },
    thickness: {
      control: 'select',
      options: ['thin', 'medium', 'thick'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    spacing: 'responsive',
    thickness: 'thin',
  },
};

export const Muted: Story = {
  args: {
    variant: 'muted',
  },
};

export const Strong: Story = {
  args: {
    variant: 'strong',
  },
};

export const Dashed: Story = {
  args: {
    variant: 'dashed',
  },
};

export const Dotted: Story = {
  args: {
    variant: 'dotted',
  },
};

export const Spacing: Story = {
  args: {
    spacing: 'lg',
    variant: 'muted',
  },
};

export const Thick: Story = {
  args: {
    thickness: 'thick',
    variant: 'strong',
  },
};
