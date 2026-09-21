import type { Meta, StoryObj } from '@storybook/react';
import { InputOTP } from '.';

const meta: Meta<typeof InputOTP> = {
  title: 'Element/InputOTP',
  component: InputOTP,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
