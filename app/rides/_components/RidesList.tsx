import React, { FC } from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { format } from 'date-fns';
import { capitalizeString, cn, createSearchParamsURL } from '@/lib/utils';
import { type Params } from '../page';

import { Bike, Calendar, Clock, MountainSnow, Route } from 'lucide-react';
import EmptyState from '@/components/EmptyState';
import { Separator } from '@/components/ui/separator';
import { buttonVariants } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface RidesListProps {
  params: Params;
}

type SortOption = {
  value: string;
  label: string;
};

type SortOptions = {
  [key in SortOption['value']]: { field: string; method: string };
};

const generatePaginationLink = ({
  country,
  city,
  street,
  page = '1',
  rideType,
  sort,
  bikeType,
}: Params) => {
  const params = createSearchParamsURL({
    country,
    city,
    ...(street && { street }),
    page,
    ...(rideType && { rideType }),
    ...(sort && { sort }),
    ...(bikeType && { bikeType }),
  });

  return `/rides/?${params}`;
};

const RidesList: FC<RidesListProps> = async ({ params }) => {
  const { country, city, street, page, rideType, sort, bikeType } = params;

  const currentPage = Number(page);
  const ridesPerPage = 6;
  const skip = (currentPage - 1) * ridesPerPage;

  const sortOptions: SortOptions = {
    longest: {
      field: 'distance',
      method: 'desc',
    },
    shortest: {
      field: 'distance',
      method: 'asc',
    },
    nearest: {
      field: 'departureDate',
      method: 'asc',
    },
    latest: {
      field: 'departureDate',
      method: 'desc',
    },
  };

  const where: {
    country: string;
    city: string;
    street?: string;
    rideType?: string | { in: string[] };
    bikeType?: string | { in: string[] };
  } = { country, city, street };

  if (typeof rideType === 'string') {
    where.rideType = rideType;
  } else if (Array.isArray(rideType) && rideType.length > 0) {
    where.rideType = { in: rideType };
  }

  if (typeof bikeType === 'string') {
    where.bikeType = bikeType;
  } else if (Array.isArray(bikeType) && bikeType.length > 0) {
    where.bikeType = { in: bikeType };
  }

  const ridesCountPromise = prisma.listing.count({ where });

  const ridesPromise = prisma.listing.findMany({
    where,
    orderBy: sort
      ? { [sortOptions[sort].field]: sortOptions[sort].method }
      : { createdAt: 'desc' },
    take: ridesPerPage,
    skip,
  });

  const [rides, ridesCount] = await Promise.all([
    ridesPromise,
    ridesCountPromise,
  ]);

  const maxPage = Math.ceil(ridesCount / ridesPerPage);

  if (!ridesCount || currentPage > maxPage) {
    return <EmptyState />;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 justify-items-center">
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
                <span>{capitalizeString(String(ride.distance))} km</span>
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
      {maxPage > 1 && (
        <div className="py-10">
          <Pagination>
            <PaginationContent>
              {currentPage !== 1 && (
                <>
                  <PaginationItem>
                    <PaginationPrevious
                      href={generatePaginationLink({
                        country,
                        city,
                        street,
                        bikeType,
                        rideType,
                        sort,
                        page: String(currentPage - 1),
                      })}
                    />
                  </PaginationItem>
                  {currentPage > 2 && (
                    <>
                      <PaginationItem>
                        <PaginationLink
                          href={generatePaginationLink({
                            country,
                            city,
                            street,
                            bikeType,
                            rideType,
                            sort,
                            page: '1',
                          })}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    </>
                  )}
                </>
              )}
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  {currentPage}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href={generatePaginationLink({
                    country,
                    city,
                    street,
                    bikeType,
                    rideType,
                    sort,
                    page: String(maxPage),
                  })}
                >
                  {maxPage}
                </PaginationLink>
              </PaginationItem>
              {currentPage !== maxPage && (
                <PaginationItem>
                  <PaginationNext
                    href={generatePaginationLink({
                      country,
                      city,
                      street,
                      bikeType,
                      rideType,
                      sort,
                      page: String(currentPage + 1),
                    })}
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default RidesList;
