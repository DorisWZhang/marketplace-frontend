import React, { useEffect, useRef } from 'react';

function GoogleMap() {
  const mapRef = useRef(null);

  useEffect(() => {
    const initializeMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 49.2606, lng: -123.2460 }, // Example: UBC
        zoom: 14,
      });

      new window.google.maps.Marker({
        position: { lat: 49.2606, lng: -123.2460 },
        map,
        title: "UBC",
      });
    };

    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    } else {
      initializeMap();
    }
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
}

export default GoogleMap;
