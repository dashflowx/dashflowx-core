import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tabs } from '.';

const SAMPLE = [
  { id: 'market', label: 'Market', content: <p>Market overview and tickers.</p> },
  { id: 'orders', label: 'Orders', content: <p>Open and filled orders.</p> },
  { id: 'account', label: 'Account', content: <p>Profile and billing.</p> },
];

const meta: Meta<typeof Tabs> = {
  title: 'Element/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'underline', 'pills', 'boxed'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tabsArray: SAMPLE,
    defaultActive: 'market',
    variant: 'default',
    size: 'md',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-8">
      {(['default', 'underline', 'pills', 'boxed'] as const).map((variant) => (
        <div key={variant}>
          <p className="mb-2 text-sm font-semibold">{variant}</p>
          <Tabs tabsArray={SAMPLE} variant={variant} defaultActive="market" />
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size}>
          <p className="mb-2 text-sm font-semibold">{size}</p>
          <Tabs tabsArray={SAMPLE} size={size} variant="underline" defaultActive="market" />
        </div>
      ))}
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    tabsArray: SAMPLE,
    orientation: 'vertical',
    variant: 'underline',
    defaultActive: 'orders',
  },
};

export const FullWidth: Story = {
  args: {
    tabsArray: SAMPLE,
    fullWidth: true,
    variant: 'pills',
    defaultActive: 'market',
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('market');
    return (
      <div className="space-y-3">
        <p className="text-sm text-gray-500">Active: {value}</p>
        <Tabs
          tabsArray={SAMPLE}
          value={value}
          onValueChange={setValue}
          variant="boxed"
        />
      </div>
    );
  },
};

export const WithDisabled: Story = {
  args: {
    tabsArray: [
      ...SAMPLE.slice(0, 2),
      { id: 'account', label: 'Account', content: <p>Locked.</p>, disabled: true },
    ],
    variant: 'default',
    defaultActive: 'market',
  },
};
