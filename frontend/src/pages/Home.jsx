import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import MapIcon from '@mui/icons-material/Map';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import '../styles/Home.css';

const Home = () => {
    const navigate = useNavigate();
    const [address, setAddress] = useState('');
    // const [isLogin, setIsLogin] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!address.trim()) {
            alert('주소를 입력해주세요.');
            return;
        }

        const checkAddress = () => {
            if (window.kakao && window.kakao.maps) {
                window.kakao.maps.load(checkRealAddress);
            } else {
                const script = document.createElement('script');
                script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAOMAP_KEY}&autoload=false&libraries=services`;
                script.async = true;
                script.onload = () => window.kakao.maps.load(checkRealAddress);
                document.head.appendChild(script);
            }
        };

        const checkRealAddress = () => {
            const geocoder = new window.kakao.maps.services.Geocoder();
            geocoder.addressSearch(address.trim(), (result, status) => {
                if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
                    navigate(`/map?address=${encodeURIComponent(address.trim())}&key=${Date.now()}`);
                } else {
                    alert('정확한 주소를 입력해주세요!');
                }
            });
        };
        checkAddress();
    };

    const goMap = () => {
        navigate('./map?address=서울특별시(test)')
    }

    return (
        <div>
            <section id='top'>
                <header id='main-header'>
                    <div className='menu-box'>
                        <button className='menu-button' onClick={() => navigate('/mypage')}><PersonIcon /></button>
                        <button className='menu-button' onClick={() => navigate('/')}><LogoutIcon /></button>
                        {/* <button className='menu-button' onClick={()=>navigate('/')}>Login</button> */}
                    </div>
                    <h1 id='main-title'>집PT</h1>
                    <p>Zip Place Tool</p>

                </header>

                <form id='main-input-box' onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='주소를 입력해주세요.'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                    />
                    <button id='input-button' type='submit'><SearchIcon /></button>
                </form>
                <p>e.g. 서울시 영등포구 선유서로 │ 검색 불가 : 코드랩 아카데미, 서울시청</p>
            </section>

            <section id='bottom'>
                <div id='button-box'>
                    <div>
                        <button onClick={goMap} ><MapIcon style={{ fontSize: '3rem' }} /></button>
                        <p>지도 보기</p>
                    </div>
                    <div>
                        <button onClick={() => navigate('/rank')}><TrendingUpIcon style={{ fontSize: '3rem' }} /></button>
                        <p>검색 순위 보기</p>
                    </div>
                    <div>
                        <button><Diversity3Icon style={{ fontSize: '3rem' }} /></button>
                        <p>정보마당</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;