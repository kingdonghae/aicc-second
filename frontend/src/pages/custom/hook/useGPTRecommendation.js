import { useEffect, useState } from 'react';
import { fetchGPTResponse } from '@/services/GPTService';


export const useGPTRecommendation = ({ score, areaName }) => {
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!score || !areaName) return;

    const prompt = `당신은 지역 추천 전문가입니다.
다음은 사용자의 선호도를 수치화한 점수입니다 (0~10점 기준):

- 교통: ${score.traffic}
- 상권: ${score.amenities}
- 시세: ${score.rent}
- 치안: ${score.safety}
- 소음: ${score.noise}
- 인구 밀도: ${score.population}
- 학교: ${score.facility}
- CCTV: ${score.cctv}

이 점수를 기반으로 '${areaName}'이 추천되었습니다.

조건:
1. 추천 이유를 3문장 이내로 작성하세요.
2. 점수 중 높거나 특징적인 항목을 중심으로 설명하세요.
3. 설명은 간결하고 분석적인 한국어 문체로 작성하세요.
4. 점수가 중간(5~6점)인 항목은 점수를 언급하진 말고, 간단히 언급하거나 생략하세요.`;

    const run = async () => {
      setLoading(true);
      try {
        const result = await fetchGPTResponse(prompt);
        setReason(result);
      } catch (e) {
        setReason('GPT 응답 실패');
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [score, areaName]);

  return {
    reason: reason.replace(/\n/g, '<br />'),
    loading
  };
};
