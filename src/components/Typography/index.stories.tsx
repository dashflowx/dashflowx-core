import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from '.';

const meta: Meta<typeof Typography> = {
  title: 'Element/Typography',
  component: Typography,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['one', 'two', 'three', 'four', 'five', 'six', 'para'],
    },
    size: {
      control: 'select',
      options: ['sm', 'base', 'lg', 'xl', '2xl', '3xl'],
    },
    weight: {
      control: 'select',
      options: ['thin', 'normal', 'medium', 'semibold', 'bold', 'black'],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
    tone: {
      control: 'select',
      options: ['default', 'muted', 'primary', 'success', 'warning', 'error'],
    },
    emphasis: {
      control: 'select',
      options: [null, 'low', 'high'],
    },
    italic: { control: 'boolean' },
    underline: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading1: Story = {
  args: {
    variant: 'one',
    children: 'Heading one',
  },
};

export const Heading2: Story = {
  args: {
    variant: 'two',
    children: 'Heading two',
  },
};

export const Paragraph: Story = {
  args: {
    variant: 'para',
    children: 'Body paragraph with default size and weight.',
  },
};

export const Muted: Story = {
  args: {
    variant: 'para',
    tone: 'muted',
    children: 'Muted supporting copy.',
  },
};

export const Emphasized: Story = {
  args: {
    variant: 'para',
    emphasis: 'high',
    children: 'High emphasis line.',
  },
};

export const ItalicUnderline: Story = {
  args: {
    variant: 'para',
    italic: true,
    underline: true,
    children: 'Italic and underlined.',
  },
};
