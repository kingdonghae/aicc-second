// 📁 src/pages/map/MapPage.jsx
import KakaoMap from '@/pages/map/components/KakaoMap';
import SearchBox from '@/components/SearchBox';
import DetailList from '@/pages/map/components/DetailList';
import DetailPreview from '@/pages/map/components/DetailPreview';
import { useEffect } from 'react';
import { useMapController } from '@/pages/map/hook/useMapController';
import { getScore } from '@/services/ScoreService';
import { useGPT } from '@/hook/useGPT';
import { useRecoilValue, useRecoilState } from "recoil";
import { authState } from "@/atoms/authState.js";
import { analysisState } from "@/atoms/analysisState.js";
import '@/styles/Map.css';
import { useLocation } from 'react-router-dom'; // <-- 이 줄은 그대로 필요합니다.

const MapPage = () => {
  const {
    address, setAddress,
    coords, setCoords,
    showList, setShowList,
    isDrag, setIsDrag,
    category, setCategory
  } = useMapController();

  const { isLoggedIn, user } = useRecoilValue(authState);
  const [analysis, setAnalysis] = useRecoilState(analysisState);
  const location = useLocation(); // <-- 이 줄은 그대로 필요합니다.

  const { gpt: fetchedGpt, loading: gptLoading } = useGPT({
    address: analysis.address,
    score: analysis.score,
    preload: analysis.gpt
  });

  // CustomCard에서 전달받은 주소로 초기 검색을 수행하는 useEffect
  useEffect(() => {
    // location.state.address를 확인합니다.
    if (location.state?.address) {
      const initialAddressFromState = location.state.address;
      // SearchBox의 initialSearchValue prop으로 전달될 것이므로, 여기서는 직접 address 상태를 설정하지 않습니다.
      // SearchBox 내부에서 initialSearchValue를 감지하여 검색을 트리거할 것입니다.
    }
  }, [location.state?.address]); // location.state.address가 변경될 때마다 실행

  // 첫 번째 useEffect: 주소 또는 좌표가 변경될 때 점수를 가져오고 analysisState를 업데이트
  useEffect(() => {
    // 초기 로드 시 location.state.address가 있다면, 해당 주소로 강제 설정합니다.
    const currentAddressToUse = location.state?.address || address;

    if (analysis.address === currentAddressToUse && analysis.score && analysis.coords === coords) {
      return;
    }

    if (!coords?.lat || !coords?.lng || !currentAddressToUse) {
        setAnalysis({ score: null, gpt: '', address: '', coords: null });
        return;
    }

    const fetchData = async () => {
      setAnalysis(prev => ({ ...prev, score: null, gpt: '' }));
      const result = await getScore(coords.lat, coords.lng);
      setAnalysis(prev => ({
        ...prev,
        score: result,
        address: currentAddressToUse, // 현재 사용되는 주소로 업데이트
        coords: coords,
      }));
    };

    fetchData();
  }, [address, coords, location.state?.address]); // dependency array에 location.state.address 추가

  // 두 번째 useEffect: useGPT 훅에서 반환된 GPT 응답이 변경될 때 analysisState의 gpt를 업데이트
  useEffect(() => {
    if (fetchedGpt && fetchedGpt !== analysis.gpt && !gptLoading) {
      setAnalysis(prev => ({ ...prev, gpt: fetchedGpt }));
    }
  }, [fetchedGpt, gptLoading, analysis.gpt, setAnalysis]);

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
          // CustomCard에서 넘어온 주소가 있다면 그 주소를 SearchBox의 initialSearchValue로 전달합니다.
          initialSearchValue={location.state?.address} // <-- 이 줄을 수정합니다.
          onSearch={(newAddress, newCoords) => {
            setAddress(newAddress);
            setCoords(newCoords);
          }}
          user_id={isLoggedIn ? user?.user_id : null}
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
          score={analysis.score}
          gpt={analysis.gpt}
        />
      </div>
    </div>
  );
};

export default MapPage;