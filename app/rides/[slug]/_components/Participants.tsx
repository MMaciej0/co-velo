'use client';

import React, { FC, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { type User } from 'next-auth';
import { Prisma } from '@prisma/client';

import { Button, buttonVariants } from '@/components/ui/button';
import { UserIcon } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toggleParticipant } from '@/actions/create';
import { useToast } from '@/components/ui/use-toast';

export interface Participant {
  id: string;
  name: string | null;
  image: string | null;
}

export type RideWithOwnerAndParticipants = Prisma.ListingGetPayload<{
  include: {
    owner: true;
  };
}> & {
  participants: Participant[];
};

interface ParticipantsProps {
  ride: RideWithOwnerAndParticipants;
  currentUser: User;
}

const Participants: FC<ParticipantsProps> = ({ ride, currentUser }) => {
  const { participants, owner, id } = ride;
  const { toast } = useToast();

  const alreadySignedIn = useMemo(() => {
    return participants.map(({ id }) => id).includes(currentUser.id);
  }, [participants, currentUser]);

  const isOwner = currentUser.id === owner.id;

  const handleSignUp = () => {
    toggleParticipant(id, currentUser.id, alreadySignedIn).then((callback) => {
      if (callback?.error) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: callback.error,
        });
      }
    });
  };

  return (
    <div className="flex flex-col">
      {participants.length > 0 && (
        <Carousel className="w-full my-4">
          <CarouselContent className="my-6">
            {participants.map(({ id, name, image }) => (
              <CarouselItem key={id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-2 flex items-center justify-center border rounded">
                  <p className="text-muted-foreground font-semibold mx-2">
                    {name}
                  </p>
                  <Avatar
                    className={cn(
                      'cursor-pointer h-9 w-9',
                      image && 'mx-3',
                      image &&
                        buttonVariants({ variant: 'ghost', size: 'icon' })
                    )}
                  >
                    <AvatarImage src={image || ''} />
                    <AvatarFallback className="bg-transparent">
                      <UserIcon />
                    </AvatarFallback>
                  </Avatar>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}

      <Button
        disabled={isOwner}
        onClick={handleSignUp}
        className="max-w-[350px] lg:max-w-[400px] m-auto w-full"
      >
        {alreadySignedIn ? 'Sign out' : 'Sign up for ride'}
      </Button>
    </div>
  );
};

export default Participants;
