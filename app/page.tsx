import React from 'react';
import Link from 'next/link';
import { getAvailableRidesData } from '@/actions/startingPoint';

import HomeForm from '@/app/_components/HomeForm';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import FormError from '@/components/FormMessage';
import FormWrapper from '@/components/FromWrapper';
import { Separator } from '@/components/ui/separator';
import { buttonVariants } from '@/components/ui/button';

export default async function Home() {
  const availableCountries = await getAvailableRidesData({}, 'country');

  return (
    <MaxWidthWrapper className="lg:h-screen relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full place-content-center pb-32 lg:pb-8">
        <div className="text-center lg:text-start px-2 pt-40 pb-6 lg:p-0 lg:flex lg:flex-col lg:justify-center space-y-12 lg:space-y-32">
          <h1 className="text-6xl md:text-7xl xl:text-8xl font-black leading-tight ">
            Lets cycle <p className="text-primary">together!</p>
          </h1>
          <p className="text-muted-foreground lg:font-medium text-lg md:text-xl lg:2xl md:pt-10 lg:leading-loose">
            Finding companions to ride or train with, has never been easier.
            Just enter your starting point and search for available rides or
            create your own one!
          </p>
        </div>

        <div className="w-full pt-20 px-6 md:px-0 lg:ml-16">
          <FormWrapper shadow>
            {!availableCountries ? (
              <FormError message="Searching is disabled right now." />
            ) : (
              <HomeForm countries={availableCountries} />
            )}
            <div className="relative py-2">
              <Separator className="my-6" />
              <span className="inline-block absolute right-1/2 translate-x-1/2 bottom-1/2 translate-y-1/2 bg-background px-4 font-semibold">
                or
              </span>
            </div>
            <Link
              className={buttonVariants({
                variant: 'outline',
                className: 'w-full',
              })}
              href="/create"
            >
              Create ride
            </Link>
          </FormWrapper>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
