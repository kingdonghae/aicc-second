import React, { useEffect, useState } from 'react';
import KakaoMap from '@/pages/map/components/KakaoMap';
import { useGPTRecommendation } from './hook/useGPTRecommendation';

const CustomCard = ({ rank, areaName, score }) => {
  const { reason, loading } = useGPTRecommendation({ score, areaName });
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!map || !areaName) return;

    const load = async () => {
      // kakao script 로드 필요하면 여기에 넣을 수도 있음
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(`서울 ${areaName}`, (result, status) => {
        if (status !== window.kakao.maps.services.Status.OK) return;

        const lat = parseFloat(result[0].y);
        const lng = parseFloat(result[0].x);
        const center = new window.kakao.maps.LatLng(lat, lng);

        map.setCenter(center);

        // ✅ 마커
        new window.kakao.maps.Marker({
          map,
          position: center,
        });

        // ✅ 더미 경계 (테스트용 사각형)
        const dummyPath = [
          new window.kakao.maps.LatLng(lat + 0.001, lng - 0.001),
          new window.kakao.maps.LatLng(lat + 0.001, lng + 0.001),
          new window.kakao.maps.LatLng(lat - 0.001, lng + 0.001),
          new window.kakao.maps.LatLng(lat - 0.001, lng - 0.001),
        ];

        const polygon = new window.kakao.maps.Polygon({
          map,
          path: dummyPath,
          strokeWeight: 2,
          strokeColor: '#004c80',
          strokeOpacity: 0.8,
          fillColor: '#A2D0F1',
          fillOpacity: 0.5,
        });

        // ✅ 클릭 이벤트
        window.kakao.maps.event.addListener(polygon, 'click', () => {
          window.open(`/map/view?dong=${areaName}`, '_blank');
        });
      });
    };

    load();
  }, [map, areaName]);

  return (
    <div className="custom-card">
      <h1>{rank}순위</h1>
      <h3>{areaName}</h3>

      <div className="custom-map">
        <KakaoMap zoomLevel={6} onMapLoad={setMap} />
      </div>

      <div className="gpt-recommend">
        {loading ? 'GPT 분석 중...' : (
          <div dangerouslySetInnerHTML={{ __html: reason }} />
        )}
      </div>
    </div>
  );
};

export default CustomCard;