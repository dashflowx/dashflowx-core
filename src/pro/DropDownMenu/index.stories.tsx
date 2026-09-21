import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenu } from '.';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Element/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    backgroundColor: {
      control: 'select',
      options: [
        'blue', 'green', 'red', 'yellow', 'purple', 'pink', 'indigo', 'emerald', 'teal', 'cyan', 
        'orange', 'gray', 'slate', 'zinc', 'neutral', 'stone', 'rose', 'violet', 'fuchsia', 
        'lime', 'amber', 'sky',
        'transparent', 'glass', 'gradient', 'gradient-blue', 'gradient-green', 'gradient-red', 
        'gradient-purple', 'gradient-pink', 'gradient-orange', 'gradient-teal', 'gradient-indigo', 
        'gradient-emerald', 'gradient-cyan', 'gradient-yellow', 'gradient-gray', 'gradient-slate', 
        'gradient-zinc', 'gradient-neutral', 'gradient-stone', 'gradient-rose', 'gradient-violet', 
        'gradient-fuchsia', 'gradient-lime', 'gradient-amber', 'gradient-sky'
      ],
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

export const Basic: Story = {
  args: {
    actionButton: 'Open Dropdown',
    dropdownItems: [
      {
        type: 'label',
        title: 'Title',
      },
      {
        type: 'item',
        title: 'Profile',
        shortcut: '⌘P',
      },
      {
        type: 'item',
        title: 'Settings',
        shortcut: '⌘S',
      },
      {
        type: 'seperator',
      },
      {
        type: 'item',
        title: 'Logout',
      },
    ],
  },
};

export const SimpleItems: Story = {
  args: {
    actionButton: 'Simple Menu',
    dropdownItems: [
      {
        type: 'item',
        title: 'Item 1',
      },
      {
        type: 'item',
        title: 'Item 2',
      },
      {
        type: 'item',
        title: 'Item 3',
      },
    ],
  },
};

export const WithBackgroundColor: Story = {
  args: {
    actionButton: 'Colored Menu',
    backgroundColor: 'blue',
    backgroundIntensity: '500',
    dropdownItems: [
      {
        type: 'label',
        title: 'Settings',
      },
      {
        type: 'seperator',
      },
      {
        type: 'group',
        children: [
          {
            type: 'item',
            title: 'Profile',
          },
          {
            type: 'item',
            title: 'Account',
          },
          {
            type: 'subMenu',
            title: 'More Options',
            subChildren: [
              { title: 'Advanced' },
              { title: 'Preferences' },
            ],
          },
        ],
      },
    ],
  },
};

export const GlassEffect: Story = {
  args: {
    actionButton: 'Glass Menu',
    backgroundColor: 'glass',
    dropdownItems: [
      {
        type: 'label',
        title: 'Glass Effect',
      },
      {
        type: 'group',
        children: [
          {
            type: 'item',
            title: 'Transparent Item',
          },
        ],
      },
    ],
  },
};

export const GradientBackground: Story = {
  args: {
    actionButton: 'Gradient Menu',
    backgroundColor: 'gradient',
    dropdownItems: [
      {
        type: 'label',
        title: 'Gradient Menu',
      },
      {
        type: 'group',
        children: [
          {
            type: 'item',
            title: 'Gradient Item',
          },
        ],
      },
    ],
  },
};

export const GradientBackgrounds: Story = {
  args: {
    actionButton: 'Gradient Menu',
    backgroundColor: 'gradient-blue',
    dropdownItems: [
      {
        type: 'label',
        title: 'Blue Gradient',
      },
      {
        type: 'item',
        title: 'Gradient Item 1',
      },
      {
        type: 'item',
        title: 'Gradient Item 2',
      },
    ],
  },
};

export const AllGradientColors: Story = {
  args: {
    actionButton: 'All Gradients',
    backgroundColor: 'gradient-purple',
    dropdownItems: [
      {
        type: 'label',
        title: 'Purple Gradient',
      },
      {
        type: 'item',
        title: 'Purple Item',
      },
    ],
  },
};

export const RainbowGradient: Story = {
  args: {
    actionButton: 'Rainbow Menu',
    backgroundColor: 'gradient',
    dropdownItems: [
      {
        type: 'label',
        title: 'Rainbow Gradient',
      },
      {
        type: 'item',
        title: 'Colorful Item',
      },
    ],
  },
};

export const DarkTheme: Story = {
  args: {
    actionButton: 'Dark Menu',
    theme: 'dark',
    backgroundColor: 'gray',
    backgroundIntensity: '800',
    dropdownItems: [
      {
        type: 'label',
        title: 'Dark Theme',
      },
      {
        type: 'group',
        children: [
          {
            type: 'item',
            title: 'Dark Item',
          },
        ],
      },
    ],
  },
};
