import * as z from 'zod';
import { bikeTypesOptions, rideTypesOptions } from '../inputsOptions';

const requiredString = z.string().min(1, 'This field is required.');

export const countrySchema = z.object({
  id: z.number(),
  name: z.string(),
  iso2: z.string(),
});

export type TCountry = z.infer<typeof countrySchema>;

export const startingPointSchema = z.object({
  lat: z.string(),
  lon: z.string(),
  display_name: z.string(),
  name: z.string(),
});

export type TStartingPointSchema = z.infer<typeof startingPointSchema>;

const paceSchema = z.object({
  pace: z
    .string()
    .refine((val) => /^[0-9]*$/.test(val), {
      message: 'Must be a positive number (integer).',
    })
    .refine(
      (pace) => {
        const num = Number(pace);
        return pace === '' || (num > 10 && num <= 50);
      },
      {
        message: 'Must be between 11 and 50.',
      }
    )
    .optional()
    .or(z.literal('')),
});

const distanceSchema = z.object({
  distance: requiredString.refine((val) => /^[0-9]*$/.test(val), {
    message: 'Must be a positive number (integer).',
  }),
});

const createFormSchema = z.object({
  country: requiredString,
  city: requiredString,
  street: z.string(),
  postalCode: z.string().optional(),
  startingPointDescription: requiredString,
  startingPointLat: requiredString,
  startingPointLon: requiredString,
  departureTime: requiredString,
  departureDate: z
    .date({
      required_error: 'Please select a date',
      invalid_type_error: "That's not a date.",
    })
    .min(new Date(), 'The closest date you can choose is tomorrow.'),
  title: requiredString.max(
    40,
    'Please use shorter title (max 40 characters).'
  ),
  rideType: requiredString.refine(
    (val) => rideTypesOptions.find((type) => type.value === val),
    'Incorrect ride type.'
  ),
  bikeType: requiredString.refine(
    (val) => bikeTypesOptions.find((type) => type.value === val),
    'Incorrect ride type.'
  ),
  route: z.union([z.string().url(), z.literal('')]),
  description: z.string().optional(),
});

export const createSchema = createFormSchema
  .and(distanceSchema)
  .and(paceSchema);

export type TCreateSchema = z.infer<typeof createSchema>;

export const homeFormSchema = createFormSchema.pick({
  country: true,
  city: true,
  street: true,
});

export type THomeFormSchema = z.infer<typeof homeFormSchema>;
