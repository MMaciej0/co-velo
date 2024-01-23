import React, { Suspense } from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { format } from 'date-fns';
import { capitalizeString, cn } from '@/lib/utils';

import { Bike, Calendar, Clock, MountainSnow, Route } from 'lucide-react';
import Await from '@/components/Await';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import LoadingSkeleton from '@/app/rides/_components/LoadingSkeleton';
import { Separator } from '@/components/ui/separator';
import { buttonVariants } from '@/components/ui/button';

interface RidesPageProps {
  searchParams: {
    country: string;
    city: string;
    street?: string;
  };
}

const RidesPage = async ({
  searchParams: { country, city, street },
}: RidesPageProps) => {
  const ridesPromise = prisma.listing.findMany({
    where: { country, city, street },
  });

  return (
    <MaxWidthWrapper className="pt-40">
      <Suspense fallback={<LoadingSkeleton />}>
        <Await promise={ridesPromise}>
          {(rides) => (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 justify-items-center lg:justify-items-start">
              {rides.map((ride) => (
                <article
                  key={ride.id}
                  className="w-full max-w-[350px] shadow-sm shadow-primary hover:scale-105 duration-300 flex flex-col items-center rounded-lg border"
                >
                  <div className="text-center p-4 font-semibold text-2xl">
                    <p>{capitalizeString(ride.title)}</p>
                  </div>
                  <Separator />
                  <div className="flex flex-col justify-evenly flex-grow space-y-2 py-4">
                    <p className="flex space-x-2">
                      <Calendar />{' '}
                      <span>{format(ride.departureDate, 'PPPP')}</span>
                    </p>
                    <p className="flex space-x-2">
                      <Clock /> <span>{ride.departureTime}</span>
                    </p>
                    <p className="flex space-x-2">
                      <Bike />
                      <span>{capitalizeString(ride.bikeType)} bike ride</span>
                    </p>
                    <p className="flex space-x-2">
                      <MountainSnow />
                      <span>{capitalizeString(ride.rideType)}</span>
                    </p>
                    <p className="flex space-x-2">
                      <Route />
                      <span>{capitalizeString(ride.distance)} km</span>
                    </p>
                  </div>
                  <div className="p-4 w-full">
                    <Link
                      href={`/rides/${ride.slug}`}
                      className={cn(
                        buttonVariants({ variant: 'outline' }),
                        'text-center w-full'
                      )}
                    >
                      Details
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </Await>
      </Suspense>
    </MaxWidthWrapper>
  );
};

export default RidesPage;
