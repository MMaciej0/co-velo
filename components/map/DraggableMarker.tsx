'use client';

import { FC, useCallback, useMemo, useRef, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';

interface DraggableMarkerProps {
  lat: number;
  lon: number;
  setNewCoords?: (coords: { lat: number; lng: number }) => void;
}

const DraggableMarker: FC<DraggableMarkerProps> = ({
  lat,
  lon,
  setNewCoords,
}) => {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState({
    lat,
    lng: lon,
  });
  const markerRef = useRef<any | null>(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker !== null) {
          const coords = marker.getLatLng();
          if (setNewCoords) {
            setNewCoords(coords);
          }
          setPosition(coords);
        }
      },
    }),
    [setNewCoords]
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable} className="cursor-pointer">
          {draggable
            ? 'Marker is draggable'
            : 'Click here to make marker draggable'}
        </span>
      </Popup>
    </Marker>
  );
};

export default DraggableMarker;
