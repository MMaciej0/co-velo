'use client';

import Link from 'next/link';

import FormMessage from '@/components/FormMessage';
import FormWrapper from '@/components/FromWrapper';
import Heading from '@/components/Heading';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const NotFoundPage = () => {
  return (
    <MaxWidthWrapper className="pt-40">
      <FormWrapper shadow>
        <Heading heading="Page not found" />
        <Separator className="my-6" />
        <FormMessage
          variant="destructive"
          message={'This page does not exist'}
        />
        <div className="my-6 space-y-4">
          <Button asChild className="w-full">
            <Link href="/">Home Page</Link>
          </Button>
        </div>
      </FormWrapper>
    </MaxWidthWrapper>
  );
};

export default NotFoundPage;
