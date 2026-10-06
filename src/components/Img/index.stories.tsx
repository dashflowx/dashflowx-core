import type { Meta, StoryObj } from '@storybook/react';
import { Img } from '.';

const meta: Meta<typeof Img> = {
  title: 'Element/Img',
  component: Img,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'shadow', 'ring', 'muted'],
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
    },
    fit: {
      control: 'select',
      options: ['cover', 'contain', 'fill', 'none', 'scale-down'],
    },
    size: {
      control: 'select',
      options: ['auto', 'sm', 'md', 'lg', 'xl', 'full'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const sampleSrc =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop';

export const Default: Story = {
  args: {
    variant: 'default',
    rounded: 'md',
    size: 'md',
    src: sampleSrc,
    alt: 'Mountain landscape',
  },
};

export const Bordered: Story = {
  args: {
    variant: 'bordered',
    size: 'md',
    src: sampleSrc,
    alt: 'Bordered image',
  },
};

export const Shadow: Story = {
  args: {
    variant: 'shadow',
    size: 'md',
    src: sampleSrc,
    alt: 'Shadow image',
  },
};

export const Ring: Story = {
  args: {
    variant: 'ring',
    size: 'md',
    src: sampleSrc,
    alt: 'Ring image',
  },
};

export const Muted: Story = {
  args: {
    variant: 'muted',
    size: 'md',
    src: sampleSrc,
    alt: 'Muted image',
  },
};

export const RoundedFull: Story = {
  args: {
    rounded: 'full',
    size: 'md',
    fit: 'cover',
    src: sampleSrc,
    alt: 'Circular image',
  },
};

export const Cover: Story = {
  args: {
    size: 'lg',
    fit: 'cover',
    src: sampleSrc,
    alt: 'Cover fit',
  },
};
