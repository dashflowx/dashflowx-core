import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from '.';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['single', 'multiple', 'range'],
    },
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'filled', 'outlined', 'ghost', 'gradient', 'neon', 'glass'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mode: 'single',
    variant: 'default',
    size: 'md',
    showInput: true,
    placeholder: 'Select date...',
    label: 'Select Date',
    description: 'Choose a date from the calendar',
  },
};

export const Bordered: Story = {
  args: {
    mode: 'single',
    variant: 'bordered',
    size: 'md',
    showInput: true,
    label: 'Bordered Calendar',
  },
};

export const Filled: Story = {
  args: {
    mode: 'single',
    variant: 'filled',
    size: 'md',
    showInput: true,
    label: 'Filled Calendar',
  },
};

export const Outlined: Story = {
  args: {
    mode: 'single',
    variant: 'outlined',
    size: 'md',
    showInput: true,
    label: 'Outlined Calendar',
  },
};

export const Ghost: Story = {
  args: {
    mode: 'single',
    variant: 'ghost',
    size: 'md',
    showInput: true,
    label: 'Ghost Calendar',
  },
};

export const Gradient: Story = {
  args: {
    mode: 'single',
    variant: 'gradient',
    size: 'md',
    showInput: true,
    label: 'Gradient Calendar',
  },
};

export const Neon: Story = {
  args: {
    mode: 'single',
    variant: 'neon',
    size: 'md',
    showInput: true,
    label: 'Neon Calendar',
  },
};

export const Glass: Story = {
  args: {
    mode: 'single',
    variant: 'glass',
    size: 'md',
    showInput: true,
    label: 'Glass Calendar',
  },
};

export const Small: Story = {
  args: {
    mode: 'single',
    variant: 'default',
    size: 'sm',
    showInput: true,
    label: 'Small Calendar',
  },
};

export const Large: Story = {
  args: {
    mode: 'single',
    variant: 'default',
    size: 'lg',
    showInput: true,
    label: 'Large Calendar',
  },
};

export const ExtraLarge: Story = {
  args: {
    mode: 'single',
    variant: 'default',
    size: 'xl',
    showInput: true,
    label: 'Extra Large Calendar',
  },
};

export const MultipleSelection: Story = {
  args: {
    mode: 'multiple',
    variant: 'default',
    size: 'md',
    showInput: true,
    label: 'Multiple Date Selection',
    description: 'Select multiple dates',
  },
};

export const DateRange: Story = {
  args: {
    mode: 'range',
    variant: 'default',
    size: 'md',
    showInput: true,
    label: 'Date Range Selection',
    description: 'Select a date range',
  },
};

export const WithWeekNumbers: Story = {
  args: {
    mode: 'single',
    variant: 'default',
    size: 'md',
    showInput: true,
    showWeekNumbers: true,
    label: 'Calendar with Week Numbers',
  },
};

export const WithYearNavigation: Story = {
  args: {
    mode: 'single',
    variant: 'default',
    size: 'md',
    showInput: true,
    showYearNavigation: true,
    label: 'Calendar with Year Navigation',
  },
};

export const WithoutTodayButton: Story = {
  args: {
    mode: 'single',
    variant: 'default',
    size: 'md',
    showInput: true,
    showToday: false,
    label: 'Calendar without Today Button',
  },
};

export const WithHighlightedDates: Story = {
  args: {
    mode: 'single',
    variant: 'default',
    size: 'md',
    showInput: true,
    highlightDates: [
      new Date(2024, 11, 25), // Christmas
      new Date(2024, 11, 31), // New Year's Eve
      new Date(2025, 0, 1),   // New Year's Day
    ],
    label: 'Calendar with Highlighted Dates',
    description: 'Special dates are highlighted with a yellow ring',
  },
};

export const WithDisabledDates: Story = {
  args: {
    mode: 'single',
    variant: 'default',
    size: 'md',
    showInput: true,
    disabledDates: [
      new Date(2024, 11, 24), // Christmas Eve
      new Date(2024, 11, 25), // Christmas
      new Date(2024, 11, 26), // Boxing Day
    ],
    label: 'Calendar with Disabled Dates',
    description: 'Some dates are disabled and cannot be selected',
  },
};

export const NoInput: Story = {
  args: {
    mode: 'single',
    variant: 'default',
    size: 'md',
    showInput: false,
    label: 'Calendar without Input',
    description: 'This calendar doesn\'t show an input field',
  },
};

export const NoValueDisplay: Story = {
  args: {
    mode: 'single',
    variant: 'default',
    size: 'md',
    showInput: true,
    showValue: false,
    label: 'Calendar without Value Display',
    description: 'Selected date is not shown below the calendar',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 max-w-6xl">
      <Calendar variant="default" size="md" label="Default" />
      <Calendar variant="bordered" size="md" label="Bordered" />
      <Calendar variant="filled" size="md" label="Filled" />
      <Calendar variant="outlined" size="md" label="Outlined" />
      <Calendar variant="ghost" size="md" label="Ghost" />
      <Calendar variant="gradient" size="md" label="Gradient" />
      <Calendar variant="neon" size="md" label="Neon" />
      <Calendar variant="glass" size="md" label="Glass" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6 max-w-4xl">
      <Calendar variant="default" size="sm" label="Small Size" />
      <Calendar variant="default" size="md" label="Medium Size" />
      <Calendar variant="default" size="lg" label="Large Size" />
      <Calendar variant="default" size="xl" label="Extra Large Size" />
    </div>
  ),
};

export const AllModes: Story = {
  render: () => (
    <div className="space-y-6 max-w-4xl">
      <Calendar mode="single" variant="default" size="md" label="Single Selection" />
      <Calendar mode="multiple" variant="default" size="md" label="Multiple Selection" />
      <Calendar mode="range" variant="default" size="md" label="Range Selection" />
    </div>
  ),
};
