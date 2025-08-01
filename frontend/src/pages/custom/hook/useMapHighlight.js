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

        map.setCenter(center);

        new window.kakao.maps.Marker({ map, position: center });

        const dummyPath = [
          new window.kakao.maps.LatLng(lat + 0.001, lng - 0.001),
          new window.kakao.maps.LatLng(lat + 0.001, lng + 0.001),
          new window.kakao.maps.LatLng(lat - 0.001, lng + 0.001),
          new window.kakao.maps.LatLng(lat - 0.001, lng - 0.001)
        ];

        const polygon = new window.kakao.maps.Polygon({
          map,
          path: dummyPath,
          strokeWeight: 2,
          strokeColor: '#004c80',
          strokeOpacity: 0.8,
          fillColor: '#A2D0F1',
          fillOpacity: 0.5
        });

        if (onClick) {
          window.kakao.maps.event.addListener(polygon, 'click', () => onClick(areaName));
        }
      });
    };

    init();
  }, [map, areaName, onClick]);
};
