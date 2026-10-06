import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { RadioGroup } from '.';

const ITEMS = [
  { id: 'comfortable', title: 'Comfortable', value: 'comfortable' },
  { id: 'business', title: 'Business', value: 'business' },
  { id: 'premium', title: 'Premium', value: 'premium' },
];

const meta: Meta<typeof RadioGroup> = {
  title: 'Element/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'muted', 'card', 'button'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: ITEMS,
    defaultValue: 'comfortable',
    variant: 'default',
    size: 'md',
    orientation: 'vertical',
  },
};

export const Muted: Story = {
  args: {
    ...Default.args,
    variant: 'muted',
  },
};

export const Card: Story = {
  args: {
    ...Default.args,
    variant: 'card',
    items: [
      {
        id: 'comfortable',
        title: 'Comfortable',
        value: 'comfortable',
        description: 'Balanced spacing for most layouts.',
      },
      {
        id: 'business',
        title: 'Business',
        value: 'business',
        description: 'Denser for dashboards.',
      },
      {
        id: 'premium',
        title: 'Premium',
        value: 'premium',
        description: 'Extra room and emphasis.',
      },
    ],
  },
};

export const Button: Story = {
  args: {
    ...Default.args,
    variant: 'button',
    orientation: 'horizontal',
  },
};

export const Horizontal: Story = {
  args: {
    ...Default.args,
    orientation: 'horizontal',
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

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('business');
    return (
      <div className="space-y-3">
        <p className="text-sm text-gray-600">Selected: {value}</p>
        <RadioGroup items={ITEMS} value={value} onValueChange={setValue} />
      </div>
    );
  },
};
