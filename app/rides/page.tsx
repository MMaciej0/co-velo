import React, { Suspense } from 'react';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import LoadingSkeleton from '@/app/rides/_components/LoadingSkeleton';
import RidesList from '@/app/rides/_components/RidesList';

export interface Params {
  country: string;
  city: string;
  street?: string;
  page?: string;
}

interface RidesPageProps {
  searchParams: Params;
}

const RidesPage = async ({
  searchParams: { country, city, street, page = '1' },
}: RidesPageProps) => {
  return (
    <MaxWidthWrapper className="pt-20 pb-20">
      <header className="px-2 py-4 md:py-0 mb-12 border shadow-sm shadow-primary rounded">
        <h1 className="text-center font-semibold text-2xl pt-8 pb-10 underline underline-offset-4 decoration-primary">
          {`Rides starting ${
            street ? `at ${street}, ${city}` : `in ${city}`
          }, ${country}.`}
        </h1>
      </header>

      <Suspense fallback={<LoadingSkeleton />}>
        <RidesList params={{ country, city, street, page }} />
      </Suspense>
    </MaxWidthWrapper>
  );
};

export default RidesPage;
