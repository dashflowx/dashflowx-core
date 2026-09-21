import type { Meta, StoryObj } from '@storybook/react';
import { Collapsible } from '.';

const meta: Meta<typeof Collapsible> = {
  title: 'Element/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    isOpen: false,
    onOpenChange: () => {},
    title: 'Collapsible',
    collapsibleContent: <p>Collapsible content</p>,
  },
};
