import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TCreateSchema } from '@/lib/validators/createSchema';

import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

const DescriptionStep = () => {
  const { control } = useFormContext<TCreateSchema>();

  return (
    <FormField
      control={control}
      name="description"
      render={({ field }) => (
        <FormItem className="space-y-4">
          <FormLabel className="font-semibold text-base block my-2">
            Description
          </FormLabel>
          <Textarea
            className="min-h-[35vh]"
            {...field}
            placeholder="Your additional description"
          />
          <FormDescription>
            You can add some more info about ride (optional)
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DescriptionStep;
