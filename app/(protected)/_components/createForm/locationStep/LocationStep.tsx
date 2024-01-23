import React, { FC, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { TCountry, TCreateSchema } from '@/lib/validators/rideLocationSchema';

import CityCombobox from './CityCombobox';
import StreetCombobox from './StreetCombobox';
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
import { ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

interface LocationStepProps {
  countries: TCountry[];
}

const LocationStep: FC<LocationStepProps> = ({ countries }) => {
  const [countryListOpen, setCountryListOpen] = useState(false);
  const { watch, setValue, control, reset } = useFormContext<TCreateSchema>();
  const country = watch('country');
  const city = watch('city');

  return (
    <>
      <FormField
        control={control}
        name="country"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold text-base block my-2">
              Country
            </FormLabel>
            <FormControl>
              <Popover open={countryListOpen} onOpenChange={setCountryListOpen}>
                <PopoverTrigger asChild>
                  <FormControl className="w-full">
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'w-full',
                        'justify-between',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value || 'Select country'}

                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command className="h-auto rounded-lg border border-b-0 shadow-md">
                    <CommandInput placeholder="Search country..." />
                    <CommandList className="my-4">
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup>
                        {countries?.map((country) => (
                          <CommandItem
                            value={country.name}
                            key={country.id}
                            onSelect={() => {
                              reset();
                              setValue('country', country.name);
                              setCountryListOpen(false);
                            }}
                          >
                            {country.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormDescription>
              Select country, where you want to ride.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        disabled={!country}
        control={control}
        name="city"
        render={({ field }) => (
          <FormItem>
            <FormLabel
              className={cn(
                'font-semibold text-base block my-2',
                !country && 'text-secondary-foreground/20'
              )}
            >
              City
            </FormLabel>
            <FormControl>
              <CityCombobox
                value={field.value}
                onValueChange={field.onChange}
              />
            </FormControl>
            <FormDescription
              className={`${!country && 'text-secondary-foreground/20'}`}
            >
              City, where u want to start your ride.
            </FormDescription>
            {country && <FormMessage />}
          </FormItem>
        )}
      />
      <FormField
        disabled={!city}
        control={control}
        name="street"
        render={({ field }) => (
          <FormItem>
            <FormLabel
              className={cn(
                'font-semibold text-base block my-2',
                !city && 'text-secondary-foreground/20'
              )}
            >
              Street
            </FormLabel>
            <FormControl>
              <StreetCombobox
                value={field.value}
                onValueChange={field.onChange}
              />
            </FormControl>
            <FormDescription
              className={`${!city && 'text-secondary-foreground/20'}`}
            >
              Street, where you want to start ride (optional).
            </FormDescription>
            {country && city && <FormMessage />}
          </FormItem>
        )}
      />
    </>
  );
};

export default LocationStep;
