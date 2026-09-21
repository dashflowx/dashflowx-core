import type { Meta, StoryObj } from '@storybook/react';
import { HoverCard } from '.';

const meta: Meta<typeof HoverCard> = {
  title: 'Element/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    hoverCardTrigger: 'Hover Card Trigger',
    hoverCardContent: 'Hover Card Content',
  },
};
