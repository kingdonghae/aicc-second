import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts';
import CustomLegend from './components/CustomLegend';
import GPTReport from '@/components/GPTReport';
import { getScore } from '@/services/ScoreService';
import '@/styles/InfoDetail.css';
import { LegendList } from './components/legendList';

const InfoDetail = () => {
  const location = useLocation();
  const initialCoords = location.state?.coords || { lat: 37.5665, lng: 126.9780 };
  const initialAddress = location.state?.address || '';
  const preloadScore = location.state?.score || null;
  const preloadGpt = location.state?.gpt || '';

  const [score, setScore] = useState(preloadScore);
  const [scoreData, setScoreData] = useState([]);
  const [address, setAddress] = useState(initialAddress);
  const [coords, setCoords] = useState(initialCoords);
  const [gpt, setGpt] = useState(preloadGpt);

  useEffect(() => {
    if (score) {
      const chartData = [
        { name: '교통', uv: score.traffic ?? 5 },
        { name: '생활 인프라', uv: score.infra ?? 5 },
        { name: '시세', uv: score.rent ?? 5 },
        { name: '치안', uv: score.safety ?? 5 },
        { name: '소음', uv: score.noise ?? 5 },
        { name: '인구 밀도', uv: score.population ?? 5 }
      ];
      setScoreData(chartData);
      return;
    }

    const fetchScore = async () => {
      const newScore = await getScore(coords.lat, coords.lng);
      setScore(newScore);
      const chartData = [
        { name: '교통', uv: newScore.traffic ?? 5 },
        { name: '생활 인프라', uv: newScore.infra ?? 5 },
        { name: '시세', uv: newScore.rent ?? 5 },
        { name: '치안', uv: newScore.safety ?? 5 },
        { name: '소음', uv: newScore.noise ?? 5 },
        { name: '인구 밀도', uv: newScore.population ?? 5 }
      ];
      setScoreData(chartData);
    };

    fetchScore();
  }, [coords, score]);

  return (
    <div className="chart-background">

      <CustomLegend legends={LegendList} />
      <div className="chart-area">
        <div className="chart-box">
          <ResponsiveContainer width="100%" height={650}>
            <RadarChart data={scoreData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis />
              <Radar dataKey="uv" fill="#97C4A9" fillOpacity={0.6} stroke="#97C4A9" />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="gpt-background">
          <GPTReport
            address={address}
            score={score}
            preload={gpt}
            onDone={setGpt}
          />
        </div>
      </div>


    </div>
  );
};

export default InfoDetail;
