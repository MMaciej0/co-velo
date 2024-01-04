import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

import type { NextAuthConfig } from 'next-auth';
import { loginSchema } from './lib/validators/loginSchema';
import { getUserByEmail } from './lib/database/user';

export default {
  providers: [
    Google,
    Credentials({
      async authorize(credentials) {
        const validatedCredentials = loginSchema.safeParse(credentials);

        if (validatedCredentials.success) {
          const { email, password } = validatedCredentials.data;

          const existingAccount = await getUserByEmail(email);

          if (!existingAccount) {
            throw new Error('Incorrect email.');
          }

          if (!existingAccount.hashedPassword) {
            throw new Error('This email is used to social login.');
          }

          const correctPassword = await bcrypt.compare(
            password,
            existingAccount.hashedPassword
          );

          if (!correctPassword) {
            throw new Error('Incorrect password.');
          }

          return existingAccount;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
