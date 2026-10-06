import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from '.';

const meta: Meta<typeof TextArea> = {
  title: 'Element/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outline', 'ghost', 'underline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'both', 'horizontal'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    lable: 'Notes',
    placeholder: 'Write a note',
    variant: 'default',
    size: 'md',
    rows: 3,
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      {(['default', 'filled', 'outline', 'ghost', 'underline'] as const).map((variant) => (
        <TextArea
          key={variant}
          variant={variant}
          lable={variant}
          placeholder="Write a note"
          rows={2}
        />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <TextArea key={size} size={size} lable={size} placeholder="Write a note" />
      ))}
    </div>
  ),
};

export const Resize: Story = {
  render: () => (
    <div className="space-y-4">
      {(['none', 'vertical', 'both', 'horizontal'] as const).map((resize) => (
        <TextArea
          key={resize}
          resize={resize}
          lable={resize}
          placeholder="Drag the corner"
          rows={2}
        />
      ))}
    </div>
  ),
};

export const Error: Story = {
  args: {
    lable: 'Notes',
    placeholder: 'Write a note',
    errorMsg: 'Oh, snapp! Some error message.',
  },
};

export const Success: Story = {
  args: {
    lable: 'Notes',
    placeholder: 'Write a note',
    sucessMsg: 'Well done! Some success message.',
    required: true,
  },
};

export const FormMode: Story = {
  args: {
    formMode: true,
    placeholder: 'Bare textarea for FormControl',
    rows: 4,
  },
};

export const FullWidth: Story = {
  args: {
    lable: 'Message',
    placeholder: 'Write a message',
    fullwidth: true,
  },
};
