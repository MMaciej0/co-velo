import { auth, signOut } from '@/auth';
import Heading from '@/components/Heading';
import { Button } from '@/components/ui/button';
import React from 'react';

const UserProfilePage = async () => {
  const session = await auth();
  return (
    <div className="pt-36">
      <Heading heading={`Hello ${session?.user?.name}`} />
      <form
        className="flex flex-col items-center space-y-10"
        action={async () => {
          'use server';

          await signOut();
        }}
      >
        <p>{session?.user?.id}</p>
        <Button type="submit">Log out</Button>
      </form>
    </div>
  );
};

export default UserProfilePage;
