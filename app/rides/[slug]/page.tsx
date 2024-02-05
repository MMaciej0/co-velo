import React, { cache } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';
import {
  capitalizeString,
  cn,
  createSearchParamsURL,
  getCurrentUser,
} from '@/lib/utils';

import { User as UserIcon } from 'lucide-react';
import Participants from '@/app/rides/[slug]/_components/Participants';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import StartingPointMap from '@/app/rides/[slug]/_components/StartingPointMap';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { buttonVariants } from '@/components/ui/button';
import CopyToClipboard from '@/components/CopyToClipboard';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

interface SingleRidePageProps {
  params: {
    slug: string;
  };
}

const getRide = cache(async (slug: string) => {
  const ride = await prisma.listing.findUnique({
    where: { slug },
    include: {
      participants: {
        include: {
          user: {
            select: {
              name: true,
              image: true,
              id: true,
            },
          },
        },
      },
      owner: true,
    },
  });

  if (!ride) return notFound();

  return {
    ...ride,
    participants: ride.participants.map((participant) => participant.user),
  };
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
  const [ride, currentUser] = await Promise.all([
    getRide(slug),
    getCurrentUser(),
  ]);

  const {
    departureDate,
    departureTime,
    bikeType,
    rideType,
    distance,
    title,
    description,
    pace,
    route,
    startingPointDescription,
    startingPointLat,
    startingPointLon,
    owner,
    participants,
    id,
  } = ride;

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
                  <UserIcon />
                </AvatarFallback>
              </Avatar>
            </p>
            {route && (
              <CopyToClipboard
                label="Route"
                text={route}
                labelStyle="font-bold text-base text-primary dark:text-primary-foreground"
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
        <section className="py-10 px-2 md:px-10 md:grid md:grid-cols-2 md:justify-items-center md:place-items-center md:gap-x-6">
          <h2 className="text-center py-4 text-2xl text-primary dark:text-primary-foreground font-bold md:text-start">
            {!currentUser &&
              'Please log in first, to participate in this ride.'}
            {currentUser &&
              participants.length === 0 &&
              'Be the first and sign up for this ride'}
            {currentUser && participants.length > 0 && 'Already on board:'}
          </h2>
          {!currentUser ? (
            <div className="my-8 md:my-0 flex justify-center w-full">
              <Link
                href={{
                  pathname: '/login',
                  query: { redirect: `/rides/${slug}` },
                }}
                className={cn(
                  buttonVariants({
                    variant: 'default',
                    className: 'w-full max-w-[300px]',
                  })
                )}
              >
                Sign in
              </Link>
            </div>
          ) : (
            <div
              className={cn(
                currentUser && participants.length > 0 && 'col-span-2',
                'w-full'
              )}
            >
              <Participants ride={ride} currentUser={currentUser} />
            </div>
          )}
        </section>
      </div>
    </MaxWidthWrapper>
  );
};
1;

export default SingleRidePage;
