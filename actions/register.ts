'use server';

import bcrypt from 'bcrypt';
import prisma from '@/lib/db';
import {
  TRegisterSchema,
  registerSchema,
} from '@/lib/validators/registerSchema';

export const register = async (credentials: TRegisterSchema) => {
  let errors: Record<string, string> = {};
  const validatedCredentials = registerSchema.safeParse(credentials);

  if (!validatedCredentials.success) {
    validatedCredentials.error.issues.forEach((issue) => {
      errors = { ...errors, [issue.path[0]]: issue.message };
    });
    return { errors };
  }

  const existingUsername = await prisma.user.findFirst({
    where: {
      name: credentials.username,
    },
  });

  if (existingUsername) {
    errors.username = 'This username is already taken.';
  }

  const existingEmail = await prisma.user.findFirst({
    where: {
      email: credentials.email,
    },
  });

  if (existingEmail) {
    errors.email = 'This email is already taken.';
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
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
    throw new Error('Something went wrong.');
  }
};
