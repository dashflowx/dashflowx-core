import { ComponentPropsWithRef, forwardRef } from 'react';
import {
  IconUnOrderList,
  OrderList,
  UnOrderList,
  type ListItem,
  type ListSize,
  type ListSpacing,
} from './ListComp';

export type ListVariant = 'ordered' | 'iconunordered' | 'unordered';

export type { ListItem, ListSize, ListSpacing, OrderListProps, UnOrderListProps } from './ListComp';

export interface ListProps extends ComponentPropsWithRef<'div'> {
  /**
   * List style. Library spelling `varients` is intentional and preferred for
   * existing callers; `variant` is accepted as an alias.
   */
  varients?: ListVariant;
  /** Alias of `varients`. */
  variant?: ListVariant;
  listArray?: ListItem[];
  listClassName?: string;
  size?: ListSize;
  spacing?: ListSpacing;
}

/** @deprecated Use `ListItem`. */
export type iListArray = ListItem;

const List = forwardRef<HTMLDivElement, ListProps>(
  (
    {
      listArray,
      listClassName,
      varients,
      variant,
      size = 'md',
      spacing = 'sm',
      ...props
    },
    ref
  ) => {
    const resolved: ListVariant = varients ?? variant ?? 'unordered';

    return (
      <div ref={ref} {...props}>
        {resolved === 'ordered' ? (
          <OrderList
            listArray={listArray}
            listClassName={listClassName}
            size={size}
            spacing={spacing}
          />
        ) : resolved === 'iconunordered' ? (
          <IconUnOrderList
            listArray={listArray}
            listClassName={listClassName}
            size={size}
            spacing={spacing}
          />
        ) : (
          <UnOrderList
            listArray={listArray}
            listClassName={listClassName}
            size={size}
            spacing={spacing}
          />
        )}
      </div>
    );
  }
);

List.displayName = 'List';

export { IconUnOrderList, List, OrderList, UnOrderList };
