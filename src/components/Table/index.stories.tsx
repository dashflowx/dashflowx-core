import type { Meta, StoryObj } from '@storybook/react';
import { Table } from '.';

const sample = (
  <>
    <thead>
      <tr>
        <th>Name</th>
        <th>Status</th>
        <th>Role</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Ada Lovelace</td>
        <td>Active</td>
        <td>Engineer</td>
      </tr>
      <tr>
        <td>Grace Hopper</td>
        <td>Active</td>
        <td>Admiral</td>
      </tr>
      <tr>
        <td>Alan Turing</td>
        <td>Away</td>
        <td>Researcher</td>
      </tr>
    </tbody>
  </>
);

const meta: Meta<typeof Table> = {
  title: 'Element/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'striped', 'bordered', 'muted'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
  },
  render: (args) => <Table {...args}>{sample}</Table>,
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-8">
      {(['default', 'striped', 'bordered', 'muted'] as const).map((variant) => (
        <div key={variant}>
          <p className="mb-2 text-sm font-semibold">{variant}</p>
          <Table variant={variant}>{sample}</Table>
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
          <Table size={size} variant="striped">
            {sample}
          </Table>
        </div>
      ))}
    </div>
  ),
};

export const WithCaption: Story = {
  render: () => (
    <Table variant="bordered" caption="Team roster">
      {sample}
    </Table>
  ),
};

export const StickyHeader: Story = {
  render: () => (
    <div className="h-40">
      <Table variant="striped" stickyHeader>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 12 }).map((_, index) => (
            <tr key={index}>
              <td>Person {index + 1}</td>
              <td>Ready</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  ),
};
