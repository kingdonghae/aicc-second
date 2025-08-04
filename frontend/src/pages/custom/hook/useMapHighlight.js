// 📁 src/pages/custom/hook/useMapHighlight.js
import { useEffect } from 'react';
import { loadKakaoMapScript } from '@/pages/home/utils/loadKakaoMapScript';

export const useMapHighlight = ({ map, areaName, onClick }) => {
  useEffect(() => {
    const init = async () => {
      if (!map || !areaName) return;

      await loadKakaoMapScript();

      if (!window.kakao) return;

      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(`${areaName}`, (result, status) => {
        if (status !== window.kakao.maps.services.Status.OK) return;

        const lat = parseFloat(result[0].y);
        const lng = parseFloat(result[0].x);
        const center = new window.kakao.maps.LatLng(lat, lng);
        const coords = { lat, lng }; 

        map.setCenter(center);

        new window.kakao.maps.Marker({ map, position: center });

        const circle = new window.kakao.maps.Circle({
          map,
          center: center,
          radius: 500, // 원의 반지름
          strokeWeight: 1, // 선의 두께
          strokeColor: '#004c80', // 선의 색깔
          strokeOpacity: 0.8, // 선의 불투명도
          fillColor: '#A2D0F1', // 채우기 색깔
          fillOpacity: 0.3 // 채우기 불투명도
        });

        if (onClick) {
          window.kakao.maps.event.addListener(circle, 'click', () => onClick(areaName, coords));
        }
      });
    };

    init();
  }, [map, areaName, onClick]);
};