import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import MapIcon from '@mui/icons-material/Map';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { useLocation } from 'react-router-dom';
import SearchBox from '../components/SearchBox';
import DetailList from '../components/DetailList';
import DetailPreview from '../components/DetailPreview';
import APIMap from "@/components/APIMap.jsx";
import '../styles/Map.css'

const Map = () => {

  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  
  const toggleMenu = () => {
    setMenu(prev => !prev )
  }
  
  const [showList, setShowList] = useState(true);
  const [address, setAddress] = useState('');
  const [searchAddress, setSearchAddress] = useState('');
  const [rerenderKey, setRerenderKey] = useState(Date.now());


  const location = useLocation();
  const key = location.key || new Date().getTime();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const addressUrl = searchParams.get('address') || '';
    if (addressUrl) {
      setAddress(addressUrl);
      setSearchAddress(addressUrl);
    }
  }, [location.search]);
  

  return (
    <div className="mapbackground">
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
      
      {searchAddress && (
        <APIMap address={searchAddress} rerenderkey={key}/>
      )}
      {/* <APIMap address={searchAddress} rerenderKey={key}/> */}

      <div className='search-box'>
        <SearchBox
        inputValue={address}
        setInputValue={setAddress}
        onSearch={(value) => {
          setAddress(value);
          setRerenderKey(Date.now());
        }}/></div>

      {!showList && (<button className='toggle-list-button' onClick={() => setShowList((prev) => !prev)}>항목<br/>보기</button>)}
      {showList && (<div className='list-box'><DetailList onClose={()=> setShowList(false)}/></div>)}

      <div className='preview-box'><DetailPreview/></div>
      
    </div>
  
  
  )
}

export default Map;
