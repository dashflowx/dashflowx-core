import type { Meta, StoryObj } from '@storybook/react';
import { Sheet, DynamicSheet, InfoSheet, ConfirmationSheet, SettingsSheet } from '.';
import { Button } from '../Button';

const meta: Meta<typeof Sheet> = {
  title: 'Element/Sheet',
  component: Sheet,
  parameters: { layout: 'centered' },
  argTypes: {
    type: {
      control: 'select',
      options: ['default', 'info', 'confirmation', 'settings'],
    },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    background: {
      control: 'select',
      options: [
        'default',
        'white',
        'muted',
        'glass',
        'gradient',
        'blue',
        'yellow',
        'gray',
        'red',
        'green',
        'purple',
      ],
    },
    triggerVariant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'destructive'],
    },
    showCloseButton: { control: 'boolean' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    triggerText: 'Open Sheet',
    type: 'default',
    side: 'right',
    size: 'md',
    title: 'Sheet',
    description: 'Slide-over panel from the edge.',
  },
};

export const Info: Story = {
  args: {
    type: 'info',
    triggerText: 'Open info',
  },
};

export const Confirmation: Story = {
  args: {
    type: 'confirmation',
    triggerText: 'Confirm',
  },
};

export const Settings: Story = {
  args: {
    type: 'settings',
    triggerText: 'Settings',
  },
};

export const Sides: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <Sheet key={side} side={side} triggerText={side} title={side} size="sm" />
      ))}
    </div>
  ),
};

export const Backgrounds: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(['blue', 'yellow', 'gray', 'red', 'green', 'purple', 'glass', 'gradient'] as const).map(
        (background) => (
          <Sheet
            key={background}
            background={background}
            triggerText={background}
            title={background}
            size="sm"
          />
        )
      )}
    </div>
  ),
};

export const WithChildren: Story = {
  args: {
    triggerText: 'Custom body',
    title: 'Custom content',
    description: 'Pass children for the body.',
  },
  render: (args) => (
    <Sheet {...args}>
      <p className="text-sm text-gray-600">Form fields or custom markup go here.</p>
    </Sheet>
  ),
};

export const CustomTrigger: Story = {
  render: () => (
    <Sheet
      title="Custom trigger"
      trigger={<Button variant="primary">Launch sheet</Button>}
    >
      <p className="text-sm">Opened via a custom trigger node.</p>
    </Sheet>
  ),
};

export const PresetInfoSheet: Story = {
  render: () => <InfoSheet />,
};

export const PresetConfirmationSheet: Story = {
  render: () => <ConfirmationSheet />,
};

export const PresetSettingsSheet: Story = {
  render: () => <SettingsSheet />,
};

export const DynamicConfig: Story = {
  render: () => (
    <DynamicSheet
      config={{
        id: 'demo',
        title: 'Dynamic config',
        description: 'Built from SheetConfig.',
        side: 'left',
        size: 'md',
        background: 'purple',
        content: <p className="text-sm">Config-driven content.</p>,
        actions: [{ id: 'done', label: 'Done', variant: 'primary', closeOnClick: true }],
      }}
    />
  ),
};
