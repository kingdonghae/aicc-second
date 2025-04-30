import React from 'react'
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import APIMap from '../components/APIMap';
import Searchbox from '../components/Searchbox';
import DetailList from '../components/DetailList';
import DetailPreview from '../components/DetailPreview';
import '../styles/Map.css'

const Map = () => {
  
  const [showList, setShowList] = useState(true);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const address = searchParams.get('address');
  const key = location.key;
  

  return (
    <div className="mapbackground">

      <APIMap address={address} rerenderKey={key}/>

      <div className='search-box'><Searchbox/></div>

      {!showList && (<button className='toggle-list-button' onClick={() => setShowList((prev) => !prev)}>항목<br/>보기</button>)}
      {showList && (<div className='list-box'><DetailList onClose={()=> setShowList(false)}/></div>)}

      <div className='preview-box'><DetailPreview/></div>
      
    </div>
  
  
  )
}

export default Map;
