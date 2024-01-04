'use server';

import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import {
  TRegisterSchema,
  registerSchema,
} from '@/lib/validators/registerSchema';

export const register = async (credentials: TRegisterSchema) => {
  const validatedCredentials = registerSchema.safeParse(credentials);

  if (!validatedCredentials.success) {
    return { error: 'Invalid credentials.' };
  }

  const existingUsername = await prisma.user.findFirst({
    where: {
      name: credentials.username,
    },
  });

  if (existingUsername) {
    return { error: 'This username is already taken.' };
  }

  const existingEmail = await prisma.user.findFirst({
    where: {
      email: credentials.email,
    },
  });

  if (existingEmail) {
    return { error: 'This email is already taken.' };
  }

  const hashedPassword = bcrypt.hashSync(credentials.password, 10);

  const newUser = await prisma.user.create({
    data: {
      name: credentials.username,
      email: credentials.email,
      hashedPassword,
    },
  });

  if (newUser) {
    return { success: 'User created.' };
  } else {
    return { error: 'Something went wrong.' };
  }
};
