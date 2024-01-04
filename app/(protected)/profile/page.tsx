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
        className="flex justify-center space-y-10"
        action={async () => {
          'use server';

          await signOut();
        }}
      >
        <Button type="submit">Log out</Button>
      </form>
    </div>
  );
};

export default UserProfilePage;
