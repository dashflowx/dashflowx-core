import type { Meta, StoryObj } from '@storybook/react';
import { DynamicMenubar, Menubar } from '.';

const meta: Meta<typeof DynamicMenubar> = {
  title: 'Element/Menubar',
  component: DynamicMenubar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    backgroundColor: {
      control: 'select',
      options: ['blue', 'green', 'red', 'yellow', 'purple', 'pink', 'indigo', 'emerald', 'teal', 'cyan', 'transparent', 'glass', 'gradient', 'white'],
    },
    backgroundIntensity: {
      control: 'select',
      options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    },
    variant: {
      control: 'select',
      options: ['default', 'compact', 'large'],
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Compact: Story = {
  args: {
    variant: 'compact',
  },
};

export const Large: Story = {
  args: {
    variant: 'large',
  },
};

export const WithBackgroundColor: Story = {
  args: {
    backgroundColor: 'blue',
    backgroundIntensity: '500',
  },
};

export const GradientBackground: Story = {
  args: {
    backgroundColor: 'gradient',
  },
};

export const GlassEffect: Story = {
  args: {
    backgroundColor: 'glass',
  },
};

export const DarkTheme: Story = {
  args: {
    theme: 'dark',
    backgroundColor: 'gray',
    backgroundIntensity: '800',
  },
};

export const CustomMenus: Story = {
  args: {
    menus: [
      {
        label: 'Dashboard',
        items: [
          { type: 'item', label: 'Overview', shortcut: '⌘O' },
          { type: 'item', label: 'Analytics', shortcut: '⌘A' },
          { type: 'separator' },
          { type: 'item', label: 'Reports', shortcut: '⌘R' },
        ],
      },
      {
        label: 'Settings',
        items: [
          { type: 'checkbox', label: 'Dark Mode', checked: true },
          { type: 'checkbox', label: 'Notifications', checked: false },
          { type: 'separator' },
          {
            type: 'submenu',
            label: 'Preferences',
            children: [
              { type: 'item', label: 'General' },
              { type: 'item', label: 'Security' },
              { type: 'item', label: 'Privacy' },
            ],
          },
        ],
      },
      {
        label: 'Account',
        items: [
          {
            type: 'radio-group',
            label: 'Profile',
            radioValue: 'admin',
            radioItems: [
              { value: 'admin', label: 'Administrator' },
              { value: 'user', label: 'User' },
              { value: 'guest', label: 'Guest' },
            ],
          },
          { type: 'separator' },
          { type: 'item', label: 'Sign Out', onClick: () => console.log('Sign out clicked') },
        ],
      },
    ],
  },
};

export const InteractiveDemo: Story = {
  args: {
    onItemClick: (menuLabel: string, itemLabel: string, item: any) => {
      console.log(`Clicked: ${menuLabel} > ${itemLabel}`, item);
      alert(`You clicked: ${menuLabel} > ${itemLabel}`);
    },
  },
};

export const StaticMenubar: Story = {
  render: () => <Menubar />,
};
