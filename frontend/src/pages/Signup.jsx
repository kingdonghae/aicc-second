import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import MapIcon from '@mui/icons-material/Map';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Diversity3Icon from '@mui/icons-material/Diversity3';

import { signup, checkUserid } from '../features/signup/services/SignupService';

import '../styles/Signup.css';

const Signup = () => {

    const navigate = useNavigate();
    const [menu, setMenu] = useState(false);

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

    const [useridMessage, setUseridMessage] = useState('');
    const [isUseridAvailable, setIsUseridAvailable] = useState(false);

    const toggleMenu = () => setMenu(prev => !prev);

    const handleCheckUserid = async () => {
        if (!userid) {
            setUseridMessage("아이디를 입력해주세요.");
            setIsUseridAvailable(false);
            return;
        }
    
        try {
            const res = await checkUserid(userid); // ✅ 서비스 호출
            if (res.available) {
                setUseridMessage("✅ 사용 가능한 아이디입니다.");
                setIsUseridAvailable(true);
            } else {
                setUseridMessage("❌ 이미 존재하는 아이디입니다.");
                setIsUseridAvailable(false);
            }
        } catch (err) {
            setUseridMessage("⚠️ 중복 확인 중 오류 발생");
            setIsUseridAvailable(false);
        }
    };

    const handleAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                setAddress(data.address);
            },
        }).open();
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        const fullAddress = `${address} ${detailAddress}`.trim();

        const userData = {
            userid,
            username,
            password,
            birthdate,
            phone_number: phone,
            email,
            address: fullAddress,
            agree_privacy: agreePrivacy ? 1 : 0,
        };

        try {
            const result = await signup(userData); // ✅ 서비스 호출
            alert(result.message || '회원가입 성공');
            navigate('/'); // 회원가입 후 홈으로 이동
        } catch (errorMessage) {
            alert(errorMessage);
        }
    };

    return (
        <div className="background">
            <button className='home-menu' onClick={() => navigate('/')}>집PT</button>
            <div className='menu-box'>
                {/* <button className='menu-button' onClick={()=>navigate('/')}><HomeIcon/></button> */}
                <button className='menu-button' onClick={toggleMenu}><MenuIcon /></button>
            </div>
            {menu &&
                <nav className='menu-popup'>
                    <ul className='menu-group'>
                        <li className='menu-list' onClick={() => navigate('/map')}><button><MapIcon style={{ fontSize: '2.5rem' }} />지도 보기</button></li>
                        <li className='menu-list' onClick={() => navigate('/rank')}><button><TrendingUpIcon style={{ fontSize: '2.5rem' }} />검색 순위</button></li>
                        <li className='menu-list' onClick={() => navigate('/board')}><button><Diversity3Icon style={{ fontSize: '2.5rem' }} />정보 마당</button></li>
                    </ul>
                </nav>}
            <form className="signup-form" onSubmit={handleSignup}>

                <div className="input-group">
                    <input
                        type="text"
                        placeholder="아이디 입력 (6~20자)"
                        value={userid}
                        onChange={(e) => {
                            setUserid(e.target.value);
                            setIsUseridAvailable(false); // 아이디 바꾸면 다시 검사 필요
                            setUseridMessage('');
                        }}
                        required
                    />
                    <button type="button" className="check-button" onClick={handleCheckUserid}>
                        중복 확인
                    </button>
                </div>

                <p className={`message ${isUseridAvailable ? 'success' : 'error'}`}>
                    {useridMessage}
                </p>

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
                        max={new Date().toISOString().split('T')[0]}  // 오늘까지만 선택 가능
                        required
                    />
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
                        readOnly required />
                    <button type="button" className="check-button" onClick={handleAddressSearch}>주소 검색</button>
                </div>
                <input
                    type="text"
                    placeholder='상세 주소를 입력해주세요'
                    value={detailAddress}
                    onChange={(e) => setDetailAddress(e.target.value)}
                    id='detail-address' />


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