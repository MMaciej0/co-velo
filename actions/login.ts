'use server';

import { AuthError } from 'next-auth';
import { signIn } from '@/auth';
import { TLoginSchema, loginSchema } from '@/lib/validators/loginSchema';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

export const login = async (credentials: TLoginSchema) => {
  const validatedCredentials = loginSchema.safeParse(credentials);

  if (!validatedCredentials.success) {
    throw new Error('Invalid credentials.');
  }

  const { email, password } = validatedCredentials.data;

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error: error.cause?.err?.message,
      };
    }
    throw error;
  }
};
