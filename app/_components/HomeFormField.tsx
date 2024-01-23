import React, { FC, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { THomeFormSchema } from '@/lib/validators/rideLocationSchema';
import { cn } from '@/lib/utils';

import { ChevronsUpDown } from 'lucide-react';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

interface HomeFormFieldProps {
  name: keyof THomeFormSchema;
  data: string[] | [] | undefined;
  onSelect: (value: string) => void;
  disabled?: boolean;
  optional?: boolean;
}

const HomeFormField: FC<HomeFormFieldProps> = ({
  name,
  data,
  onSelect,
  disabled,
  optional,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { control } = useFormContext<THomeFormSchema>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel
            className={cn(
              'font-semibold text-base',
              disabled && 'text-secondary-foreground/20'
            )}
          >
            {`${name[0].toLocaleUpperCase() + name.slice(1)}`}
          </FormLabel>
          <FormControl>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <FormControl className="w-full">
                  <Button
                    disabled={disabled}
                    variant="outline"
                    role="combobox"
                    className={cn(
                      'w-full justify-between',
                      disabled && 'text-secondary-foreground/20'
                    )}
                  >
                    {field.value || `Select ${name}`}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command className="h-auto rounded-lg border border-b-0 shadow-md">
                  <CommandInput placeholder={`Search ${name}...`} />
                  <CommandList className="my-4">
                    <CommandEmpty>{`No ${name} found.`}</CommandEmpty>
                    <CommandGroup>
                      {data?.map((item) => (
                        <CommandItem
                          value={item}
                          key={item}
                          onSelect={() => {
                            onSelect(item);
                            setIsOpen(false);
                          }}
                        >
                          {item}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormDescription
            className={cn(disabled && 'text-secondary-foreground/20')}
          >
            {`Select ${name}, where you want to ride.`}
            {optional && ' (optional)'}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default HomeFormField;
