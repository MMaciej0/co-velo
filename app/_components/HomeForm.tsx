'use client';

import React, { FC } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import FormWrapper from '@/components/FromWrapper';
import { Form, FormField, FormItem } from '@/components/ui/form';
import Heading from '@/components/Heading';
import { Separator } from '@/components/ui/separator';
import { buttonVariants } from '@/components/ui/button';

interface HomeFormProps {}

const HomeForm: FC<HomeFormProps> = ({}) => {
  const form = useForm();

  return (
    <FormWrapper shadow>
      <Heading
        heading="Available rides"
        subheading="Just fill the fields below and find out what we have!"
      />
      <Separator className="my-4" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})}>
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>Country input and others</FormItem>
            )}
          />
        </form>
      </Form>
      <div className="relative py-2">
        <Separator className="my-6" />
        <span className="inline-block absolute right-1/2 translate-x-1/2 bottom-1/2 translate-y-1/2 bg-background px-4 font-semibold">
          or
        </span>
      </div>
      <Link
        className={buttonVariants({ variant: 'outline', className: 'w-full' })}
        href="/create"
      >
        Create ride
      </Link>
    </FormWrapper>
  );
};

export default HomeForm;
