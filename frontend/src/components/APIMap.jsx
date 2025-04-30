import React from 'react'

import { useEffect } from 'react';

function APIMap() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAOMAP_KEY}&autoload=false&libraries=services`;
    script.async = true;
    script.id = 'kakao-map-script';
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.9780),
          level: 3
        };
        new window.kakao.maps.Map(container, options);
      });
    };
  }, []);

  return <div id="map" style={{ width: '100vw', height: '100vh' }}></div>;
}

export default APIMap;
