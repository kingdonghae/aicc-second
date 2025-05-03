import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import MapIcon from '@mui/icons-material/Map';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import '../styles/Login.css';

const Login = () => {

  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu(prev => !prev )
  }

  return (
    <div id='background'>
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
      
      <div id='house'>
        <div id='login-box'>
          <div id='login'>
            <h2>로그인</h2>
            <input type="text" placeholder='아이디를 입력하세요.'/>
            <input type="password" placeholder='비밀번호를 입력하세요.' id='login-password'/>
            <span></span>
            <button>로그인</button>
            <button>회원가입</button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login
