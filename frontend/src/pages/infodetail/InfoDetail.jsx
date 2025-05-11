import { useState, useEffect } from 'react';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis,
    PolarRadiusAxis, ResponsiveContainer
} from 'recharts';
import CountUp from 'react-countup';
import CustomLegend from './components/CustomLegend';
import InfoGPT from './components/InfoGPT';
import { getSearchScore } from './service/ScoreService';
import '@/styles/InfoDetail.css';

const renderLabel = ({ x, y, width, value }) => {
    return (
        <foreignObject x={x - 10} y={y - 40} width={width + 20} height={30}>
            <div className="counter-label">
                <CountUp prefix='상위 ' end={100 - value} duration={2} suffix='%' />
            </div>
        </foreignObject>
    );
};

const InfoDetail = () => {
    const [scoreData, setScoreData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const score = await getSearchScore(37.5665, 126.9780);
            const chartData = [
                { name: '🚗교통', uv: score.traffic },
                { name: '🌳생활 인프라', uv: score.infrastructure },
                { name: '💰시세', uv: score.price },
                { name: '👨‍✈️치안', uv: score.safety },
                { name: '🔊소음', uv: score.noise },
                { name: '👩‍👩‍👧‍👦인구 밀도', uv: score.population },
            ];
            setScoreData(chartData);
        };
        fetchData();
    }, []);

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
                                label={renderLabel}
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
