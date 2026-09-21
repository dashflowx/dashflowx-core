import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from '.';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['basic', 'image-gallery', 'product-showcase', 'testimonial'],
    },
    loop: {
      control: 'boolean',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
    skipSnaps: {
      control: 'boolean',
    },
    showArrows: {
      control: 'boolean',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    type: 'basic',
    className: 'max-w-2xl',
  },
};

export const ImageGallery: Story = {
  args: {
    type: 'image-gallery',
    className: 'max-w-4xl',
    showArrows: true,
  },
};

export const ProductShowcase: Story = {
  args: {
    type: 'product-showcase',
    className: 'max-w-6xl',
    showArrows: true,
  },
};

export const Testimonial: Story = {
  args: {
    type: 'testimonial',
    className: 'max-w-4xl',
    showArrows: true,
  },
};

export const WithoutArrows: Story = {
  args: {
    type: 'product-showcase',
    className: 'max-w-6xl',
    showArrows: false,
  },
};

export const NoLoop: Story = {
  args: {
    type: 'basic',
    className: 'max-w-2xl',
    loop: false,
    showArrows: true,
  },
};

export const CenterAligned: Story = {
  args: {
    type: 'product-showcase',
    className: 'max-w-6xl',
    align: 'center',
    showArrows: true,
  },
};

export const CustomItems: Story = {
  args: {
    type: 'basic',
    className: 'max-w-2xl',
    items: [
      {
        id: '1',
        content: (
          <div className="bg-blue-500 text-white p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">Custom Slide 1</h3>
            <p>This is a custom slide with blue background</p>
          </div>
        ),
      },
      {
        id: '2',
        content: (
          <div className="bg-green-500 text-white p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">Custom Slide 2</h3>
            <p>This is a custom slide with green background</p>
          </div>
        ),
      },
      {
        id: '3',
        content: (
          <div className="bg-purple-500 text-white p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">Custom Slide 3</h3>
            <p>This is a custom slide with purple background</p>
          </div>
        ),
      },
    ],
    showArrows: true,
  },
};

export const AllTypes: Story = {
  render: () => (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Carousel</h3>
        <Carousel type="basic" className="max-w-2xl" />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Image Gallery</h3>
        <Carousel type="image-gallery" className="max-w-4xl" />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Product Showcase</h3>
        <Carousel type="product-showcase" className="max-w-6xl" />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Testimonial</h3>
        <Carousel type="testimonial" className="max-w-4xl" />
      </div>
    </div>
  ),
};
