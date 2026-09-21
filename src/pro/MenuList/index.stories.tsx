import type { Meta, StoryObj } from '@storybook/react';
import { ArrowRight } from 'lucide-react';
import { MenuList } from '.';

const meta: Meta<typeof MenuList> = {
  title: 'Element/MenuList',
  component: MenuList,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    menuArrays: [
      {
        id: '1',
        title: 'Dashboard',
        path: '/admin',
        active: true,
        menuIcon: <ArrowRight />,
      },
      {
        id: '2',
        title: 'Applicants',
        path: '/admin/posts',
        active: false,
        menuIcon: <ArrowRight />,
      },
      {
        id: '3',
        title: 'Clients',
        path: '/admin/posts',
        active: false,
        menuIcon: <ArrowRight />,
      },
    ],
    type: 'a',
    library: 'react',
    variant: 'basic',
    showText: false
  },
};

export const One: Story = {
  args: {
    menuArrays: [
      {
        id: '1',
        title: 'Dashboard',
        path: '/admin',
        active: true,
        menuIcon: <ArrowRight />,
      },
      {
        id: '2',
        title: 'Applicants',
        path: '/admin/posts',
        active: false,
        menuIcon: <ArrowRight />,
      },
      {
        id: '3',
        title: 'Clients',
        path: '/admin/posts',
        active: false,
        menuIcon: <ArrowRight />,
      },
    ],
    type: 'a',
    library: 'react',
    variant: 'one',
    showText: false
  },
};

export const Two: Story = {
  args: {
    menuArrays: [
      {
        id: '1',
        title: 'Dashboard',
        path: '/admin',
        active: true,
        menuIcon: <ArrowRight />,
      },
      {
        id: '2',
        title: 'Applicants',
        path: '/admin/posts',
        active: false,
        menuIcon: <ArrowRight />,
      },
      {
        id: '3',
        title: 'Clients',
        path: '/admin/posts',
        active: false,
        menuIcon: <ArrowRight />,
      },
    ],
    type: 'a',
    library: 'react',
    variant: 'two',
    showText: false
  },
};

export const WithText: Story = {
  args: {
    menuArrays: [
      {
        id: '1',
        title: 'Dashboard',
        path: '/admin',
        active: true,
        menuIcon: <ArrowRight />,
      },
      {
        id: '2',
        title: 'Applicants',
        path: '/admin/posts',
        active: false,
        menuIcon: <ArrowRight />,
      },
      {
        id: '3',
        title: 'Clients',
        path: '/admin/posts',
        active: false,
        menuIcon: <ArrowRight />,
      },
      {
        id: '4',
        title: 'Settings',
        path: '/settings',
        active: false,
        menuIcon: <ArrowRight />,
        badge: 'New'
      },
    ],
    type: 'a',
    library: 'react',
    variant: 'basic',
    showText: true,
    showIcon: true
  },
};
