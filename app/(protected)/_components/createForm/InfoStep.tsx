'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TCreateSchema } from '@/lib/validators/createSchema';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

export const rideTypesOptions = [
  { value: 'chill', label: 'Chill' },
  { value: 'sightseeing', label: 'Sightseeing' },
  { value: 'training', label: 'Training' },
  { value: 'coffeeRide', label: 'Coffee Ride' },
  { value: 'other', label: 'Other' },
];

export const bikeTypesOptions = [
  { value: 'road', label: 'Road' },
  { value: 'gravel', label: 'Gravel' },
  { value: 'mtb', label: 'MTB' },
  { value: 'urban', label: 'Urban' },
  { value: 'cross', label: 'Cross' },
  { value: 'other', label: 'Other' },
];

const InfoStep = () => {
  const { control } = useFormContext<TCreateSchema>();

  return (
    <>
      <FormField
        control={control}
        name="rideType"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold text-base block my-2">
              Ride type
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select ride type..." />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {rideTypesOptions.map((type) => (
                  <SelectItem key={type.label} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="bikeType"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold text-base block my-2">
              Bike type
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select bike type..." />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {bikeTypesOptions.map((type) => (
                  <SelectItem key={type.label} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="pace"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold text-base block my-2">
              Average pace
            </FormLabel>
            <Input type="text" {...field} placeholder="Pace" />
            <FormDescription>
              Enter the average pace of your ride in km/h (optional).
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="route"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold text-base block my-2">
              Route
            </FormLabel>
            <Input type="text" {...field} placeholder="Route url..." />
            <FormDescription>
              Paste the link to the route you created so that others can
              download it and use it for navigation (optional).
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default InfoStep;
