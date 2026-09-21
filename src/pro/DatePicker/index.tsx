import { format } from 'date-fns';

import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Button } from '../../components/Button';
import { Calendar } from '../Calendar';
import {
  PopoverComp as Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../components/Popover';

interface iDatePicker {
  mode?: 'single' | 'multiple' | 'range';
  date: any;
  setDate: any;
  className?: string;
}

export function DatePicker({
  mode = 'single',
  date,
  setDate,
  className,
}: iDatePicker) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[240px] justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode={mode}
          date={date}
          setDate={setDate}
        />
      </PopoverContent>
    </Popover>
  );
}
