'use client';

import React, { FC } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import DraggableMarker from './DraggableMarker';
import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

interface MapProps {
  lat: number;
  lon: number;
  setNewCoords?: (coords: { lat: number; lng: number }) => void;
  className?: string;
}

const Map: FC<MapProps> = ({ lat, lon, setNewCoords, className }) => {
  return (
    <MapContainer
      placeholder={<Loader />}
      center={[lat, lon]}
      zoom={16}
      scrollWheelZoom={false}
      className={cn('min-h-[40vh] w-full z-0', className)}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {setNewCoords ? (
        <DraggableMarker lat={lat} lon={lon} setNewCoords={setNewCoords} />
      ) : (
        <Marker position={[lat, lon]} />
      )}
    </MapContainer>
  );
};

export default Map;
