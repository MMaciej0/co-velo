'use client';

import React, { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { add } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  TCountry,
  TCreateSchema,
  createSchema,
} from '@/lib/validators/rideLocationSchema';
import { cn } from '@/lib/utils';
import { createRide } from '@/actions/create';

import DescriptionStep from './DescriptionStep';
import LocationStep from './locationStep/LocationStep';
import MapStep from './MapStep';
import InfoStep from './InfoStep';
import DepartureStep from './DepartureStep';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import FormWrapper from '@/components/FromWrapper';
import { useToast } from '@/components/ui/use-toast';
import LoadingButton from '@/components/LoadingButton';

const steps = [
  {
    id: 1,
    name: 'Location',
    fields: ['city', 'country', 'street', 'postalCode'],
  },
  { id: 2, name: 'Map', fields: ['startingPointDescription'] },
  {
    id: 3,
    name: 'Departure',
    fields: ['departureTime', 'departureDate', 'title'],
  },
  {
    id: 4,
    name: 'Info',
    fields: ['bikeType', 'rideType', 'pace', 'route', 'distance'],
  },
  { id: 5, name: 'Description', fields: ['description'] },
];

type TFields = keyof TCreateSchema;

interface CreateFormProps {
  countries: TCountry[];
}

const initialDate = add(new Date(), { days: 1 });

const CreateForm: FC<CreateFormProps> = ({ countries }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<TCreateSchema>({
    defaultValues: {
      country: '',
      city: '',
      street: '',
      postalCode: '',
      startingPointDescription: '',
      startingPointLat: '',
      startingPointLon: '',
      departureTime: '',
      departureDate: initialDate,
      title: '',
      bikeType: '',
      rideType: '',
      route: '',
      pace: '',
      description: '',
      distance: '',
    },
    resolver: zodResolver(createSchema),
  });
  const { toast } = useToast();

  const onNext = async () => {
    const fieldsToValidate = steps[currentStep].fields as TFields[];
    const validatedVields = await form.trigger(fieldsToValidate, {
      shouldFocus: true,
    });
    if (validatedVields) {
      setCurrentStep((step) => step + 1);
    }
  };

  const onBack = () => {
    setCurrentStep((step) => step - 1);
  };

  const onSubmit: SubmitHandler<TCreateSchema> = async (formData) => {
    try {
      await createRide(formData).then((callback) => {
        if (callback?.error) {
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: callback.error,
          });
        }
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong. Please try again',
      });
    }
  };

  return (
    <div className="relative">
      <ol className="grid grid-cols-1 md:grid-cols-5 place-items-center gap-2 p-1 md:border md:rounded-sm">
        <li
          className={
            'md:hidden w-full text-center py-2 bg-primary text-secondary dark:text-secondary-foreground border rounded-sm'
          }
        >
          Current Step: <span>{steps[currentStep].name}</span>
        </li>
        {steps.map((step) => {
          return (
            <li
              key={step.id}
              className={cn(
                'hidden md:block w-full text-center py-2',
                currentStep === step.id - 1 &&
                  'bg-primary text-secondary dark:text-secondary-foreground border rounded-sm'
              )}
            >
              {step.name}
            </li>
          );
        })}
      </ol>
      <FormWrapper className="border-none lg:max-w-[600px]">
        <Form {...form}>
          <form className="py-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-8">
              {currentStep === 0 && <LocationStep countries={countries} />}
              {currentStep === 1 && <MapStep />}
              {currentStep === 2 && <DepartureStep />}
              {currentStep === 3 && <InfoStep />}
              {currentStep === 4 && <DescriptionStep />}
            </div>
            <div className="flex flex-col space-y-2 md:space-y-0 pt-16">
              <Button
                type="button"
                size="icon"
                className="w-full md:w-10 md:absolute left-0 top-[35vh]"
                onClick={onBack}
                disabled={currentStep === 0}
              >
                <ChevronLeft />
              </Button>

              <Button
                type="button"
                size="icon"
                onClick={onNext}
                disabled={currentStep === steps.length - 1}
                className="w-full md:w-10 md:absolute right-0 top-[35vh]"
              >
                <ChevronRight />
              </Button>
              {currentStep === steps.length - 1 && (
                <LoadingButton
                  type="submit"
                  isLoading={form.formState.isSubmitting}
                >
                  Create
                </LoadingButton>
              )}
            </div>
          </form>
        </Form>
      </FormWrapper>
    </div>
  );
};

export default CreateForm;
