// MapPage.jsx
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

  // useGPT 훅 호출: analysisState에서 필요한 값을 전달
  // useGPT는 내부적으로 GPT 응답을 관리하고 반환합니다.
  const { gpt: fetchedGpt, loading: gptLoading } = useGPT({
    address: analysis.address,
    score: analysis.score,
    preload: analysis.gpt
  });

  // 첫 번째 useEffect: 주소 또는 좌표가 변경될 때 점수를 가져오고 analysisState를 업데이트
  useEffect(() => {
    // 현재 주소와 이미 분석된 주소가 일치하고, 점수가 이미 있다면 API 호출을 건너뜁니다.
    if (analysis.address === address && analysis.score) {
      return;
    }

    if (!coords?.lat || !coords?.lng || !address) {
      // 주소나 좌표가 없으면 analysisState를 초기화합니다.
      setAnalysis({ score: null, gpt: '', address: '', coords: null });
      return;
    }

    const fetchData = async () => {
      // 새로운 분석을 시작할 때 이전 분석 결과를 초기화 (GPT는 useGPT에서 다시 로드될 것임)
      setAnalysis(prev => ({ ...prev, score: null, gpt: '' }));
      const result = await getScore(coords.lat, coords.lng);
      // 점수와 현재 주소/좌표를 analysisState에 저장합니다.
      setAnalysis(prev => ({
        ...prev,
        score: result,
        address: address,
        coords: coords,
      }));
    };

    fetchData();
  }, [address, coords]);

  // 두 번째 useEffect: useGPT 훅에서 반환된 GPT 응답이 변경될 때 analysisState의 gpt를 업데이트
  useEffect(() => {
    // fetchedGpt가 존재하고, 현재 analysisState의 gpt와 다르고, GPT 로딩 중이 아닐 때만 업데이트
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
          score={analysis.score} // Recoil 상태에서 가져온 score
          gpt={analysis.gpt}     // Recoil 상태에서 가져온 gpt
        />
      </div>
    </div>
  );
};

export default MapPage;