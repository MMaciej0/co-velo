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
  startingPointDescription: z.string().min(1, 'This field is required.'),
  departureTime: z.string().min(1, 'This field is required.'),
  departureDate: z
    .date({
      required_error: 'Please select a date',
      invalid_type_error: "That's not a date.",
    })
    .min(new Date(), 'The closest date you can choose is tomorrow.'),
  title: z
    .string()
    .min(1, 'This field is required.')
    .max(40, 'Please use shorter title (max 40 characters).'),
});

export const createSchema = formSchema.extend({
  coords: startingPointSchema.omit({ display_name: true }),
});

export type TCreateSchema = z.infer<typeof createSchema>;
