import type { Meta, StoryObj } from '@storybook/react';
import { Toaster } from '.';

const meta: Meta<typeof Toaster> = {
  title: 'Element/Toaster',
  component: Toaster,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'success', 'warning', 'info'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    position: {
      control: 'select',
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
    },
    duration: { control: 'number' },
    autoDismiss: { control: 'boolean' },
    showToaster: { control: 'boolean' },
    maxToasts: { control: 'number' },
    closeButton: { control: 'boolean' },
    bgColor: {
      control: 'select',
      options: [
        'white',
        'gray',
        'red',
        'green',
        'blue',
        'yellow',
        'purple',
        'pink',
        'indigo',
        'teal',
        'orange',
        'cyan',
        'lime',
        'emerald',
        'violet',
        'fuchsia',
        'rose',
        'sky',
        'amber',
        'stone',
        'neutral',
        'zinc',
        'slate',
      ],
    },
    bgIntensity: {
      control: 'select',
      options: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: 'Basic Toaster',
    description: 'This is a basic toaster example.',
    variant: 'default',
    size: 'md',
    position: 'bottom-right',
    children: 'Add to calendar',
  },
};

export const Success: Story = {
  args: {
    title: 'Success!',
    description: 'Your action was completed successfully.',
    variant: 'success',
    size: 'md',
    children: 'Show success',
  },
};

export const Destructive: Story = {
  args: {
    title: 'Error!',
    description: 'Something went wrong.',
    variant: 'destructive',
    size: 'md',
    children: 'Show error',
  },
};

export const TopRight: Story = {
  args: {
    title: 'Top right',
    description: 'position="top-right"',
    variant: 'info',
    position: 'top-right',
    children: 'Show top-right',
  },
};

export const WithAction: Story = {
  args: {
    title: 'Scheduled: Catch up',
    description: 'Friday, February 10, 2023 at 5:57 PM',
    variant: 'default',
    action: {
      label: 'Undo',
      onClick: () => undefined,
    },
    children: 'Show with action',
  },
};

export const NoCloseButton: Story = {
  args: {
    title: 'No close',
    description: 'closeButton={false}',
    variant: 'warning',
    closeButton: false,
    children: 'Show without close',
  },
};

export const PurpleSurface: Story = {
  args: {
    title: 'Purple',
    description: 'bgColor="purple"',
    bgColor: 'purple',
    bgIntensity: '50',
    children: 'Show purple',
  },
};
