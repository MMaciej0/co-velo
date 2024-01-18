import React, { FC, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDebounce } from '@/hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import { getStartingPoint } from '@/actions/startingPoint';
import { cn } from '@/lib/utils';
import { TCountry } from '@/lib/validators/countrySchema';

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
import { Input } from '@/components/ui/input';

interface LocationStepProps {
  countries: TCountry[];
  setCustomError: (message: string) => void;
}

const LocationStep: FC<LocationStepProps> = ({ countries, setCustomError }) => {
  const [countryListOpen, setCountryListOpen] = useState(false);
  const { watch, setValue, control, reset } = useFormContext();
  const debouncedCity = useDebounce(watch('city'), 1000);
  const debouncedStreet = useDebounce(watch('street'), 1000);
  const debouncedPostalCode = useDebounce(watch('postalCode'), 1000);
  const country = watch('country');

  const { data: startingPoint } = useQuery({
    queryKey: [
      'startingPoint',
      country,
      debouncedCity,
      debouncedStreet,
      debouncedPostalCode,
    ],
    queryFn: () =>
      getStartingPoint(
        country,
        debouncedCity,
        debouncedStreet,
        debouncedPostalCode
      ).then((data) => {
        if (data) {
          setCustomError('');
          setValue('startingPointLat', data.lat);
          setValue('startingPointLon', data.lon);
          return data;
        } else {
          setCustomError(
            'Something went wrong. It looks like you entered incorrect values.'
          );
        }
      }),
    enabled: !!country && !!debouncedCity,
    staleTime: 500,
  });

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
            <Popover open={countryListOpen} onOpenChange={setCountryListOpen}>
              <PopoverTrigger asChild>
                <FormControl className='className="w-full p-0"'>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      'w-full',
                      'justify-between',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    {field.value ? field.value : 'Select country'}

                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
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
                            setCustomError('');
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
            <Input
              disabled={field.disabled}
              type="text"
              {...field}
              placeholder="City..."
            />
            <FormDescription
              className={`${!country && 'text-secondary-foreground/20'}`}
            >
              City, where u want to start your ride.
            </FormDescription>
            {country && <FormMessage />}
          </FormItem>
        )}
      />

      {debouncedCity && (
        <>
          <FormField
            control={control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-base block my-2">
                  Street
                </FormLabel>
                <Input type="text" {...field} placeholder="Street..." />
                <FormDescription>
                  Street, where u want to start a ride (optional).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-base block my-2">
                  Postal code
                </FormLabel>
                <Input type="text" {...field} placeholder="Postal code..." />
                <FormDescription>
                  Postal code of a city, where you are starting (optional).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}

      {startingPoint && (
        <div className="p-2 bg-secondary border-[2px] border-primary rounded-md">
          Your starting point is:{' '}
          <p className="font-semibold">{startingPoint.display_name}</p>
        </div>
      )}
    </>
  );
};

export default LocationStep;
