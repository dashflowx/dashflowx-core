import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '.';
import { Button } from '../Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Element/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
    variant: {
      control: 'select',
      options: ['default', 'muted', 'soft', 'dark', 'destructive'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    delayDuration: { control: 'number' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    tooltipTrigger: <Button variant="outline">Hover</Button>,
    tooltipContent: 'Add to library',
    side: 'top',
    variant: 'default',
    size: 'md',
  },
};

export const Soft: Story = {
  args: {
    tooltipTrigger: <Button variant="outline">Soft</Button>,
    tooltipContent: 'Soft blue tip',
    variant: 'soft',
  },
};

export const Dark: Story = {
  args: {
    tooltipTrigger: <Button variant="outline">Dark</Button>,
    tooltipContent: 'Dark tip',
    variant: 'dark',
  },
};

export const Destructive: Story = {
  args: {
    tooltipTrigger: <Button variant="outline">Delete</Button>,
    tooltipContent: 'This cannot be undone',
    variant: 'destructive',
  },
};

export const Right: Story = {
  args: {
    tooltipTrigger: <Button variant="outline">Right</Button>,
    tooltipContent: 'Add to library',
    side: 'right',
  },
};

export const AllSides: Story = {
  render: () => (
    <div className="flex gap-4 p-8">
      <Tooltip
        side="top"
        tooltipTrigger={<Button variant="outline">Top</Button>}
        tooltipContent="Top tooltip"
      />
      <Tooltip
        side="right"
        tooltipTrigger={<Button variant="outline">Right</Button>}
        tooltipContent="Right tooltip"
      />
      <Tooltip
        side="bottom"
        tooltipTrigger={<Button variant="outline">Bottom</Button>}
        tooltipContent="Bottom tooltip"
      />
      <Tooltip
        side="left"
        tooltipTrigger={<Button variant="outline">Left</Button>}
        tooltipContent="Left tooltip"
      />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    tooltipTrigger: <Button variant="outline">No tip</Button>,
    tooltipContent: 'Hidden',
    disabled: true,
  },
};
