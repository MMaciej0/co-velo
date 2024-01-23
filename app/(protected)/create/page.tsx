import React from 'react';
import { getCountries } from '@/actions/startingPoint';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import CreateForm from '@/app/(protected)/_components/createForm/CreateForm';

const CreatePage = async () => {
  const countries = await getCountries();

  if (!countries) throw new Error('Something went wrong.');

  return (
    <div className="pt-28">
      <MaxWidthWrapper>
        <CreateForm countries={countries} />
      </MaxWidthWrapper>
    </div>
  );
};

export default CreatePage;
