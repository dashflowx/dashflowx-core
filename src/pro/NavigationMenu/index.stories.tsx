import type { Meta, StoryObj } from '@storybook/react';
import { NavigationMenu } from '.';

const meta: Meta<typeof NavigationMenu> = {
  title: 'Element/NavigationMenu',
  component: NavigationMenu,
  tags: ['autodocs'],
  argTypes: {
    showIcons: {
      control: { type: 'boolean' },
    },
    showBadges: {
      control: { type: 'boolean' },
    },
    backgroundColor: {
      control: { type: 'select' },
      options: ['default', 'white', 'gray', 'blue', 'green', 'red', 'yellow', 'purple', 'indigo', 'pink', 'orange', 'teal', 'cyan', 'emerald', 'lime', 'amber', 'rose', 'violet', 'fuchsia', 'sky', 'slate', 'zinc', 'neutral', 'stone', 'glass', 'gradient-blue', 'gradient-green', 'gradient-purple', 'gradient-pink', 'gradient-orange', 'gradient-teal', 'gradient-cyan', 'gradient-indigo', 'gradient-violet', 'gradient-rose', 'gradient-emerald', 'gradient-lime', 'gradient-amber', 'gradient-sky', 'gradient-slate', 'gradient-zinc', 'gradient-neutral', 'gradient-stone', 'gradient-rainbow'],
    },
    backgroundIntensity: {
      control: { type: 'select' },
      options: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'minimal', 'bold'],
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark', 'primary'],
    },
    hoverBackgroundColor: {
      control: { type: 'select' },
      options: ['default', 'gray', 'blue', 'green', 'red', 'yellow', 'purple', 'indigo', 'pink', 'orange', 'teal', 'cyan', 'emerald', 'lime', 'amber', 'rose', 'violet', 'fuchsia', 'sky', 'slate', 'zinc', 'neutral', 'stone', 'accent'],
    },
    hoverBackgroundIntensity: {
      control: { type: 'select' },
      options: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    backgroundColor: 'white',
    hoverBackgroundColor: 'gray',
    hoverBackgroundIntensity: '100',
    showIcons: true,
    showBadges: true,
  },
};

export const WithCustomItems: Story = {
  args: {
    items: [
      {
        id: 'products',
        title: 'Products',
        type: 'dropdown',
        items: [
          {
            id: 'web-app',
            title: 'Web App',
            href: '/products/web',
            description: 'Full-featured web application',
            type: 'link',
            badge: 'New'
          },
          {
            id: 'mobile-app',
            title: 'Mobile App',
            href: '/products/mobile',
            description: 'Native mobile applications',
            type: 'link'
          }
        ]
      },
      {
        id: 'pricing',
        title: 'Pricing',
        href: '/pricing',
        type: 'link'
      },
      {
        id: 'contact',
        title: 'Contact',
        href: '/contact',
        type: 'link',
        disabled: true
      }
    ],
    showIcons: true,
    showBadges: true,
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        href: '/dashboard',
        type: 'link',
        icon: '📊'
      },
      {
        id: 'analytics',
        title: 'Analytics',
        type: 'dropdown',
        icon: '📈',
        items: [
          {
            id: 'reports',
            title: 'Reports',
            href: '/analytics/reports',
            description: 'View detailed reports',
            type: 'link',
            icon: '📋'
          },
          {
            id: 'metrics',
            title: 'Metrics',
            href: '/analytics/metrics',
            description: 'Key performance metrics',
            type: 'link',
            icon: '📊'
          }
        ]
      },
      {
        id: 'settings',
        title: 'Settings',
        href: '/settings',
        type: 'link',
        icon: '⚙️'
      }
    ],
    showIcons: true,
    showBadges: true,
  },
};

export const WithBadges: Story = {
  args: {
    items: [
      {
        id: 'notifications',
        title: 'Notifications',
        type: 'dropdown',
        badge: 5,
        items: [
          {
            id: 'unread',
            title: 'Unread',
            href: '/notifications/unread',
            description: 'Unread notifications',
            type: 'link',
            badge: 3
          },
          {
            id: 'all',
            title: 'All Notifications',
            href: '/notifications/all',
            description: 'All notifications',
            type: 'link'
          }
        ]
      },
      {
        id: 'messages',
        title: 'Messages',
        href: '/messages',
        type: 'link',
        badge: '12'
      },
      {
        id: 'tasks',
        title: 'Tasks',
        href: '/tasks',
        type: 'link',
        badge: 'New'
      }
    ],
    showIcons: true,
    showBadges: true,
  },
};

export const WithBackgroundColor: Story = {
  args: {
    backgroundColor: 'blue',
    backgroundIntensity: '500',
    showIcons: true,
    showBadges: true,
  },
};

export const GlassEffect: Story = {
  args: {
    backgroundColor: 'glass',
    showIcons: true,
    showBadges: true,
  },
};

export const GradientBackground: Story = {
  args: {
    backgroundColor: 'gradient-blue',
    showIcons: true,
    showBadges: true,
  },
};

export const RainbowGradient: Story = {
  args: {
    backgroundColor: 'gradient-rainbow',
    showIcons: true,
    showBadges: true,
  },
};

export const DarkTheme: Story = {
  args: {
    backgroundColor: 'slate',
    backgroundIntensity: '800',
    theme: 'dark',
    showIcons: true,
    showBadges: true,
  },
};

export const MinimalVariant: Story = {
  args: {
    backgroundColor: 'green',
    backgroundIntensity: '100',
    variant: 'minimal',
    showIcons: true,
    showBadges: true,
  },
};

export const BoldVariant: Story = {
  args: {
    backgroundColor: 'gradient-purple',
    variant: 'bold',
    showIcons: true,
    showBadges: true,
  },
};

export const DefaultWhite: Story = {
  args: {
    backgroundColor: 'white',
    showIcons: true,
    showBadges: true,
  },
};

export const OldDefault: Story = {
  args: {
    backgroundColor: 'default',
    showIcons: true,
    showBadges: true,
  },
};

export const WithHoverBackground: Story = {
  args: {
    backgroundColor: 'white',
    hoverBackgroundColor: 'blue',
    hoverBackgroundIntensity: '100',
    showIcons: true,
    showBadges: true,
  },
};

export const HoverGreen: Story = {
  args: {
    backgroundColor: 'white',
    hoverBackgroundColor: 'green',
    hoverBackgroundIntensity: '200',
    showIcons: true,
    showBadges: true,
  },
};

export const HoverPurple: Story = {
  args: {
    backgroundColor: 'white',
    hoverBackgroundColor: 'purple',
    hoverBackgroundIntensity: '100',
    showIcons: true,
    showBadges: true,
  },
};