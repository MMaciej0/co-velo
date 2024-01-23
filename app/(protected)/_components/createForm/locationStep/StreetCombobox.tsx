import React, { FC, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';
import { useDebounce } from '@/hooks/useDebounce';
import { TCreateSchema } from '@/lib/validators/rideLocationSchema';
import { getStartingPoint } from '@/actions/startingPoint';
import { cn } from '@/lib/utils';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ChevronsUpDown, Loader2 } from 'lucide-react';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

interface StreetComboboxProps {
  value: string;
  onValueChange: (val: string) => void;
}

const StreetCombobox: FC<StreetComboboxProps> = ({ value, onValueChange }) => {
  const [open, setOpen] = useState(false);
  const { watch, setValue } = useFormContext<TCreateSchema>();
  const [streetSearch, setStreetSearch] = useState('');
  const debouncedStreetSearch = useDebounce(streetSearch, 1000);
  const country = watch('country');
  const city = watch('city');

  const enabled = !!debouncedStreetSearch;

  const {
    data,
    isLoading: isLoadingOrig,
    isError,
  } = useQuery({
    queryKey: ['street', debouncedStreetSearch],
    queryFn: () => getStartingPoint(country, city, debouncedStreetSearch),
    enabled: enabled && !!country && !!city,
    staleTime: 1000,
  });

  const isLoading = enabled && isLoadingOrig;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={!city}
          variant="outline"
          role="combobox"
          className={cn(
            'w-full',
            'justify-between',
            !value && 'text-muted-foreground'
          )}
        >
          {value || 'Select street'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[300px]">
        <Command
          shouldFilter={false}
          className="h-auto rounded-lg border border-b-0 shadow-md"
        >
          <CommandInput
            value={streetSearch}
            onValueChange={setStreetSearch}
            placeholder="Search street..."
          />
          {enabled && (
            <CommandList>
              {isLoading && (
                <div className="p-4 flex justify-center items-center">
                  <Loader2 size={25} className="animate-spin" />
                </div>
              )}
              {!isError && !isLoading && !data?.length && (
                <p className="p-2 mt-3 text-center text-sm">No city found.</p>
              )}
              {isError && (
                <p className="p-2 mt-3 text-center text-sm">
                  Something went wrong.
                </p>
              )}
              <CommandGroup>
                {data?.map(({ name, display_name, lat, lon }) => {
                  return (
                    <CommandItem
                      key={display_name}
                      onSelect={() => {
                        onValueChange(name);
                        setValue('startingPointLat', lat);
                        setValue('startingPointLon', lon);
                        setStreetSearch('');
                        setOpen(false);
                      }}
                    >
                      {display_name}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StreetCombobox;
