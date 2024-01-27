import { z } from 'zod';
import {
  bikeTypesOptions,
  rideTypesOptions,
  sortOptions,
} from '../inputsOptions';

export const filterSchema = z.object({
  rideType: z.array(z.enum(rideTypesOptions)),
  bikeType: z.array(z.enum(bikeTypesOptions)),
  sort: z.enum(sortOptions),
});

export type TFilterSchema = z.infer<typeof filterSchema>;
