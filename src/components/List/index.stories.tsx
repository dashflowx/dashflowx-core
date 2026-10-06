import type { Meta, StoryObj } from '@storybook/react';
import { List } from '.';

const checkIcon = (
  <svg
    className="me-2 h-3.5 w-3.5 flex-shrink-0 text-green-500 dark:text-green-400"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
  </svg>
);

const sampleItems = [
  { id: 1, content: 'Item 1' },
  { id: 2, content: 'Item 2' },
  { id: 3, content: 'Item 3' },
  { id: 4, content: 'Item 4' },
];

const meta: Meta<typeof List> = {
  title: 'Element/List',
  component: List,
  tags: ['autodocs'],
  argTypes: {
    varients: {
      control: 'select',
      options: ['ordered', 'unordered', 'iconunordered'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    spacing: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Ordered: Story = {
  args: {
    varients: 'ordered',
    size: 'md',
    spacing: 'sm',
    listArray: sampleItems,
  },
};

export const Unordered: Story = {
  args: {
    varients: 'unordered',
    size: 'md',
    spacing: 'sm',
    listArray: sampleItems,
  },
};

export const IconUnordered: Story = {
  args: {
    varients: 'iconunordered',
    size: 'md',
    spacing: 'sm',
    listArray: [
      { id: 1, content: 'Item 1', icon: checkIcon },
      { id: 2, content: 'Item 2', icon: checkIcon },
      { id: 3, content: 'Item 3', icon: checkIcon },
    ],
  },
};

export const LargeSpacing: Story = {
  args: {
    varients: 'unordered',
    size: 'lg',
    spacing: 'lg',
    listArray: sampleItems,
  },
};
