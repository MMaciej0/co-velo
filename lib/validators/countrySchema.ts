import { z } from 'zod';

export const countrySchema = z.object({
  id: z.number(),
  name: z.string(),
  iso2: z.string(),
});

export type TCountry = z.infer<typeof countrySchema>;
