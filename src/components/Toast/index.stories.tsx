import type { Meta, StoryObj } from '@storybook/react';
import { Toast, ToastProviderWrapper } from '.';

const meta: Meta<typeof Toast> = {
  title: 'Element/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ToastProviderWrapper>
        <Story />
      </ToastProviderWrapper>
    ),
  ],
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
    duration: { control: 'number' },
    autoDismiss: { control: 'boolean' },
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
    title: 'Basic Toast',
    description: 'This is a basic toast message.',
    variant: 'default',
    size: 'md',
    children: 'Show Basic Toast',
  },
};

export const Success: Story = {
  args: {
    title: 'Success!',
    description: 'Your action was completed successfully.',
    variant: 'success',
    size: 'md',
    children: 'Show Success Toast',
  },
};

export const Destructive: Story = {
  args: {
    title: 'Error!',
    description: 'Something went wrong. Please try again.',
    variant: 'destructive',
    size: 'md',
    children: 'Show Error Toast',
  },
};

export const Warning: Story = {
  args: {
    title: 'Warning!',
    description: 'Please check your input before proceeding.',
    variant: 'warning',
    size: 'md',
    children: 'Show Warning Toast',
  },
};

export const Info: Story = {
  args: {
    title: 'Information',
    description: 'Here is some useful information for you.',
    variant: 'info',
    size: 'md',
    children: 'Show Info Toast',
  },
};

export const WithAction: Story = {
  args: {
    title: 'Scheduled: Catch up',
    description: 'Friday, February 10, 2023 at 5:57 PM',
    variant: 'default',
    size: 'md',
    action: {
      label: 'Undo',
      onClick: () => undefined,
      variant: 'default',
    },
    children: 'Show Action Toast',
  },
};

export const SmallSize: Story = {
  args: {
    title: 'Small Toast',
    description: 'This is a small toast.',
    variant: 'default',
    size: 'sm',
    children: 'Show Small Toast',
  },
};

export const LargeSize: Story = {
  args: {
    title: 'Large Toast',
    description: 'This is a large toast with more content and padding.',
    variant: 'default',
    size: 'lg',
    children: 'Show Large Toast',
  },
};

export const LongDuration: Story = {
  args: {
    title: 'Long Duration',
    description: 'This toast will stay for 10 seconds.',
    variant: 'info',
    size: 'md',
    duration: 10000,
    children: 'Show Long Duration Toast',
  },
};

export const NoAutoDismiss: Story = {
  args: {
    title: 'Persistent Toast',
    description: 'This toast will not auto-dismiss.',
    variant: 'warning',
    size: 'md',
    autoDismiss: false,
    children: 'Show Persistent Toast',
  },
};

export const PurpleBackground: Story = {
  args: {
    title: 'Purple Toast',
    description: 'This toast has a purple background.',
    variant: 'default',
    size: 'md',
    bgColor: 'purple',
    bgIntensity: '50',
    children: 'Show Purple Toast',
  },
};

export const TealBackground: Story = {
  args: {
    title: 'Teal Toast',
    description: 'This toast has a teal background.',
    variant: 'default',
    size: 'md',
    bgColor: 'teal',
    bgIntensity: '100',
    children: 'Show Teal Toast',
  },
};
