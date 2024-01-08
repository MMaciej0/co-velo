'use server';

import { z } from 'zod';
import axios from 'axios';
import { env } from '@/lib/validators/env';
import { countrySchema } from '@/lib/validators/countrySchema';
import { getErrorMessage, getZodParsingErrors } from '@/lib/utils';

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
