import type { Meta, StoryObj } from '@storybook/react';
import { ScrollArea } from '.';

const meta: Meta<typeof ScrollArea> = {
  title: 'Element/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'soft', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal', 'both'],
    },
    showSeparators: { control: 'boolean' },
    title: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
    orientation: 'vertical',
    title: 'Tags',
    showSeparators: true,
  },
};

export const Soft: Story = {
  args: {
    ...Default.args,
    variant: 'soft',
  },
};

export const Bordered: Story = {
  args: {
    ...Default.args,
    variant: 'bordered',
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

export const WithoutSeparators: Story = {
  args: {
    ...Default.args,
    showSeparators: false,
  },
};

export const CustomItems: Story = {
  args: {
    ...Default.args,
    title: 'Releases',
    items: ['1.0.0', '1.1.0', '1.2.0', '2.0.0-beta'],
  },
};

export const CustomChildren: Story = {
  args: {
    variant: 'default',
    size: 'md',
    children: (
      <div className="space-y-2 p-4 text-sm">
        <p>Custom scroll content.</p>
        {Array.from({ length: 20 }).map((_, index) => (
          <p key={index}>Line {index + 1}</p>
        ))}
      </div>
    ),
  },
};
