import { cn } from '@/lib/utils';
import { ComponentPropsWithRef, forwardRef, type ReactElement } from 'react';

export interface ListItem {
  id: number;
  content: string;
  className?: string;
  icon?: ReactElement;
}

export type ListSize = 'sm' | 'md' | 'lg';
export type ListSpacing = 'none' | 'sm' | 'md' | 'lg';

const SIZE_CLASSES: Record<ListSize, string> = {
  sm: 'text-sm',
  md: '',
  lg: 'text-lg',
};

const SPACING_CLASSES: Record<ListSpacing, string> = {
  none: 'space-y-0',
  sm: 'space-y-1',
  md: 'space-y-2',
  lg: 'space-y-3',
};

interface SharedListProps {
  listArray?: ListItem[];
  listClassName?: string;
  size?: ListSize;
  spacing?: ListSpacing;
}

export type OrderListProps = ComponentPropsWithRef<'ol'> & SharedListProps;
export type UnOrderListProps = ComponentPropsWithRef<'ul'> & SharedListProps;

export const OrderList = forwardRef<HTMLOListElement, OrderListProps>(
  ({ listArray, listClassName, size = 'md', spacing = 'sm', ...props }, ref) => {
    return (
      <ol
        className={cn(
          'max-w-md list-decimal list-inside',
          SPACING_CLASSES[spacing],
          SIZE_CLASSES[size],
          listClassName
        )}
        ref={ref}
        {...props}
      >
        {listArray?.map((element) => (
          <li key={element.id} className={element.className}>
            {element.content}
          </li>
        ))}
      </ol>
    );
  }
);

OrderList.displayName = 'OrderList';

export const UnOrderList = forwardRef<HTMLUListElement, UnOrderListProps>(
  ({ listArray, listClassName, size = 'md', spacing = 'sm', ...props }, ref) => {
    return (
      <ul
        className={cn(
          'max-w-md list-disc list-inside',
          SPACING_CLASSES[spacing],
          SIZE_CLASSES[size],
          listClassName
        )}
        ref={ref}
        {...props}
      >
        {listArray?.map((element) => (
          <li key={element.id} className={element.className}>
            {element.content}
          </li>
        ))}
      </ul>
    );
  }
);

UnOrderList.displayName = 'UnOrderList';

export const IconUnOrderList = forwardRef<HTMLUListElement, UnOrderListProps>(
  ({ listArray, listClassName, size = 'md', spacing = 'sm', ...props }, ref) => {
    return (
      <ul
        className={cn(
          'max-w-md list-inside',
          SPACING_CLASSES[spacing],
          SIZE_CLASSES[size],
          listClassName
        )}
        ref={ref}
        {...props}
      >
        {listArray?.map((element) => (
          <li
            key={element.id}
            className={cn('flex items-center', element.className)}
          >
            {element.icon}
            {element.content}
          </li>
        ))}
      </ul>
    );
  }
);

IconUnOrderList.displayName = 'IconUnOrderList';
