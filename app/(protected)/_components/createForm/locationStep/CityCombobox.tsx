'use client';

import React, { FC, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { getStartingPoint } from '@/actions/startingPoint';
import { useDebounce } from '@/hooks/useDebounce';
import { TCreateSchema } from '@/lib/validators/createSchema';
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

interface CityComboboxProps {
  value: string;
  onValueChange: (val: string) => void;
}

const CityCombobox: FC<CityComboboxProps> = ({ onValueChange, value }) => {
  const [open, setOpen] = useState(false);
  const { watch, setValue, trigger } = useFormContext<TCreateSchema>();
  const [citySearch, setCitySearch] = useState('');
  const debouncedCitySearch = useDebounce(citySearch, 1000);
  const country = watch('country');

  const enabled = !!debouncedCitySearch;

  const {
    data,
    isLoading: isLoadingOrig,
    isError,
  } = useQuery({
    queryKey: ['cities', debouncedCitySearch],
    queryFn: () => getStartingPoint(country, debouncedCitySearch),
    enabled: enabled && !!country,
    staleTime: 1000,
  });

  const isLoading = enabled && isLoadingOrig;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={!country}
          variant="outline"
          role="combobox"
          className={cn(
            'w-full',
            'justify-between',
            !value && 'text-muted-foreground'
          )}
        >
          {value || 'Select city'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[300px]">
        <Command
          shouldFilter={false}
          className="h-auto rounded-lg border border-b-0 shadow-md"
        >
          <CommandInput
            value={citySearch}
            onValueChange={setCitySearch}
            placeholder="Search city..."
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
                        setValue('street', '');
                        onValueChange(name);
                        setValue('startingPointLat', lat);
                        setValue('startingPointLon', lon);
                        trigger(['city', 'street']);
                        setCitySearch('');
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

export default CityCombobox;
