import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import MapIcon from '@mui/icons-material/Map';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import '../styles/Signup.css';

const Signup = () => {

  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu(prev => !prev )
  }

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let mainAddress = data.address;
        setAddress(mainAddress);
      },
    }).open();
  }
  
  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const fullAddress = `${address} ${detailAddress}`.trim();

    const response = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userid, username, password, birthdate, phone_number: phone, email, address: fullAddress, agree_privacy: agreePrivacy ? 1 : 0,
      }),
    });

    const result = await response.json();
    alert(result.message || result.error);

  }

  return (
    <div className="background">
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
      <form className="signup-form" onSubmit={handleSignup}>

        <div className="input-group">
          <input
            type="text" 
            placeholder="아이디 입력 (6~20자)" 
            value={userid}
            onChange={(e) => setUserid(e.target.value)}
            required />
          <button type="button" className="check-button">중복 확인</button>
        </div>

        <input 
          type="password" 
          placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 8~20자)" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required />
        <input 
          type="password" 
          placeholder="비밀번호 재입력" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required />
        <input 
          type="text" 
          placeholder="이름을 입력해주세요." 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required />

        <div className="birth-group">
          <input 
            type="date" 
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            required />
        </div>
        
        <input 
          type="text" 
          placeholder="휴대폰 번호 입력 ('-' 제외 11자리 입력)" 
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required />
        <input 
          type="email" 
          placeholder="email@example.com" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required />

        <div className="input-group">
          <input 
            type="text" id='address' 
            placeholder="주소를 검색해주세요" 
            value={address}
            onClick={handleAddressSearch}
            readOnly required/>
          <button type="button" className="check-button" onClick={handleAddressSearch}>주소 검색</button>
        </div>
        <input 
          type="text" 
          placeholder='상세 주소를 입력해주세요' 
          value={detailAddress}
          onChange={(e) => setDetailAddress(e.target.value)}
          id='detail-address'/>
          

        <div className="check-box">
        <p>개인정보 활용에 동의하십니까?</p>
        <input 
          type="checkbox"
          checked={agreePrivacy}
          onChange={(e) => setAgreePrivacy(e.target.checked)}
          required />
        </div>

        <button type="submit" className="submit-button">가입하기</button>
      </form>
    </div>
  );
};

export default Signup;
