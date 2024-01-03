import { z } from 'zod';

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, 'This field is required and needs to be at least 3 characters.'),
  email: z
    .string()
    .min(1, 'This field is required.')
    .email('This is not a valid email.'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export type TRegisterSchema = z.infer<typeof registerSchema>;
