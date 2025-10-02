import React, { useRef, useEffect } from 'react';

import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';

const OLMap = ({ center = { lat: 37.7749, lng: -122.4194 }, zoom = 10 }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([center.lng, center.lat]),
        zoom: zoom,
      }),
    });

    return () => map.setTarget(null);
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',
        height: '400px',
        border: '1px solid #ccc',
      }}
    />
  );
};

export default OLMap;
