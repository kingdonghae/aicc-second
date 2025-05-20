
import React, { useEffect } from "react";
import { useGPT } from "@/hook/useGPT";

const GPTReport = ({ address, score, preload, onDone }) => {
  const { gpt, loading } = useGPT({ address, score, preload });

  useEffect(() => {
    if (!loading && gpt && onDone) onDone(gpt);
  }, [gpt, loading]);

  return (
    <div className="gpt-box">
      <h2>{address}</h2>
      <div
        className="gpt-talk"
        dangerouslySetInnerHTML={{
          __html: loading ? 'GPT가 분석 중입니다...' : gpt
        }}
      />
    </div>
  );
};

export default GPTReport;
