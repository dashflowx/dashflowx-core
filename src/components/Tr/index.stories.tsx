import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { Tr } from '.';
import { Td } from '../Td';
import { Th } from '../Th';

const meta: Meta<typeof Tr> = {
  title: 'Element/Tr',
  component: Tr,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'muted', 'striped', 'bordered', 'selected', 'soft'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    selected: { control: 'boolean' },
    hoverable: { control: 'boolean' },
    sticky: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function DemoTable({ children }: { children: ReactNode }) {
  return (
    <table className="w-full max-w-lg border-collapse">
      <tbody>{children}</tbody>
    </table>
  );
}

export const Basic: Story = {
  args: {
    variant: 'default',
    size: 'md',
  },
  render: (args) => (
    <DemoTable>
      <Tr {...args}>
        <Td>Ada Lovelace</Td>
        <Td>Active</Td>
        <Td>Engineer</Td>
      </Tr>
    </DemoTable>
  ),
};

export const Striped: Story = {
  render: () => (
    <DemoTable>
      <Tr variant="striped">
        <Td>Row 1</Td>
        <Td>A</Td>
      </Tr>
      <Tr variant="striped">
        <Td>Row 2</Td>
        <Td>B</Td>
      </Tr>
      <Tr variant="striped">
        <Td>Row 3</Td>
        <Td>C</Td>
      </Tr>
    </DemoTable>
  ),
};

export const Selected: Story = {
  args: {
    selected: true,
    hoverable: true,
  },
  render: (args) => (
    <DemoTable>
      <Tr {...args}>
        <Td>Selected row</Td>
        <Td>Active</Td>
      </Tr>
    </DemoTable>
  ),
};

export const HeaderSticky: Story = {
  render: () => (
    <table className="w-full max-w-lg border-collapse">
      <thead>
        <Tr sticky variant="muted">
          <Th>Name</Th>
          <Th>Status</Th>
        </Tr>
      </thead>
      <tbody>
        <Tr>
          <Td>Ada</Td>
          <Td>Active</Td>
        </Tr>
      </tbody>
    </table>
  ),
};
