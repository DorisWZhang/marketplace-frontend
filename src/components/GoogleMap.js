import React, { useEffect, useRef, useState } from 'react';

function GoogleMap({ onLocationSelect, latitude = null, longitude = null }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Ensure onLocationSelect is always a function
  const safeOnLocationSelect = typeof onLocationSelect === 'function' ? onLocationSelect : () => {};

  const initializeMap = () => {
    const center = (latitude != null && longitude != null)
      ? { lat: latitude, lng: longitude }
      : { lat: 49.2606, lng: -123.2460 }; // Default to UBC

    mapInstance.current = new window.google.maps.Map(mapRef.current, {
      center,
      zoom: 14,
      fullscreenControl: false,
    });

    // Add initial marker if coordinates are provided
    if (latitude != null && longitude != null) {
      markerRef.current = new window.google.maps.Marker({
        position: center,
        map: mapInstance.current,
      });
    }

    // Add click listener
    mapInstance.current.addListener('click', (e) => {
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

      safeOnLocationSelect({ lat, lng });
    });

    setMapLoaded(true);
  };

  useEffect(() => {
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
  }, [mapLoaded]);

  // Update marker and center if lat/lng props change
  useEffect(() => {
    if (
      mapLoaded &&
      mapInstance.current &&
      latitude != null &&
      longitude != null
    ) {
      const position = { lat: latitude, lng: longitude };

      if (!markerRef.current) {
        markerRef.current = new window.google.maps.Marker({
          position,
          map: mapInstance.current,
        });
      } else {
        markerRef.current.setPosition(position);
      }

      mapInstance.current.setCenter(position);
    }
  }, [latitude, longitude, mapLoaded]);

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '300px', marginTop: '1rem', borderRadius: '10px' }}
    />
  );
}

export default GoogleMap;
