import React, { FC } from 'react';

interface LoadingSkeletonProps {}

const LoadingSkeleton: FC<LoadingSkeletonProps> = ({}) => {
  return (
    <ul className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((movie, index) => (
        <li key={index} className="relative animate-pulse">
          <div className="aspect-video w-full h-[300px] overflow-hidden rounded-lg bg-foreground/25"></div>
        </li>
      ))}
    </ul>
  );
};

export default LoadingSkeleton;
