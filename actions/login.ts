'use server';

import { TLoginSchema, loginSchema } from '@/lib/validators/loginSchema';

export const login = (credentials: TLoginSchema) => {
  const validatedCredentials = loginSchema.safeParse(credentials);

  if (!validatedCredentials.success) {
    return { error: 'Invalid credentials.' };
  }

  return { success: 'Successfully signed in' };
};
