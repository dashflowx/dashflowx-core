import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from '.';

const meta: Meta<typeof Popover> = {
  title: 'Element/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    popoverTrigger: { control: false },
    popoverContent: { control: false },
    variant: {
      control: 'select',
      options: ['default', 'muted', 'bordered', 'soft', 'dark'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
    side: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    openOn: {
      control: 'select',
      options: ['hover', 'click'],
    },
    sideOffset: { control: 'number' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const trigger = (
  <button type="button" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
    Open popover
  </button>
);

const content = (
  <div className="space-y-2">
    <p className="font-semibold">Popover title</p>
    <p>Standalone HTML/CSS popover. Use hover or click to reveal content.</p>
  </div>
);

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
    align: 'center',
    side: 'bottom',
    openOn: 'hover',
    sideOffset: 4,
    popoverTrigger: trigger,
    popoverContent: content,
  },
};

export const Muted: Story = {
  args: {
    ...Default.args,
    variant: 'muted',
  },
};

export const Soft: Story = {
  args: {
    ...Default.args,
    variant: 'soft',
  },
};

export const Dark: Story = {
  args: {
    ...Default.args,
    variant: 'dark',
  },
};

export const ClickToOpen: Story = {
  args: {
    ...Default.args,
    openOn: 'click',
    defaultOpen: true,
  },
};

export const SideTop: Story = {
  args: {
    ...Default.args,
    side: 'top',
    defaultOpen: true,
    openOn: 'click',
  },
};

export const AlignStart: Story = {
  args: {
    ...Default.args,
    align: 'start',
    defaultOpen: true,
    openOn: 'click',
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

export const WithForm: Story = {
  args: {
    openOn: 'click',
    defaultOpen: true,
    variant: 'bordered',
    popoverTrigger: (
      <button type="button" className="rounded bg-orange-500 px-4 py-2 text-white">
        Form popover
      </button>
    ),
    popoverContent: (
      <div className="space-y-3">
        <h3 className="font-semibold">Contact</h3>
        <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Name"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          />
          <button
            type="submit"
            className="w-full rounded bg-blue-500 px-3 py-2 text-sm text-white"
          >
            Submit
          </button>
        </form>
      </div>
    ),
  },
};
