import { auth } from '@/auth';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ZodError } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = String(error.message);
  } else if (typeof error === 'string') {
    message = error;
  } else {
    message = 'Something went wrong';
  }

  return message;
};

export const getZodParsingErrors = (
  error: ZodError
): Record<string, string> => {
  let errors: Record<string, string> = {};
  error.issues.forEach((issue) => {
    errors = { ...errors, [issue.path[0]]: issue.message };
  });
  return errors;
};

export const toSlug = (str: string) => {
  // Convert to lowercase and replace spaces with hyphens
  const slug = str.toLowerCase().replace(/\s+/g, '-');

  // Remove special characters
  const cleanSlug = slug.replace(/[^\w-]/g, '');

  return cleanSlug;
};

export const getCurrentUser = async () => {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  return session.user;
};

export const capitalizeString = (str: string) => {
  if (typeof str !== 'string') {
    return 'Invalid string';
  }

  return str[0].toUpperCase() + str.slice(1);
};

export const createSearchParamsURL = (
  params: Record<string, string | string[]>
) => {
  const flattenedSearchParams = Object.entries(params).flatMap(([key, value]) =>
    Array.isArray(value) ? value.map((v) => [key, v]) : [[key, value]]
  );
  return new URLSearchParams(flattenedSearchParams);
};
