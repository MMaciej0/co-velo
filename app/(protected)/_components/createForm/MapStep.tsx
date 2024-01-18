'use client';

import React, { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { TCreateSchema } from '@/lib/validators/createSchema';
import { Textarea } from '@/components/ui/textarea';
import dynamic from 'next/dynamic';

const MapStep = () => {
  const Map = useMemo(
    () => dynamic(() => import('@/components/map/Map'), { ssr: false }),
    []
  );

  const { watch, setValue, control } = useFormContext<TCreateSchema>();
  const lat = Number(watch('startingPointLat'));
  const lon = Number(watch('startingPointLon'));

  const setNewCoords = (coords: { lat: number; lng: number }) => {
    setValue('startingPointLat', coords.lat.toString());
    setValue('startingPointLon', coords.lng.toString());
  };

  return (
    <>
      <FormItem className="space-y-4">
        <FormLabel className="font-semibold text-base">
          Your starting point
        </FormLabel>
        <Map lat={lat} lon={lon} setNewCoords={setNewCoords} />
        <FormDescription>
          The map marker can be dragged (just clink on it and set dragable), you
          can precisely determine the point where you want to start your ride.
        </FormDescription>
      </FormItem>
      <FormField
        control={control}
        name="startingPointDescription"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormLabel className="font-semibold text-base block my-2">
              Describe place, where the ride will start
            </FormLabel>
            <Textarea {...field} placeholder="Your description..." />
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default MapStep;
