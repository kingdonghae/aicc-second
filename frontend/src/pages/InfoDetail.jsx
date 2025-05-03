import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import MapIcon from '@mui/icons-material/Map';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts';
import CountUp from 'react-countup';
import '../styles/InfoDetail.css';

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
    <foreignObject x={x-10} y={y - 40} width={width+20} height={30}>
      <div className="counter-label">
        <CountUp prefix='상위 ' end={100 - value} duration={2} suffix='%' />
      </div>
    </foreignObject>
  );
};


const InfoDetail = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  
  const toggleMenu = () => {
    setMenu(prev => !prev )
  }
  return (
    <div className='chart-background'>
      <div className='menu-box'>
        <button className='menu-button' onClick={()=>navigate('/')}><HomeIcon/></button>
        <button className='menu-button' onClick={toggleMenu}><MenuIcon/></button>
      </div>
      {menu &&
      <nav className='menu-popup'>
        <ul className='menu-group'>
          <li className='menu-list' onClick={()=>navigate('/map')}><button><MapIcon style={{ fontSize: '2.5rem' }}/>지도 보기</button></li>
          <li className='menu-list' onClick={()=>navigate('/rank')}><button><TrendingUpIcon style={{ fontSize: '2.5rem' }}/>검색 순위</button></li>
          <li className='menu-list'onClick={()=>navigate('/board')}><button><Diversity3Icon style={{ fontSize: '2.5rem' }}/>정보 마당</button></li>
        </ul>
      </nav>}
      {/* <header className='chart-header'>헤더 끝선</header> */}
      <div className='address-info'>당신의 주소는 수도권 상위 00%입니다. 좋은 곳으로 이사 가지 그랬어요.</div>
      <p>본 기준은 점수 기준표에 의해 판단된 겁니다. 뭐 버튼 하나 넣어서 팝업 띄우는 건 제 꿈 아님 걍 한 줄로 설명해요</p>

      <div className='chart-area'>
        <div className='chart-box'>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} style={{backgroundColor: '#FFFFFF'}} margin={{top: 50, bottom : 50}}>
              <XAxis dataKey="name" dy={10}/>
              <Bar
                dataKey="uv"
                fill="#6EA8DC"
                barSize={150}
                stroke='#6EA8DC'
                strokeLinecap='round'
                animationDuration={1000}
                animationBegin={0}
                label={renderLabel}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default InfoDetail;
