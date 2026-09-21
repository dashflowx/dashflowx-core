import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from '.';

const meta: Meta<typeof DatePicker> = {
  title: 'Element/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    mode: 'single',
    date: new Date(),
    setDate: () => {},
    className: '',
  },
};
