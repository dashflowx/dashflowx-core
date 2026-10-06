import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from '.';

const cells = (count = 6) =>
  Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className="rounded-md bg-slate-100 p-4 text-center text-sm dark:bg-slate-800"
    >
      {i + 1}
    </div>
  ));

const unevenCells = () =>
  ['Short', 'A taller cell with more copy so alignment is visible.', 'Mid'].map(
    (label) => (
      <div
        key={label}
        className="rounded-md bg-slate-100 p-4 text-sm dark:bg-slate-800"
      >
        {label}
      </div>
    )
  );

const meta: Meta<typeof Grid> = {
  title: 'Element/Grid',
  component: Grid,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'auto-fit', 'auto-fill', 'dense'],
    },
    columns: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 12],
    },
    mdColumns: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 12],
    },
    lgColumns: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 12],
    },
    gap: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    columns: 2,
    mdColumns: 3,
    gap: 'md',
    align: 'stretch',
    children: cells(),
  },
};

export const Columns: Story = {
  args: {
    columns: 4,
    mdColumns: 4,
    children: cells(8),
  },
};

export const AutoFit: Story = {
  args: {
    variant: 'auto-fit',
    children: cells(8),
  },
};

export const AutoFill: Story = {
  args: {
    variant: 'auto-fill',
    children: cells(5),
  },
};

export const Dense: Story = {
  args: {
    variant: 'dense',
    columns: 3,
    mdColumns: 3,
    children: cells(7),
  },
};

export const Gap: Story = {
  args: {
    gap: 'xl',
    children: cells(),
  },
};

export const Align: Story = {
  args: {
    columns: 3,
    mdColumns: 3,
    align: 'center',
    children: unevenCells(),
  },
};
