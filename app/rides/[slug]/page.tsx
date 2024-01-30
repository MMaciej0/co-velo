import React, { Suspense, cache } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import prisma from '@/lib/prisma';
import { capitalizeString, cn } from '@/lib/utils';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import StartingPointMap from './_components/StartingPointMap';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { buttonVariants } from '@/components/ui/button';
import { User } from 'lucide-react';
import CopyToClipboard from '@/components/CopyToClipboard';
import { Separator } from '@/components/ui/separator';

interface SingleRidePageProps {
  params: {
    slug: string;
  };
}

const getRide = cache(async (slug: string) => {
  const ride = await prisma.listing.findUnique({ where: { slug } });

  if (!ride) return notFound();

  return ride;
});

export const generateMetadata = async ({
  params: { slug },
}: SingleRidePageProps): Promise<Metadata> => {
  const ride = await getRide(slug);

  return {
    title: ride.title,
  };
};

const SingleRidePage = async ({ params: { slug } }: SingleRidePageProps) => {
  const {
    departureDate,
    departureTime,
    bikeType,
    rideType,
    distance,
    title,
    description,
    ownerId,
    pace,
    route,
    startingPointDescription,
    startingPointLat,
    startingPointLon,
  } = await getRide(slug);
  const owner = await prisma.user.findUnique({ where: { id: ownerId } });
  return (
    <MaxWidthWrapper className="pt-20">
      <header className="text-center py-8">
        <h1 className="text-2xl font-bold underline decoration-primary underline-offset-4">
          {capitalizeString(title)}
        </h1>
      </header>

      <div className="bg-primary/5 rounded overflow-hidden">
        <section className="md:grid md:grid-cols-2 md:justify-items-center md:place-items-center pb-4">
          <article className="space-y-3 p-4 mb-6">
            <p className="flex space-x-2">
              <span className="font-bold text-primary dark:text-primary-foreground">
                When?:
              </span>
              <span className="text-muted-foreground font-semibold">
                {format(departureDate, 'PPPP')}
              </span>
            </p>
            <p className="flex space-x-2">
              <span className="font-bold text-primary dark:text-primary-foreground">
                At what time?:
              </span>
              <span className="text-muted-foreground font-semibold">
                {departureTime}
              </span>
            </p>
            <p className="flex space-x-2">
              <span className="font-bold text-primary dark:text-primary-foreground">
                Gear:
              </span>
              <span className="text-muted-foreground font-semibold">
                {capitalizeString(bikeType)} bike
              </span>
            </p>
            <p className="flex space-x-2">
              <span className="font-bold text-primary dark:text-primary-foreground">
                Ride type:
              </span>
              <span className="text-muted-foreground font-semibold">
                {capitalizeString(rideType)}
              </span>
            </p>
            <p className="flex space-x-2">
              <span className="font-bold text-primary dark:text-primary-foreground">
                Distance:
              </span>
              <span className="text-muted-foreground font-semibold">
                {capitalizeString(String(distance))} km
              </span>
            </p>
            {pace && (
              <p className="flex space-x-2">
                <span className="font-bold text-primary dark:text-primary-foreground">
                  Average pace:
                </span>
                <span className="text-muted-foreground font-semibold">
                  {pace} km/h
                </span>
              </p>
            )}
            <p className="flex items-center space-x-2">
              <span className="font-bold text-primary dark:text-primary-foreground">
                Ride leader:
              </span>
              <span className="text-muted-foreground font-semibold">
                {owner?.name}
              </span>
              <Avatar
                className={cn(
                  'cursor-pointer h-9 w-9',
                  owner?.image && 'mx-3',
                  !owner?.image &&
                    buttonVariants({ variant: 'ghost', size: 'icon' })
                )}
              >
                <AvatarImage src={owner?.image || ''} />
                <AvatarFallback className="bg-transparent">
                  <User />
                </AvatarFallback>
              </Avatar>
            </p>
            {route && (
              <CopyToClipboard
                label="Route"
                text={route}
                labelStyle="font-bold text-primary dark:text-primary-foreground"
              />
            )}
          </article>
          <div className="w-full">
            <StartingPointMap lat={startingPointLat} lon={startingPointLon} />
          </div>
          <div className="md:col-start-2 justify-self-start pt-2">
            <p className="flex space-x-2">
              <span className="font-bold text-primary dark:text-primary-foreground">
                Meeting point:
              </span>
              <span className="text-muted-foreground italic">
                {startingPointDescription}
              </span>
            </p>
          </div>
        </section>
        <Separator />
      </div>
    </MaxWidthWrapper>
  );
};

export default SingleRidePage;
