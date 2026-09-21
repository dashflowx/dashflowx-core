import type { Meta, StoryObj } from '@storybook/react';
import { ContextMenu } from '.';

const meta: Meta<typeof ContextMenu> = {
  title: 'Components/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    childern: {
      control: 'text',
      description: 'Text or element to trigger context menu',
    },
    items: {
      control: 'object',
      description: 'Array of menu items',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    children: {
      control: 'text',
      description: 'React children elements',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    childern: 'Right-click me',
    items: [
      { type: 'label', title: 'Copy Text', shortcut: '⌘C' },
      { type: 'label', title: 'Paste Text', shortcut: '⌘V' },
      { type: 'seperator' },
      { type: 'label', title: 'Delete Item', shortcut: '⌘⌫' }
    ],
  },
};

export const WithSubMenu: Story = {
  args: {
    childern: 'Right-click for submenu',
    items: [
      { type: 'label', title: 'Copy', shortcut: '⌘C' },
      { type: 'label', title: 'Paste', shortcut: '⌘V' },
      { type: 'seperator' },
      {
        type: 'subMenu',
        title: 'More Options',
        children: [
          { title: 'Cut', shortcut: '⌘X' },
          { title: 'Duplicate', shortcut: '⌘D' },
          { title: 'Rename', shortcut: 'F2' }
        ]
      },
      { type: 'seperator' },
      { type: 'label', title: 'Delete', shortcut: '⌘⌫' }
    ],
  },
};

export const WithRadioGroup: Story = {
  args: {
    childern: 'Right-click for radio options',
    items: [
      { type: 'label', title: 'View Options', shortcut: '⌘V' },
      { type: 'seperator' },
      {
        type: 'radio',
        title: 'Theme',
        value: 'dark',
        children: [
          { title: 'Light Theme', value: 'light' },
          { title: 'Dark Theme', value: 'dark' },
          { title: 'Auto Theme', value: 'auto' }
        ]
      },
      { type: 'seperator' },
      {
        type: 'radio',
        title: 'Layout',
        value: 'grid',
        children: [
          { title: 'List View', value: 'list' },
          { title: 'Grid View', value: 'grid' },
          { title: 'Card View', value: 'card' }
        ]
      }
    ],
  },
};

export const WithCheckboxes: Story = {
  args: {
    childern: 'Right-click for checkboxes',
    items: [
      { type: 'checkbox', title: 'Show Hidden Files', checked: false },
      { type: 'checkbox', title: 'Auto-save', checked: true },
      { type: 'checkbox', title: 'Notifications', checked: false },
      { type: 'seperator' },
      { type: 'label', title: 'Settings', shortcut: '⌘,' }
    ],
  },
};

export const ComplexMenu: Story = {
  args: {
    childern: 'Right-click for complex menu',
    items: [
      { type: 'label', title: 'New File', shortcut: '⌘N' },
      { type: 'label', title: 'Open File', shortcut: '⌘O' },
      { type: 'label', title: 'Save', shortcut: '⌘S' },
      { type: 'seperator' },
      {
        type: 'subMenu',
        title: 'Export',
        children: [
          { title: 'Export as PDF', shortcut: '⌘E' },
          { title: 'Export as Image', shortcut: '⌘⇧E' },
          { title: 'Export as HTML', shortcut: '⌘H' }
        ]
      },
      { type: 'seperator' },
      {
        type: 'radio',
        title: 'Zoom Level',
        value: '100',
        children: [
          { title: '50%', value: '50' },
          { title: '75%', value: '75' },
          { title: '100%', value: '100' },
          { title: '125%', value: '125' },
          { title: '150%', value: '150' }
        ]
      },
      { type: 'seperator' },
      { type: 'checkbox', title: 'Show Grid', checked: true },
      { type: 'checkbox', title: 'Show Rulers', checked: false },
      { type: 'seperator' },
      { type: 'label', title: 'Preferences', shortcut: '⌘,' }
    ],
  },
};

export const CustomTrigger: Story = {
  args: {
    items: [
      { type: 'label', title: 'Edit', shortcut: '⌘E' },
      { type: 'label', title: 'Delete', shortcut: '⌘⌫' },
      { type: 'seperator' },
      { type: 'label', title: 'Properties', shortcut: '⌘I' }
    ],
  },
  render: (args) => (
    <ContextMenu {...args}>
      <div className="p-8 bg-blue-100 rounded-lg border-2 border-dashed border-blue-300 text-center">
        <p className="text-blue-700 font-medium">Custom Trigger Element</p>
        <p className="text-blue-500 text-sm">Right-click anywhere in this area</p>
      </div>
    </ContextMenu>
  ),
};
