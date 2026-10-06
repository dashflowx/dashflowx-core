import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '.';

const meta: Meta<typeof Input> = {
  title: 'Element/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outline', 'ghost', 'underline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
    },
    fullwidth: { control: 'boolean' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    formMode: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    lable: 'Your Email',
    type: 'email',
    name: 'email',
    id: 'email',
    placeholder: 'name@company.com',
    variant: 'default',
    size: 'md',
  },
};

export const Filled: Story = {
  args: {
    ...Default.args,
    variant: 'filled',
    id: 'email-filled',
  },
};

export const Outline: Story = {
  args: {
    ...Default.args,
    variant: 'outline',
    id: 'email-outline',
  },
};

export const Ghost: Story = {
  args: {
    ...Default.args,
    variant: 'ghost',
    id: 'email-ghost',
  },
};

export const Underline: Story = {
  args: {
    ...Default.args,
    variant: 'underline',
    id: 'email-underline',
  },
};

export const Sizes: Story = {
  args: {
    ...Default.args,
    size: 'lg',
    id: 'email-lg',
  },
};

export const Fullwidth: Story = {
  args: {
    ...Default.args,
    fullwidth: true,
    required: true,
    id: 'email-full',
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    errorMsg: 'Please enter a valid email',
    id: 'email-error',
  },
};

export const WithSuccess: Story = {
  args: {
    ...Default.args,
    sucessMsg: 'Looks good',
    id: 'email-success',
  },
};

export const FormMode: Story = {
  args: {
    placeholder: 'name@company.com',
    formMode: true,
    variant: 'default',
    size: 'md',
    id: 'email-form',
  },
};
