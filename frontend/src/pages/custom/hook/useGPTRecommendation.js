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
- 학교: ${score.school}


이 점수를 기반으로 '${areaName}'이 추천되었습니다.

조건:
1. 추천 이유를 3문장, 200자 내외로 작성하세요. 단, 점수 언급은 하지 마세요.
2. 점수 중 높거나 특징적인 항목을 중심으로 설명하세요.
3. ${areaName} 전체가 아니라, 앞에 시와 구를 제외하고 동만 주어로 설정하세요.
4. 설명은 간결하고 분석적인 한국어 문체로 작성하세요.
5. 점수가 중간(5~6점)인 항목은 간단히 언급하거나 생략하세요.
6. 점수가 낮거나 개선이 필요한 부분은 언급하지 마세요.`;

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
