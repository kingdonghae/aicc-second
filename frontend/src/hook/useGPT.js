// ✅ hooks/useGPT.js
import { useEffect, useState } from 'react';
import { fetchGPTResponse } from '@/services/GPTService';

export const useGPT = ({ address, score, preload }) => {
  const [gpt, setGpt] = useState(preload || '');
  const [loading, setLoading] = useState(!preload);

  useEffect(() => {
    if (!score || !address || (preload && preload.trim() !== '')) return;

    const prompt = `다음은 특정 지역의 생활 편의 항목별 점수입니다. 각 항목은 0~10점 만점 기준입니다.

- 교통: ${score.traffic}
- 생활 인프라: ${score.infra}
- 시세: ${score.rent}
- 치안: ${score.safety}
- 소음: ${score.noise}
- 인구 밀도: ${score.population}

아래 조건을 정확히 지켜 객관적인 지역 분석 리포트를 작성해 주세요.

조건:
1. 전체 리포트는 반드시 5문장 이내로 작성하세요.
2. 각 항목 설명마다 줄의 시작은 항상 '-' 부호로 시작하세요.
3. 각 '-' 부호 항목 사이에는 줄바꿈을 한 번씩 넣으세요 (\n).
4. 각 항목은 '항목명(점수): 설명 문장'의 형태로 간결하게 작성하세요. (예: 교통(6점): 평균적인 대중교통 접근성을 보입니다.)
5. 점수가 5~6점일 경우 짧게 언급하세요. 0점 또는 점수가 없을 경우 언급하지 마세요.
6. 마지막 문장은 반드시 거주와 연관지어 전체 지역을 평가한 종합적인 결론 문장으로 마무리하세요.
7. 문장은 차분하고 분석적인 문체를 사용하세요.`;

    const run = async () => {
      setLoading(true);
      try {
        const result = await fetchGPTResponse(prompt);
        setGpt(result);
      } catch (e) {
        setGpt('GPT 응답 실패');
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [address, score, preload]);

  return {
    gpt: gpt.replace(/\n/g, '<br>'),
    loading
  };
};
