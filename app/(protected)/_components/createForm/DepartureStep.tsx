import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { TCreateSchema } from '@/lib/validators/createSchema';

import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const DepartureStep = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { watch, setValue, control } = useFormContext<TCreateSchema>();

  const date = watch('departureDate');

  console.log(date);

  return (
    <>
      <FormField
        control={control}
        name="departureDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold text-base block my-2">
              Plase select your departure date
            </FormLabel>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn('w-full justify-start text-left font-normal')}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(field.value, 'PPP')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(selectedDay) => {
                    if (selectedDay) {
                      field.onChange(selectedDay);
                      setIsCalendarOpen(false);
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="departureTime"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold text-base block my-2">
              Detarture time
            </FormLabel>
            <Input type="time" {...field} />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormLabel className="font-semibold text-base block my-2">
              Ride title
            </FormLabel>
            <Textarea {...field} placeholder="eg. Around London training..." />
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default DepartureStep;
