import React from 'react'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Searchbox from '../components/Searchbox';
import DetailList from '../components/DetailList';
import DetailPreview from '../components/DetailPreview';
import '../styles/Map.css'
import APIMap from "@/components/APIMap.jsx";

const Map = () => {
  
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
      
      {searchAddress && (
        <APIMap address={searchAddress} rerenderkey={key}/>
      )}
      {/* <APIMap address={searchAddress} rerenderKey={key}/> */}

      <div className='search-box'>
        <Searchbox
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
