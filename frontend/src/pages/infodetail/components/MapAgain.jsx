import { useNavigation } from "@/hook/useNavigation";
import { useLocation } from "react-router-dom";

const MapAgain = () => {
  const { goMapWithState } = useNavigation();
  const location = useLocation();
  const { coords, address, score, gpt } = location.state || {};

  const handleClick = () => {
    if (coords && address) {
      goMapWithState(coords, address, score, gpt);
    } else {
      alert("돌아갈 데이터가 없습니다");
    }
  };

  return (
    <button onClick={handleClick} className="map-again-button">
      검색한 지도로<br/>돌아가기
    </button>
  );
};

export default MapAgain;
