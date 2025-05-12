import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, ResponsiveContainer
} from 'recharts';
import CustomLegend from './components/CustomLegend';
import InfoGPT from './components/InfoGPT';
import { getScore } from './service/ScoreService';
import '@/styles/InfoDetail.css';

const InfoDetail = () => {
  const location = useLocation();
  const initialCoords = location.state?.coords || { lat: 37.5665, lng: 126.9780 };

  const [scoreData, setScoreData] = useState([]);
  const [coords, setCoords] = useState(initialCoords);

  useEffect(() => {
    if (!coords.lat || !coords.lng) return;

    const fetchScore = async () => {
      try {
        const score = await getScore(coords.lat, coords.lng);
        console.log("✅ 전체 점수 응답:", score);

        const chartData = [
          { name: '🚗교통', uv: score.traffic ?? 5 },
          { name: '🌳생활 인프라', uv: score.infra ?? 5 },
          { name: '💰시세', uv: score.rent ?? 5 },
          { name: '👨‍✈️치안', uv: score.safety ?? 5 },
          { name: '🔊소음', uv: score.noise ?? 5 },
          { name: '👩‍👩‍👧‍👦인구 밀도', uv: score.population ?? 5 }
        ];

        setScoreData(chartData);
      } catch (err) {
        console.error("❌ 점수 요청 실패:", err);
      }
    };

    fetchScore();
  }, [coords]);

  return (
    <div className='chart-background'>
      <InfoGPT />
      <div className='chart-area'>
        <div className='chart-box'>
          <ResponsiveContainer width="100%" height={800}>
            <RadarChart data={scoreData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis />
              <Radar
                dataKey="uv"
                fill="#6EA8DC"
                fillOpacity={0.6}
                stroke='#6EA8DC'
                strokeLinecap='round'
                animationDuration={1000}
                animationBegin={0}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <CustomLegend />
      </div>
    </div>
  );
};

export default InfoDetail;
