'use server';

import prisma from '@/lib/prisma';
import { getCurrentUser, toSlug } from '@/lib/utils';
import { TCreateSchema } from '@/lib/validators/rideLocationSchema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

type CreateReturn =
  | {
      error?: string;
    }
  | undefined;

export const createRide = async (
  data: TCreateSchema
): Promise<CreateReturn> => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return { error: 'Unauthorized. Please log in' };
  }

  // triggering error :
  // Error: Attempted to call find() from the server but find is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component

  // const validatedData = createSchema.safeParse(data);

  // if (!validatedData.success) {
  //   return { error: 'Invalid values. Please try again.' };
  // }

  // const {
  //   country,
  //   city,
  //   street,
  //   postalCode,
  //   startingPointDescription,
  //   departureDate,
  //   departureTime,
  //   title,
  //   rideType,
  //   bikeType,
  //   route,
  //   description,
  //   distance,
  //   pace,
  //   startingPointLat,
  //   startingPointLon,
  // } = validatedData.data;

  const {
    country,
    city,
    street,
    postalCode,
    startingPointDescription,
    departureDate,
    departureTime,
    title,
    rideType,
    bikeType,
    route,
    description,
    distance,
    pace,
    startingPointLat,
    startingPointLon,
  } = data;

  const slug = `${toSlug(title.trim())}`;

  const newRide = await prisma.listing.create({
    data: {
      slug,
      title: title.trim(),
      country,
      city,
      postalCode,
      street,
      startingPointDescription: startingPointDescription.trim(),
      departureDate,
      departureTime,
      rideType,
      bikeType,
      route,
      description: description?.trim(),
      distance: Number(distance),
      pace,
      startingPointLat: Number(startingPointLat),
      startingPointLon: Number(startingPointLon),
      ownerId: currentUser.id,
    },
  });

  const updatedRide = await prisma.listing.update({
    where: {
      id: newRide.id,
    },
    data: {
      slug: slug + '-' + newRide.id,
    },
  });

  redirect(`/rides/${updatedRide.slug}`);
};

export const toggleParticipant = async (
  listingId: string,
  userId: string,
  signedIn: boolean
): Promise<CreateReturn> => {
  if (typeof listingId !== 'string' || typeof userId !== 'string') {
    return {
      error: 'Please try again later.',
    };
  }

  let action;
  const data = {
    listingId,
    userId,
  };

  try {
    if (signedIn) {
      action = await prisma.participant.deleteMany({ where: { ...data } });
    } else {
      action = await prisma.participant.create({ data });
    }

    if (!action) {
      return {
        error: 'Operation failed. Please try again later.',
      };
    }

    revalidatePath('/rides/[slug]', 'page');

    return {}; // Success
  } catch (error) {
    console.error('Error during Prisma query:', error);
    return {
      error: 'Please try again later.',
    };
  }
};
