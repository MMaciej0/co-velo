import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import React from 'react';

const LoadingPage = () => {
  return (
    <div className="pt-28">
      <MaxWidthWrapper>
        <div className="w-full h-[50px] animate-pulse rounded bg-foreground/25 overflow-hidden"></div>
        <ul className="grid grid-cols-1 gap-y-8 mt-10 justify-items-center">
          {[...Array(3)].map((item, index) => (
            <li
              key={index}
              className="relative animate-pulse max-w-[450px] w-full"
            >
              <div className="w-full h-[100px] overflow-hidden rounded-lg bg-foreground/25"></div>
            </li>
          ))}
        </ul>
      </MaxWidthWrapper>
    </div>
  );
};

export default LoadingPage;
