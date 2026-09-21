import { cn } from '@/lib/utils';
import {
  CarouselApi,
  CarouselComp,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './CarouselComp';

interface iCarousel {
  items?: {
    id: string;
    content: JSX.Element;
  }[];
  className?: string;
  type?: 'basic' | 'image-gallery' | 'product-showcase' | 'testimonial';
  loop?: boolean;
  align?: 'start' | 'center' | 'end';
  skipSnaps?: boolean;
  showArrows?: boolean;
}

function Carousel({ 
  items = [], 
  className,
  type = 'basic',
  loop = true,
  align = 'start',
  skipSnaps = false,
  showArrows = true,
}: iCarousel) {
  // Define different carousel content based on type if no items provided
  const getDefaultCarouselItems = (type: string) => {
    switch (type) {
      case 'image-gallery':
        return [
          {
            id: '1',
            content: (
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
                  alt="Mountain landscape"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-6 rounded-b-lg">
                  <h3 className="font-bold text-xl mb-2 text-white">Mountain Landscape</h3>
                  <p className="text-white text-base">Beautiful mountain scenery</p>
                </div>
              </div>
            )
          },
          {
            id: '2',
            content: (
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop"
                  alt="Forest path"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-6 rounded-b-lg">
                  <h3 className="font-bold text-xl mb-2 text-white">Forest Path</h3>
                  <p className="text-white text-base">Peaceful forest trail</p>
                </div>
              </div>
            )
          },
          {
            id: '3',
            content: (
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
                  alt="Ocean waves"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-6 rounded-b-lg">
                  <h3 className="font-bold text-xl mb-2 text-white">Ocean Waves</h3>
                  <p className="text-white text-base">Calming ocean view</p>
                </div>
              </div>
            )
          }
        ];
      
      case 'product-showcase':
        return [
          {
            id: '1',
            content: (
              <div className="bg-white rounded-lg shadow-md p-6">
                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop"
                  alt="Premium Headphones"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold text-lg mb-2">Premium Headphones</h3>
                <p className="text-gray-600 text-sm mb-3">High-quality wireless headphones with noise cancellation</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">$299</span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Add to Cart</button>
                </div>
              </div>
            )
          },
          {
            id: '2',
            content: (
              <div className="bg-white rounded-lg shadow-md p-6">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
                  alt="Smart Watch"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold text-lg mb-2">Smart Watch</h3>
                <p className="text-gray-600 text-sm mb-3">Feature-rich smartwatch with health monitoring</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">$199</span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Add to Cart</button>
                </div>
              </div>
            )
          },
          {
            id: '3',
            content: (
              <div className="bg-white rounded-lg shadow-md p-6">
                <img
                  src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop"
                  alt="Wireless Speaker"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold text-lg mb-2">Wireless Speaker</h3>
                <p className="text-gray-600 text-sm mb-3">Portable Bluetooth speaker with amazing sound quality</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">$149</span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Add to Cart</button>
                </div>
              </div>
            )
          }
        ];
      
      case 'testimonial':
        return [
          {
            id: '1',
            content: (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-xl font-semibold">JD</span>
                </div>
                <blockquote className="text-gray-700 text-lg mb-4">
                  "This product has completely transformed my workflow. The quality and features are outstanding!"
                </blockquote>
                <div>
                  <h4 className="font-semibold text-gray-900">John Doe</h4>
                  <p className="text-gray-600 text-sm">CEO, TechCorp</p>
                </div>
              </div>
            )
          },
          {
            id: '2',
            content: (
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-xl font-semibold">SJ</span>
                </div>
                <blockquote className="text-gray-700 text-lg mb-4">
                  "Incredible value for money. The customer support is exceptional and the product delivers on all promises."
                </blockquote>
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah Johnson</h4>
                  <p className="text-gray-600 text-sm">Designer, CreativeStudio</p>
                </div>
              </div>
            )
          },
          {
            id: '3',
            content: (
              <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-xl font-semibold">MW</span>
                </div>
                <blockquote className="text-gray-700 text-lg mb-4">
                  "The best investment I've made this year. Highly recommended for anyone looking for quality solutions."
                </blockquote>
                <div>
                  <h4 className="font-semibold text-gray-900">Mike Wilson</h4>
                  <p className="text-gray-600 text-sm">Founder, StartupXYZ</p>
                </div>
              </div>
            )
          }
        ];
      
      default:
        return [
          { id: '1', content: <div className="p-8 text-center border border-gray-200 rounded-lg bg-gray-50 h-full">Slide 1</div> },
          { id: '2', content: <div className="p-8 text-center border border-gray-200 rounded-lg bg-gray-50 h-full">Slide 2</div> },
          { id: '3', content: <div className="p-8 text-center border border-gray-200 rounded-lg bg-gray-50 h-full">Slide 3</div> }
        ];
    }
  };

  const carouselItems = items.length > 0 ? items : getDefaultCarouselItems(type);

  return (
    <CarouselComp 
      className={cn('w-full max-w-xs m-auto', className)}
      opts={{
        loop,
        align,
        skipSnaps,
      }}
    >
      <CarouselContent>
        {carouselItems.map((item) => (
          <CarouselItem key={item.id}>{item.content}</CarouselItem>
        ))}
      </CarouselContent>
      {showArrows && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </CarouselComp>
  );
}

export {
  Carousel,
  CarouselComp,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
};
