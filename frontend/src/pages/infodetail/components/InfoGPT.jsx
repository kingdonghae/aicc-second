import React, { useState, useEffect } from 'react'
import { fetchGPTResponse } from '../service/GPTService';

const InfoGPT = () => {

  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(true); // 초기부터 로딩 시작

  const handleAskGPT = async () => {
    try {
      const reply = await fetchGPTResponse('한국의 수도는 어디일까요?');
      setResponse(reply);
    } catch (error) {
      setResponse('GPT 응답 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ 컴포넌트 마운트 시 자동 실행
  useEffect(() => {
    handleAskGPT();
  }, []);

  return (
    <div className='gpt-background'>
        <div className='gpt-box'>
          <h2>여기가 주소 자리입니다</h2>
          <div className='gpt-talk'>{loading ? 'GPT가 생각 중...' : response}</div>
        </div>
    </div>
  )
}

export default InfoGPT