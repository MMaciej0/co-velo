import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'This field is required.')
    .email('This is not a valid email.'),
  password: z.string().min(1, 'This field is required.'),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
