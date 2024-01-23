'use client';

import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { getAvailableRidesData } from '@/actions/startingPoint';
import { cn } from '@/lib/utils';
import {
  THomeFormSchema,
  homeFormSchema,
} from '@/lib/validators/rideLocationSchema';

import { Form } from '@/components/ui/form';
import Heading from '@/components/Heading';
import { Separator } from '@/components/ui/separator';
import LoadingButton from '@/components/LoadingButton';
import HomeFormField from './HomeFormField';
import FormMessage from '@/components/FormMessage';
import { useRouter } from 'next/navigation';

interface HomeFormProps {
  countries: string[];
}

const HomeForm: FC<HomeFormProps> = ({ countries }) => {
  const router = useRouter();
  const form = useForm<THomeFormSchema>({
    defaultValues: {
      country: '',
      city: '',
      street: '',
    },
    resolver: zodResolver(homeFormSchema),
  });
  const {
    reset,
    setValue,
    handleSubmit,
    watch,
    trigger,
    formState: { isSubmitting },
  } = form;
  const country = watch('country');
  const city = watch('city');

  const cityEnabled = !!country;
  const streetEnabled = !!city;

  const { data: cities, isLoading: isCitiesLoading } = useQuery({
    queryKey: ['cities', country],
    queryFn: () => getAvailableRidesData({ country }, 'city'),
    enabled: cityEnabled,
  });

  const { data: streets, isLoading: isStreetsLoading } = useQuery({
    queryKey: ['streets', city],
    queryFn: () => getAvailableRidesData({ country, city }, 'street'),
    enabled: streetEnabled,
  });

  const onSubmit: SubmitHandler<THomeFormSchema> = ({
    country,
    city,
    street,
  }) => {
    const searchParams = new URLSearchParams({
      country,
      city,
      ...(street && { street }),
    });

    router.push(`/rides/?${searchParams}`);
  };

  const onCountrySelect = (value: string) => {
    reset();
    setValue('country', value);
  };

  const onCitySelect = (value: string) => {
    setValue('street', '');
    setValue('city', value);
    trigger();
  };

  const onStreetSelect = (value: string) => {
    setValue('street', value);
  };

  return (
    <>
      <Heading
        heading="Available rides"
        subheading="Just fill the fields below and find out what we have!"
      />
      <Separator className="my-4" />
      <Form {...form}>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <HomeFormField
            name="country"
            data={countries}
            onSelect={onCountrySelect}
          />
          <HomeFormField
            name="city"
            data={cities}
            onSelect={onCitySelect}
            disabled={
              isCitiesLoading || !cities || !cities.length || !cityEnabled
            }
          />
          <HomeFormField
            name="street"
            data={streets}
            onSelect={onStreetSelect}
            disabled={
              isStreetsLoading || !streets || !streets.length || !streetEnabled
            }
            optional
          />
          {streetEnabled && streets && !streets.length && (
            <FormMessage message="Created rides in this city do not have specified street. Go ahead and search using provided values." />
          )}

          <LoadingButton isLoading={isSubmitting} className="w-full">
            Search
          </LoadingButton>
        </form>
      </Form>
    </>
  );
};

export default HomeForm;
