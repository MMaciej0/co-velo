'use client';

import React from 'react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import FormWrapper from '@/components/FromWrapper';
import FormError from '@/components/FormMessage';
import Heading from '@/components/Heading';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const error = ({ error, reset }: { error: Error; reset: () => void }) => {
  console.error(error);
  return (
    <MaxWidthWrapper className="pt-40">
      <FormWrapper shadow>
        <Heading heading="Error" />
        <Separator className="my-6" />
        <FormError variant="destructive" message={'Something went wrong.'} />
        <div className="my-6 space-y-4">
          <Button onClick={reset} className="w-full">
            Try again
          </Button>
          <Button asChild className="w-full">
            <Link href="/">Home Page</Link>
          </Button>
        </div>
      </FormWrapper>
    </MaxWidthWrapper>
  );
};

export default error;
