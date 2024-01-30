import React from 'react';

const MapLoadingSkeleton = () => {
  return (
    <div className="relative animate-pulse">
      <div className="aspect-video w-full min-h-[40vh] h-full overflow-hidden rounded-lg bg-foreground/25"></div>
    </div>
  );
};

export default MapLoadingSkeleton;
