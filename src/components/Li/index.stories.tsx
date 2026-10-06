import type { Meta, StoryObj } from '@storybook/react';
import { Li } from '.';

const meta: Meta<typeof Li> = {
  title: 'Element/Li',
  component: Li,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'muted', 'strong', 'check', 'bordered'],
    },
    spacing: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  decorators: [
    (Story) => (
      <ul className="list-disc pl-6">
        <Story />
      </ul>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    spacing: 'sm',
    size: 'md',
    children: 'List item',
  },
};

export const Muted: Story = {
  args: {
    variant: 'muted',
    children: 'Muted item',
  },
};

export const Strong: Story = {
  args: {
    variant: 'strong',
    children: 'Strong item',
  },
};

export const Check: Story = {
  args: {
    variant: 'check',
    children: 'Checked item',
  },
};

export const Bordered: Story = {
  args: {
    variant: 'bordered',
    children: 'Bordered item',
  },
};

export const Spacing: Story = {
  args: {
    spacing: 'lg',
    children: 'Spaced item',
  },
};
