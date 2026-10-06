import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { Th } from '.';

function DemoTable({ children }: { children: ReactNode }) {
  return (
    <table className="w-full border-collapse text-left">
      <thead>
        <tr className="border-b border-gray-200 dark:border-gray-700">{children}</tr>
      </thead>
    </table>
  );
}

const meta: Meta<typeof Th> = {
  title: 'Element/Th',
  component: Th,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'muted', 'bordered', 'soft'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
    align: 'left',
    children: 'Name',
  },
  render: (args) => (
    <DemoTable>
      <Th {...args} />
      <Th>Status</Th>
      <Th>Role</Th>
    </DemoTable>
  ),
};

export const Variants: Story = {
  render: () => (
    <DemoTable>
      {(['default', 'muted', 'bordered', 'soft'] as const).map((variant) => (
        <Th key={variant} variant={variant}>
          {variant}
        </Th>
      ))}
    </DemoTable>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <DemoTable key={size}>
          <Th size={size}>{size}</Th>
          <Th size={size}>Status</Th>
        </DemoTable>
      ))}
    </div>
  ),
};

export const Align: Story = {
  render: () => (
    <DemoTable>
      <Th align="left">Left</Th>
      <Th align="center">Center</Th>
      <Th align="right">Right</Th>
    </DemoTable>
  ),
};

export const Features: Story = {
  render: () => (
    <div className="h-24 overflow-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <Th sticky truncate className="w-32">
              A very long header that should ellipsize
            </Th>
            <Th sticky mono>
              col_id
            </Th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }).map((_, index) => (
            <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-3 py-2 text-sm">Row {index + 1}</td>
              <td className="px-3 py-2 font-mono text-sm">r_{index}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};
