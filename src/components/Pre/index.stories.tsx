import type { Meta, StoryObj } from '@storybook/react';
import { Pre } from '.';

const SAMPLE = `import { Button } from '@dashflowx/core';

export function Example() {
  return <Button variant="primary">Click me</Button>;
}`;

const meta: Meta<typeof Pre> = {
  title: 'Element/Pre',
  component: Pre,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'muted', 'soft', 'bordered', 'terminal'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    __style__: {
      control: 'select',
      options: ['default', 'new-york'],
    },
    showCopy: { control: 'boolean' },
    __withMeta__: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
    __style__: 'default',
    __rawString__: SAMPLE,
    children: SAMPLE,
  },
};

export const Muted: Story = {
  args: {
    variant: 'muted',
    __rawString__: SAMPLE,
    children: SAMPLE,
  },
};

export const Soft: Story = {
  args: {
    variant: 'soft',
    __rawString__: SAMPLE,
    children: SAMPLE,
  },
};

export const Terminal: Story = {
  args: {
    variant: 'terminal',
    __rawString__: 'npm install @dashflowx/core',
    children: 'npm install @dashflowx/core',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    __rawString__: SAMPLE,
    children: SAMPLE,
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    __rawString__: SAMPLE,
    children: SAMPLE,
  },
};

export const NewYork: Story = {
  args: {
    __style__: 'new-york',
    __rawString__: SAMPLE,
    children: SAMPLE,
  },
};

export const WithNpmCommands: Story = {
  args: {
    variant: 'default',
    children: 'npm install @dashflowx/core',
    __npmCommand__: 'npm install @dashflowx/core',
    __yarnCommand__: 'yarn add @dashflowx/core',
    __pnpmCommand__: 'pnpm add @dashflowx/core',
    __bunCommand__: 'bun add @dashflowx/core',
  },
};

export const WithoutCopy: Story = {
  args: {
    showCopy: false,
    __rawString__: SAMPLE,
    children: SAMPLE,
  },
};
