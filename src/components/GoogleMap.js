import React, { useEffect, useRef } from 'react';

function GoogleMap({ onLocationSelect }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const initializeMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 49.2606, lng: -123.2460 },
        zoom: 14,
      });

      let marker = new window.google.maps.Marker({
        position: { lat: 49.2606, lng: -123.2460 },
        map,
      });

      map.addListener("click", (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        marker.setPosition({ lat, lng });
        onLocationSelect({ lat, lng }); // send coords back to parent
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
  }, [onLocationSelect]);

  return <div ref={mapRef} style={{ width: '100%', height: '300px', marginTop: '1rem' }} />;
}
export default GoogleMap;