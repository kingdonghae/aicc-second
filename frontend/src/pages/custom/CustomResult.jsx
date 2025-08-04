import React from 'react';
import { useCustomData } from './hook/useCustomData';
import { useNavigation } from "@/hook/useNavigation.js";
import CustomCard from './CustomCard';
import '@/styles/Custom.css';

const CustomResult = () => {
  const { selected, result } = useCustomData();
  const { goCustom, goCustomInput } = useNavigation();

  const recommendations = result?.recommendations || [];

  const hasValidResult = Array.isArray(recommendations) && recommendations.length > 0;

  return (
    <div className="custom-background">
      <div className="custom-result-area">
        <div className="custom-group">
          <div className="custom-list">
            {hasValidResult ? (
              recommendations.map((area, index) => (
                <CustomCard
                  key={area.dong || index}
                  rank={index + 1}
                  areaName={area.full_adr}
                  score={area.score}
                />
              ))
            ) : (
              <p>추천 결과가 없습니다.</p>
            )}
          </div>
          <div className="custom-menu">
            <button onClick={() => goCustomInput(selected)}>이전으로</button>
            <button onClick={() => goCustom(selected)}>처음으로 돌아가기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomResult;
