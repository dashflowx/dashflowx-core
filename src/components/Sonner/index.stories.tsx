import type { Meta, StoryObj } from '@storybook/react';
import {
  Sonner,
  ToastItem,
  toast,
  createIsolatedToastState,
  clearAllToasts,
} from '.';

const meta: Meta<typeof Sonner> = {
  title: 'Element/Sonner',
  component: Sonner,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
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
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    gap: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    position: 'top-right',
    size: 'md',
  },
  render: (args) => (
    <div className="space-y-3">
      <Sonner {...args} />
      <button
        type="button"
        className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white"
        onClick={() =>
          toast.info('Hello', { description: 'Triggered from the default story.' })
        }
      >
        Show toast
      </button>
    </div>
  ),
};

export const Types: Story = {
  render: () => (
    <div className="w-80 space-y-3">
      {(['default', 'success', 'error', 'warning', 'info'] as const).map((type) => (
        <ToastItem
          key={type}
          toast={{
            title: type,
            description: `${type} toast preview.`,
            variant: type,
            showCloseButton: true,
          }}
        />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="w-80 space-y-3">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <ToastItem
          key={size}
          size={size}
          toast={{
            title: size,
            description: `size="${size}"`,
            variant: 'info',
          }}
        />
      ))}
    </div>
  ),
};

export const WithActions: Story = {
  render: () => (
    <div className="w-80">
      <ToastItem
        toast={{
          title: 'Confirm delete',
          description: 'This cannot be undone.',
          variant: 'warning',
          action: { label: 'Delete', onClick: () => undefined },
          cancel: { label: 'Cancel', onClick: () => undefined },
          showCloseButton: true,
        }}
      />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const isolated = createIsolatedToastState();
    return (
      <div className="space-y-3">
        <Sonner position="bottom-right" isolatedState={isolated} />
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-md bg-green-600 px-3 py-1.5 text-sm text-white"
            onClick={() =>
              isolated.toast.success('Saved', { description: 'Changes stored.' })
            }
          >
            Success
          </button>
          <button
            type="button"
            className="rounded-md bg-red-600 px-3 py-1.5 text-sm text-white"
            onClick={() =>
              isolated.toast.error('Failed', {
                description: 'Try again.',
                showCloseButton: true,
              })
            }
          >
            Error
          </button>
          <button
            type="button"
            className="rounded-md bg-gray-200 px-3 py-1.5 text-sm"
            onClick={() => {
              isolated.clearAllToasts();
              clearAllToasts();
            }}
          >
            Clear
          </button>
        </div>
      </div>
    );
  },
};
