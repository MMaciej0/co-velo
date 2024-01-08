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
  street?: string,
  postalCode?: string
): Promise<TStartingPointSchema | undefined> => {
  let address = encodeURIComponent(`${country}, ${city}`);

  if (street) {
    address += encodeURIComponent(`, ${street}`);
  }

  if (postalCode) {
    address += encodeURIComponent(`, ${postalCode}`);
  }

  try {
    const { data } = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${address}&format=json&limit=1`
    );
    const startingPointArrSchema = z.array(startingPointSchema);
    const validatedResult = startingPointArrSchema.safeParse(data);

    if (!validatedResult.success) {
      console.log({ error: getZodParsingErrors(validatedResult.error) });
      return;
    }
    return validatedResult.data[0];
  } catch (error) {
    console.log({ error: getErrorMessage(error) });
  }
};
