'use server';

import axios from 'axios';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { getErrorMessage, getZodParsingErrors } from '@/lib/utils';
import {
  TStartingPointSchema,
  countrySchema,
  startingPointSchema,
} from '@/lib/validators/rideLocationSchema';
import { env } from '@/lib/validators/env';
import { Prisma } from '@prisma/client';

export const getCountries = async () => {
  try {
    const { data } = await axios.get(
      'https://api.countrystatecity.in/v1/countries',
      {
        headers: {
          'X-CSCAPI-KEY': env.COUNTRIES_API_KEY,
        },
      }
    );

    const CountriesResult = z.array(countrySchema);

    const validatedCountries = CountriesResult.safeParse(data);

    if (!validatedCountries.success) {
      console.log({ error: getZodParsingErrors(validatedCountries.error) });
      return;
    }
    return validatedCountries.data;
  } catch (error) {
    console.log({ error: getErrorMessage(error) });
  }
};

export const getStartingPoint = async (
  country: string,
  city: string,
  street?: string
): Promise<TStartingPointSchema[] | undefined> => {
  const encodedCity = encodeURIComponent(city);
  const encodedCountry = encodeURIComponent(country);
  const encodedStreet = street ? `&street=${encodeURIComponent(street)}` : '';

  const address = `https://nominatim.openstreetmap.org/search?city=${encodedCity}&country=${encodedCountry}${encodedStreet}&format=json&featureType=${
    street ? 'street' : 'city'
  }`;

  try {
    const { data } = await axios.get(address);
    const startingPointArrSchema = z.array(startingPointSchema);
    const validatedResult = startingPointArrSchema.safeParse(data);

    if (!validatedResult.success) {
      console.log({ error: getZodParsingErrors(validatedResult.error) });
      return;
    }

    return validatedResult.data;
  } catch (error) {
    console.log({ error: getErrorMessage(error) });
  }
};

export const getAvailableRidesData = async (
  where: Prisma.ListingWhereInput,
  select: Prisma.ListingScalarFieldEnum
): Promise<string[] | [] | undefined> => {
  try {
    const data = await prisma.listing.findMany({
      where,
      select: {
        [select]: true,
      },
      orderBy: { [select]: 'desc' },
      distinct: [select],
    });

    const filteredData = data
      .map((item) => item[select])
      .filter((value) => typeof value === 'string' && value !== '');

    return filteredData as unknown as string[];
  } catch (error) {
    console.error('Error fetching data:', getErrorMessage(error));
  }
};
