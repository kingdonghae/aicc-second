import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import MapIcon from '@mui/icons-material/Map';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import SearchBox from '../components/SearchBox';
import DetailList from '../components/DetailList';
import DetailPreview from '../components/DetailPreview';
import APIMap from "@/components/APIMap.jsx";
import '../styles/Map.css';

const Map = () => {
    const navigate = useNavigate();
    const menuRef = useRef();

    const [menu, setMenu] = useState(false);
    const [showList, setShowList] = useState(true);
    const [address, setAddress] = useState('');
    const [searchAddress, setSearchAddress] = useState('');
    const [rerenderKey, setRerenderKey] = useState(Date.now());
    const [isDrag, setIsDrag] = useState(false);
    const [category, setCategory] = useState({
        subway: true,
        school: true,
        mart: true,
        hospital: true
    })

    const location = useLocation();
    const key = location.key || new Date().getTime();

    const toggleMenu = () => {
        setMenu(prev => !prev)
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menu && menuRef.current && !menuRef.current.contains(e.target)) {
                setMenu(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [menu]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const addressUrl = searchParams.get('address') || '';
        if (addressUrl) {
            setAddress(addressUrl);
            setSearchAddress(addressUrl);
        }
    }, [location.search]);

    const handleNavigateMap = () => {
        setSearchAddress('');
        setAddress('');
        setShowList(true);
        setIsDrag(false);
        setRerenderKey(Date.now());
        navigate('/map');
    };


    return (
        <div className="mapbackground">
            <button className='home-menu' onClick={() => navigate('/')}>집PT</button>
            <div className='menu-box'>

                <button className='menu-button' onClick={() => navigate('/mypage')}><PersonIcon /></button>
                <button className='menu-button' onClick={() => navigate('/')}><LogoutIcon /></button>
                {/* <button className='menu-button' onClick={()=>navigate('/')}>Login</button> */}

                <button className='menu-button'
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleMenu();
                    }}><MenuIcon /></button>
            </div>
            {menu &&
                <nav className='menu-popup' ref={menuRef}>
                    <ul className='menu-group'>
                        <li className='menu-list' id='menu-select' onClick={handleNavigateMap}><button><MapIcon style={{ fontSize: '2.5rem' }} />지도 보기</button></li>
                        <li className='menu-list' onClick={() => navigate('/rank')}><button><TrendingUpIcon style={{ fontSize: '2.5rem' }} />검색 순위</button></li>
                        <li className='menu-list' onClick={() => navigate('/board')}><button><Diversity3Icon style={{ fontSize: '2.5rem' }} />정보 마당</button></li>
                    </ul>
                </nav>}

            {searchAddress && (
                <APIMap
                    address={searchAddress}
                    rerenderkey={key}
                    category={category}
                    onDragStart={() => {
                        setIsDrag(true);
                        setMenu(false)
                    }}
                    onDragEnd={() => setIsDrag(false)} />
            )}
            {/* <APIMap address={searchAddress} rerenderKey={key}/> */}

            <div className='search-box'>
                <SearchBox
                    inputValue={address}
                    setInputValue={setAddress}
                    onSearch={(value) => {
                        setAddress(value);
                        setRerenderKey(Date.now());
                    }} />
            </div>

            {!showList &&
                (<button className='toggle-list-button' onClick={() => setShowList((prev) => !prev)}>항목<br />보기</button>)}
            {showList && (<div className='list-box'>
                <DetailList
                    onClose={() => setShowList(false)}
                    isDrag={isDrag}
                    category={category}
                    setCategory={setCategory} /></div>)}

            <div className='preview-box'><DetailPreview /></div>

        </div>


    )
}

export default Map;