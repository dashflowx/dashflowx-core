import { cn } from '@/lib/utils';
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '../../components/Button';
import {
  CollapsibleComp,
  CollapsibleContent,
  CollapsibleTrigger,
} from './CollapsibleComp';

interface iCollapsible {
  isOpen: boolean;
  onOpenChange: any;
  title: string;
  collapsibleContent: JSX.Element;
  className?: string;
  titleContainerClassName?: string;
  titleClassName?: string;
  contentClassName?: string;
}

function Collapsible({
  isOpen,
  onOpenChange,
  title,
  collapsibleContent,
  className,
  titleContainerClassName,
  titleClassName,
  contentClassName,
}: iCollapsible) {
  return (
    <CollapsibleComp
      open={isOpen}
      onOpenChange={onOpenChange}
      className={cn('w-[350px] space-y-2', className)}
    >
      <div
        className={cn(
          'flex items-center justify-between space-x-4 px-4',
          titleContainerClassName
        )}
      >
        <h4 className={cn('text-sm font-semibold', titleClassName)}>{title}</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className={cn('space-y-2', contentClassName)}>
        {collapsibleContent}
      </CollapsibleContent>
    </CollapsibleComp>
  );
}

export { Collapsible, CollapsibleComp, CollapsibleContent, CollapsibleTrigger };
