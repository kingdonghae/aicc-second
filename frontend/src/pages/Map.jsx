import React from 'react'
import { useState } from 'react';
import APIMap from '../components/APIMap';
import Searchbox from '../components/Searchbox';
import DetailList from '../components/DetailList';
import DetailPreview from '../components/DetailPreview';
import '../styles/Map.css'

const Map = () => {
  
  const [showList, setShowList] = useState(true)
  

  return (
    <div className="mapbackground">

      <div id="map"><APIMap/></div>

      <div className='search-box'><Searchbox/></div>

      {!showList && (<button className='toggle-list-button' onClick={() => setShowList((prev) => !prev)}>항목<br/>보기</button>)}
      {showList && (<div className='list-box'><DetailList onClose={()=> setShowList(false)}/></div>)}

      <div className='preview-box'><DetailPreview/></div>
      
    </div>
  
  
  )
}

export default Map;
