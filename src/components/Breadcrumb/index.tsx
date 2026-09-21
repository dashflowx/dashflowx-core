'use client';

import * as React from 'react';
import {
  ChevronRight,
  ArrowRight,
  Minus,
  ChevronsRight,
  ChevronDown,
  Triangle,
  Slash,
  Circle,
  Square,
  Star,
  Heart,
  Diamond,
  ArrowUpRight,
  ArrowDownRight,
  ArrowLeftRight,
  ArrowUpDown,
  GripVertical,
  MoreHorizontal,
  Plus,
} from 'lucide-react';
import {
  PopoverComp as Popover,
  PopoverContent,
  PopoverTrigger,
} from '../Popover';
import {
  BreadcrumbComp,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './BreadcrumbComp';

export type BreadcrumbVariant = 'default' | 'minimal' | 'bordered' | 'filled' | 'gradient' | 'outlined';
export type BreadcrumbSize = 'sm' | 'md' | 'lg';
export type BreadcrumbSeparatorStyle = 
  | 'slash' 
  | 'chevron' 
  | 'arrow' 
  | 'dot' 
  | 'custom'
  | 'caret'
  | 'double-chevron'
  | 'triangle'
  | 'circle'
  | 'square'
  | 'star'
  | 'heart'
  | 'diamond'
  | 'arrow-up-right'
  | 'arrow-down-right'
  | 'arrow-left-right'
  | 'arrow-up-down'
  | 'grip-vertical'
  | 'more-horizontal'
  | 'plus';

interface iBreadcrumbItemChild {
  title: string | JSX.Element;
  href?: string;
}

interface iBreadcrumbItem {
  id: string;
  type: 'item' | 'dropdown';
  title: string | JSX.Element;
  href?: string;
  children?: iBreadcrumbItemChild[];
  separator?: boolean;
}

interface iBreadcrumb {
  breadcrumbList?: iBreadcrumbItem[];
  variant?: BreadcrumbVariant;
  size?: BreadcrumbSize;
  separatorStyle?: BreadcrumbSeparatorStyle;
  className?: string;
  listClassName?: string;
  itemClassName?: string;
  activeItemClassName?: string;
  separatorClassName?: string;
}

const getBreadcrumbClasses = (variant: BreadcrumbVariant, size: BreadcrumbSize) => {
  const baseClasses = 'flex items-center';
  
  const variantClasses = {
    default: 'text-gray-700',
    minimal: 'text-gray-600',
    bordered: 'text-gray-700 border border-gray-200 rounded-lg px-3 py-2',
    filled: 'text-gray-700 bg-gray-50 rounded-lg px-3 py-2',
    gradient: 'text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg px-3 py-2',
    outlined: 'text-gray-700 border-2 border-gray-300 rounded-lg px-3 py-2'
  };
  
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };
  
  return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;
};

const getSeparatorIcon = (style: BreadcrumbSeparatorStyle) => {
  const iconProps = { className: 'text-gray-400' };
  
  switch (style) {
    case 'slash':
      return <Slash {...iconProps} className="w-4 h-4 text-gray-400" />;
    case 'chevron':
      return <ChevronRight {...iconProps} className="w-4 h-4 text-gray-400" />;
    case 'arrow':
      return <ArrowRight {...iconProps} className="w-4 h-4 text-gray-400" />;
    case 'dot':
      return <Minus {...iconProps} className="w-2 h-2 text-gray-400" />;
    case 'custom':
      return <ChevronRight {...iconProps} className="w-4 h-4 text-gray-400" />;
    case 'caret':
      return <ChevronDown {...iconProps} className="w-4 h-4 text-gray-400" />;
    case 'double-chevron':
      return <ChevronsRight {...iconProps} className="w-4 h-4 text-gray-400" />;
    case 'triangle':
      return <Triangle {...iconProps} className="w-3 h-3 text-gray-400" />;
    case 'circle':
      return <Circle {...iconProps} className="w-2 h-2 text-gray-400 fill-current" />;
    case 'square':
      return <Square {...iconProps} className="w-2 h-2 text-gray-400 fill-current" />;
    case 'star':
      return <Star {...iconProps} className="w-3 h-3 text-gray-400 fill-current" />;
    case 'heart':
      return <Heart {...iconProps} className="w-3 h-3 text-gray-400 fill-current" />;
    case 'diamond':
      return <Diamond {...iconProps} className="w-3 h-3 text-gray-400 fill-current" />;
    case 'arrow-up-right':
      return <ArrowUpRight {...iconProps} className="w-4 h-4 text-gray-400" />;
    case 'arrow-down-right':
      return <ArrowDownRight {...iconProps} className="w-4 h-4 text-gray-400" />;
    case 'arrow-left-right':
      return <ArrowLeftRight {...iconProps} className="w-4 h-4 text-gray-400" />;
    case 'arrow-up-down':
      return <ArrowUpDown {...iconProps} className="w-4 h-4 text-gray-400" />;
    case 'grip-vertical':
      return <GripVertical {...iconProps} className="w-3 h-3 text-gray-400" />;
    case 'more-horizontal':
      return <MoreHorizontal {...iconProps} className="w-4 h-4 text-gray-400" />;
    case 'plus':
      return <Plus {...iconProps} className="w-3 h-3 text-gray-400" />;
    default:
      return <ChevronRight {...iconProps} className="w-4 h-4 text-gray-400" />;
  }
};

const BreadcrumbComponent = React.forwardRef<HTMLDivElement, iBreadcrumb>(({
  variant = 'default',
  size = 'md',
  separatorStyle = 'chevron',
  breadcrumbList = [],
  className,
  ...props
}, ref) => {
  // SSR Safety: Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return <div className="animate-pulse bg-gray-200 rounded p-4 text-center">Loading Breadcrumb...</div>;
  }

  // Ensure we have a safe breadcrumb list
  const safeBreadcrumbList = Array.isArray(breadcrumbList) ? breadcrumbList : [];
  const finalBreadcrumbList: iBreadcrumbItem[] = safeBreadcrumbList.length > 0 ? safeBreadcrumbList : [
    { id: '1', type: 'item', title: 'Home', href: '/', separator: false }
  ];

  // Generate classes based on variant and size
  const containerClasses = getBreadcrumbClasses(variant, size);
  const linkClasses = 'text-blue-600 hover:text-blue-800 transition-colors duration-200';
  const currentClasses = 'text-gray-900 font-medium';

  return (
    <nav ref={ref} aria-label="Breadcrumb" className={containerClasses} {...props}>
      <ol className="flex items-center flex-wrap gap-1 md:gap-3">
        {finalBreadcrumbList.map((item, index) => {
          const isLast = index === finalBreadcrumbList.length - 1;
          const isDropdown = item.type === 'dropdown' && item.children && item.children.length > 0;

          return (
            <li key={item.id} className="flex items-center">
              {/* Content */}
              {isDropdown ? (
                <Popover>
                  <PopoverTrigger className={`${linkClasses} flex items-center`}>
                    <span>{item.title}</span>
                    <BreadcrumbEllipsis className="ml-1 h-4 w-4" />
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-1">
                    {item.children?.map((child, childIndex) => (
                      <a
                        key={childIndex}
                        href={child.href}
                        className="block cursor-pointer rounded px-2 py-1.5 text-sm hover:bg-gray-100"
                      >
                        {child.title}
                      </a>
                    ))}
                  </PopoverContent>
                </Popover>
              ) : (
                <div className="flex items-center">
                  {item.href && !isLast ? (
                    <a href={item.href} className={linkClasses}>
                      {item.title}
                    </a>
                  ) : (
                    <span className={isLast ? currentClasses : linkClasses}>
                      {item.title}
                    </span>
                  )}
                </div>
              )}
              
              {/* Separator - only show if not the last item */}
              {!isLast && (
                <span className="mx-3 text-gray-400 flex-shrink-0">
                  {getSeparatorIcon(separatorStyle)}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
});

// Client-side wrapper to prevent SSR issues
const ClientBreadcrumb = (props: iBreadcrumb) => {
  const [isMounted, setIsMounted] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    try {
      setIsMounted(true);
    } catch (error) {
      console.error('Error mounting ClientBreadcrumb:', error);
      setHasError(true);
    }
  }, []);

  // Show loading state during SSR and initial render
  if (!isMounted) {
    return React.createElement('div', { 
      className: 'animate-pulse bg-gray-200 rounded p-4 text-center' 
    }, 'Loading Breadcrumb...');
  }

  // Show error state if something went wrong
  if (hasError) {
    return React.createElement('div', { 
      className: 'text-red-500 p-4 border border-red-300 rounded text-center' 
    }, 'Error loading breadcrumb');
  }

  // Only render the actual component after mounting
  try {
    return React.createElement(BreadcrumbComponent, props);
  } catch (error) {
    console.error('Error rendering BreadcrumbComponent:', error);
    return React.createElement('div', { 
      className: 'text-red-500 p-4 border border-red-300 rounded text-center' 
    }, 'Error rendering breadcrumb');
  }
};

export const Breadcrumb = ClientBreadcrumb;

export {
  BreadcrumbComp,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
