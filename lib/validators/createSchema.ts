import * as z from 'zod';

export const startingPointSchema = z.object({
  lat: z.string(),
  lon: z.string(),
  display_name: z.string(),
});

export type TStartingPointSchema = z.infer<typeof startingPointSchema>;

const formSchema = z.object({
  country: z.string().min(1, 'This field is required.'),
  city: z.string().min(1, 'This field is required.'),
  street: z.string(),
  postalCode: z.string(),
});

export const createSchema = formSchema.extend({
  coords: startingPointSchema.omit({ display_name: true }),
});

export type TCreateSchema = z.infer<typeof createSchema>;
