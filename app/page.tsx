import React from 'react';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import HomeForm from '@/app/_components/HomeForm';

export default function Home() {
  return (
    <MaxWidthWrapper className="lg:h-screen relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full place-content-center pb-32 lg:pb-8">
        <div className="text-center lg:text-start px-2 pt-40 pb-6 lg:p-0 lg:flex lg:flex-col lg:justify-center space-y-12 lg:space-y-32">
          <h1 className="text-6xl md:text-7xl xl:text-8xl font-black leading-tight ">
            Lets cycle <p className="text-primary">together!</p>
          </h1>
          <p className="text-muted-foreground lg:font-medium text-lg md:text-xl lg:2xl md:pt-10 lg:leading-loose">
            Finding companions to ride or train with, has never been easier.
            Just enter your starting point and search for available rides or
            create your own one!
          </p>
        </div>

        <div className="w-full pt-20 px-6 md:px-0 lg:ml-16">
          <HomeForm />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
