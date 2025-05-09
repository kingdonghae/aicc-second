import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import CountUp from 'react-countup';
import CustomLegend from './components/CustomLegend';
import InfoGPT from './components/InfoGPT';
import '@/styles/InfoDetail.css';

const data = [
    { name: '🚗교통', uv: 90 },
    { name: '🌳생활 인프라', uv: 75 },
    { name: '💰시세', uv: 10 },
    { name: '👨‍✈️치안', uv: 85 },
    { name: '🔊소음', uv: 40 },
    { name: '👩‍👩‍👧‍👦인구 밀도', uv: 55 },
];

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
    return (
        <div className='chart-background'>
            <InfoGPT/>

            <div className='chart-area'>
                <div className='chart-box'>
                    <ResponsiveContainer
                        width="100%"
                        height={800}>
                        <RadarChart
                            data={data}
                            style={{ backgroundColor: '#FFFFFF' }}
                            // margin={{ top: 5, bottom: 5 }}
                            strokeLinecap='round'>
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
                <CustomLegend/>
            </div>
        </div>
    );
};

export default InfoDetail;