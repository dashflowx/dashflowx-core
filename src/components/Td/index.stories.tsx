import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { Td } from '.';

function DemoTable({ children }: { children: ReactNode }) {
  return (
    <table className="w-full border-collapse text-left">
      <tbody>
        <tr className="border-b border-gray-200 dark:border-gray-700">{children}</tr>
      </tbody>
    </table>
  );
}

const meta: Meta<typeof Td> = {
  title: 'Element/Td',
  component: Td,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'muted', 'bordered', 'numeric'],
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
    children: 'Ada Lovelace',
  },
  render: (args) => (
    <DemoTable>
      <Td {...args} />
      <Td>Active</Td>
      <Td>Engineer</Td>
    </DemoTable>
  ),
};

export const Variants: Story = {
  render: () => (
    <DemoTable>
      {(['default', 'muted', 'bordered', 'numeric'] as const).map((variant) => (
        <Td key={variant} variant={variant}>
          {variant === 'numeric' ? '1,280.50' : variant}
        </Td>
      ))}
    </DemoTable>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <DemoTable key={size}>
          <Td size={size}>{size}</Td>
          <Td size={size}>Active</Td>
        </DemoTable>
      ))}
    </div>
  ),
};

export const Align: Story = {
  render: () => (
    <DemoTable>
      <Td align="left">Left</Td>
      <Td align="center">Center</Td>
      <Td align="right">Right</Td>
    </DemoTable>
  ),
};

export const Features: Story = {
  render: () => (
    <DemoTable>
      <Td truncate className="w-32">
        A very long cell value that should ellipsize
      </Td>
      <Td mono>usr_9f3a2c</Td>
      <Td variant="numeric" align="right" mono>
        42,000
      </Td>
    </DemoTable>
  ),
};
