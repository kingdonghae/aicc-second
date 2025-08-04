// CustomInput.jsx
import React from 'react';
import { useNavigation } from "@/hook/useNavigation.js";
import { useCustomData } from './hook/useCustomData'; // useCustomData 훅 import 확인
import { customSubmit } from './services/customService';

const CustomInput = () => {
    const { goCustom, goCustomResult } = useNavigation();
    // inputs 객체와 handleChange 함수를 useCustomData 훅에서 가져옵니다.
    const { selected, inputs, handleChange } = useCustomData();

    return (
        <div className='custom-background'>
            <div className='custom-area'>
                <p>어떤 집을 원하나요?</p>
                <div className='custom-example'>예시 : 조용하고 사람 안 사는 곳이 좋아요
                    <br/>지하철역과 가까웠으면 좋겠어요
                    <br/> 정말정말 안전했으면 좋겠어요. 학교도 가까우면 좋고.
                </div>
                {/* 🚨 이 input 태그를 수정합니다 🚨 */}
                <input
                    type="text"
                    className='custom-user-input'
                    placeholder='어떤 집을 원하시는지 입력해주세요'
                    // value 속성을 inputs.userText에 연결합니다.
                    // inputs.userText가 아직 정의되지 않았을 경우를 대비하여 빈 문자열로 폴백합니다.
                    value={inputs.userText || ''}
                    // onChange 이벤트를 사용하여 사용자 입력 시 inputs 상태를 업데이트합니다.
                    // 'userText'는 백엔드에서 inputs.get("userText")로 접근하는 키입니다.
                    onChange={(e) => handleChange('userText', e.target.value)}
                />
                <div>
                    <button onClick={() => goCustom(selected)}>이전으로</button>
                    <button
                        onClick={() => customSubmit({ selectedItem: selected, inputs, goCustomResult })}
                    >다음으로</button>
                </div>
            </div>
        </div>
    )
}

export default CustomInput;