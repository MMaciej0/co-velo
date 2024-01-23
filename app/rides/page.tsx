import React, { FC } from 'react';
import prisma from '@/lib/prisma';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { capitalizeString, cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import {
  Bike,
  Calendar,
  Clock,
  Clock2,
  Cog,
  MountainSnow,
  Route,
  Type,
} from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
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
  const rides = await prisma.listing.findMany({
    where: { country, city, street },
  });

  if (!rides || !rides.length) throw new Error('Something went wrong.');

  return (
    <MaxWidthWrapper className="pt-40">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center lg:justify-items-start">
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
                <Calendar /> <span>{format(ride.departureDate, 'PPPP')}</span>
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
    </MaxWidthWrapper>
  );
};

export default RidesPage;
