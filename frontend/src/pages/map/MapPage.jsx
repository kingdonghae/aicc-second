import React, { useState, useEffect } from 'react';
import '@/styles/Map.css';
import KakaoMap from '@/pages/map/components/KakaoMap';
import SearchBox from '@/components/SearchBox';
import DetailList from '@/pages/map/components/DetailList';
import DetailPreview from '@/pages/map/components/DetailPreview';
import { useMapController } from '@/pages/map/hook/useMapController';
import { getScore } from '@/service/ScoreService';
import { useGPT } from '@/hook/useGPT';

const MapPage = () => {
  const {
    address, setAddress,
    coords, setCoords,
    showList, setShowList,
    isDrag, setIsDrag,
    category, setCategory
  } = useMapController();

  const [score, setScore] = useState(null);
  const { gpt } = useGPT({ address, score });

  useEffect(() => {
    if (!coords?.lat || !coords?.lng || !address) return;

    const fetchData = async () => {
      const result = await getScore(coords.lat, coords.lng);
      setScore(result);
    };

    fetchData();
  }, [coords, address]);

  return (
    <div className="mapbackground">
      <KakaoMap
        address={address}
        coords={coords}
        category={category}
        onDragStart={() => setIsDrag(true)}
        onDragEnd={() => setIsDrag(false)}
        setCoords={setCoords}
      />

      <div className="search-position">
        <SearchBox
          defaultValue={address}
          onSearch={(newAddress, newCoords) => {
            setAddress(newAddress);
            setCoords(newCoords);
          }}
        />
      </div>

      {!showList && (
        <button className="toggle-list-button" onClick={() => setShowList(true)}>
          항목<br />보기
        </button>
      )}
      {showList && (
        <div className="list-box">
          <DetailList
            isDrag={isDrag}
            onClose={() => setShowList(false)}
            category={category}
            setCategory={setCategory}
          />
        </div>
      )}

      <div className="preview-box">
        <DetailPreview
          isDrag={isDrag}
          address={address}
          coords={coords}
          score={score}
          gpt={gpt}
        />
      </div>
    </div>
  );
};

export default MapPage;
