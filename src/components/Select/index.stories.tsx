import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select } from '.';

const ITEMS = [
  { id: '1', itemElement: 'Dashboard' },
  { id: '2', itemElement: 'Settings' },
  { id: '3', itemElement: 'Earnings' },
];

const meta: Meta<typeof Select> = {
  title: 'Element/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: ITEMS,
    defaultSelected: '1',
    label: 'Select an option',
    variant: 'default',
    size: 'md',
  },
};

export const Filled: Story = {
  args: {
    ...Default.args,
    variant: 'filled',
  },
};

export const Outline: Story = {
  args: {
    ...Default.args,
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    ...Default.args,
    variant: 'ghost',
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'lg',
  },
};

export const WithPlaceholder: Story = {
  args: {
    items: ITEMS,
    label: 'Destination',
    placeholder: 'Choose a page',
    defaultSelected: '',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = useState('2');
    return (
      <div className="space-y-2">
        <p className="text-sm text-gray-600">Selected id: {selected}</p>
        <Select
          items={ITEMS}
          selected={selected}
          onSelectedChange={setSelected}
          label="Controlled select"
        />
      </div>
    );
  },
};
