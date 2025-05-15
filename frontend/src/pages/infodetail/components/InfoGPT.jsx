import React, { useState, useEffect } from 'react'
import { fetchGPTResponse } from '../service/GPTService';

const InfoGPT = ({address, score}) => {

  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!score) return;
    const prompt = `
        다음은 특정 지역의 생활 편의 항목별 점수입니다. 각 항목은 0~10점 만점 기준입니다.
        
        - 위치: ${address}
        - 교통: ${score.traffic}
        - 생활 인프라: ${score.infra}
        - 시세: ${score.rent}
        - 치안: ${score.cctv}
        - 소음: ${score.noise}
        - 인구 밀도: ${score.population}
        
        이 데이터를 바탕으로 해당 지역의 전반적인 생활 여건에 대한 분석 리포트를 작성해 주세요.
        
        조건:
        1. 전체적으로 5문장 이내로 간결하게 작성해 주세요.
        2. 각 항목(교통, 인프라, 시세, 치안, 소음, 인구 밀도)에 대한 점수 언급을 포함해 주세요 
        3. 5~6점일 경우, 짧게 언급하고, 데이터가 없을 경우 언급하지 말아주세요.  
        4. 각 항목마다 앞에 부호 (ex -)를 붙여주세요. 
        5. '-' 부호를 기준으로 줄바꿈을 해주세요.줄바꿈은 두번씩 해주세요. (ex <br><br>)
        6. 문장은 자연스럽고 객관적인 평가 위주로 작성해 주세요.
        7. 마지막 문장은 전체적인 종합 평가로 마무리해 주세요.
        8. 최대 400자 이내로 작성해주세요. 
        `;

    const handleAskGPT = async () => {
      setLoading(true);
      try {
        const reply = await fetchGPTResponse(prompt);
        setResponse(reply);
      } catch (error) {
        setResponse('GPT 응답 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };
    handleAskGPT();
  },[score])

  return (
    <div className='gpt-background'>
        <div className='gpt-box'>
          <h2>{address}</h2>
          <div className='gpt-talk'
           dangerouslySetInnerHTML={{ __html: loading ? 'GPT가 분석 중입니다...' : response }}/>
        </div>
    </div>
  )
}

export default InfoGPT
