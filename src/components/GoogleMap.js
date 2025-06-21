import React, { useEffect, useRef, useState } from 'react';

function GoogleMap({ onLocationSelect }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const initializeMap = () => {
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: 49.2606, lng: -123.2460 },
        zoom: 14,
        fullscreenControl: false,
      });

      mapInstance.current.addListener("click", (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();

        if (!markerRef.current) {
          markerRef.current = new window.google.maps.Marker({
            position: { lat, lng },
            map: mapInstance.current,
          });
        } else {
          markerRef.current.setPosition({ lat, lng });
        }

        onLocationSelect({ lat, lng });
      });

      setMapLoaded(true);
    };

    if (!window.google || !window.google.maps) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    } else if (!mapLoaded) {
      initializeMap();
    }
  }, [onLocationSelect, mapLoaded]);

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '300px', marginTop: '1rem', borderRadius: '10px' }}
    />
  );
}

export default GoogleMap;
