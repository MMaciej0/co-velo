'use server';

import axios from 'axios';
import { z } from 'zod';
import { getErrorMessage, getZodParsingErrors } from '@/lib/utils';
import {
  TStartingPointSchema,
  startingPointSchema,
} from '@/lib/validators/createSchema';

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
