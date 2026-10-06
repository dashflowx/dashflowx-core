import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '.';

const meta: Meta<typeof Label> = {
  title: 'Element/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'muted', 'destructive', 'success'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
    },
    required: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Email',
    htmlFor: 'email',
    variant: 'default',
    size: 'md',
    weight: 'medium',
  },
};

export const Muted: Story = {
  args: {
    children: 'Optional',
    htmlFor: 'optional',
    variant: 'muted',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Invalid field',
    htmlFor: 'invalid',
    variant: 'destructive',
  },
};

export const Success: Story = {
  args: {
    children: 'Verified',
    htmlFor: 'verified',
    variant: 'success',
  },
};

export const Required: Story = {
  args: {
    children: 'Email',
    htmlFor: 'email-required',
    required: true,
  },
};

export const Large: Story = {
  args: {
    children: 'Section title',
    htmlFor: 'section',
    size: 'lg',
    weight: 'semibold',
  },
};
