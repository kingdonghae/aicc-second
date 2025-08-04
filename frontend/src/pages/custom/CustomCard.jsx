// 📁 src/pages/custom/CustomCard.jsx
import React, { useState } from 'react';
import KakaoMap from '@/pages/map/components/KakaoMap';
import { useGPTRecommendation } from './hook/useGPTRecommendation';
import { useMapHighlight } from './hook/useMapHighlight';
import { useNavigation } from '@/hook/useNavigation';

const CustomCard = ({ rank, areaName, score }) => {
  const { reason, loading } = useGPTRecommendation({ score, areaName });
  const [map, setMap] = useState(null);
  const { goMapWithState } = useNavigation();

  useMapHighlight({
    map,
    areaName,
    onClick: (clickedAreaName, coords) => { 
      goMapWithState(coords, clickedAreaName, null, null); 
    },
  });

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