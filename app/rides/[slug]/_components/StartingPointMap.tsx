'use client';

import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import MapLoadingSkeleton from '@/components/map/MapLoadingSkeleton';

interface StartingPointMapProps {
  lat: number;
  lon: number;
}

const StartingPointMap: FC<StartingPointMapProps> = ({ lat, lon }) => {
  const Map = dynamic(() => import('@/components/map/Map'), {
    ssr: false,
    loading: () => <MapLoadingSkeleton />,
  });

  return (
    <div>
      <Map lat={lat} lon={lon} />
    </div>
  );
};

export default StartingPointMap;
