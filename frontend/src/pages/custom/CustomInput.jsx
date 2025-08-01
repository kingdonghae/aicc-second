import React from 'react';
import { useNavigation } from "@/hook/useNavigation.js";
// import { itemData } from '@/constants/itemData';
import { useCustomData } from './hook/useCustomData';
import { customSubmit } from './services/customService';
// import { useRequireLoginAction } from "@/hook/useRequireLoginAction";


const CustomInput = () => {

    // useRequireLoginAction(true);

    const { goCustom, goCustomResult } = useNavigation();
    const { selected, inputs } = useCustomData();

    return (
        <div className='custom-background'>
            <div className='custom-area'>
                <p>어떤 집을 원하나요?</p>
                <div className='custom-example'>예시 : 조용하고 사람 안 사는 곳이 좋아요
                    <br/>지하철역과 가까웠으면 좋겠어요
                    <br/> 정말정말 안전했으면 좋겠어요. 학교도 가까우면 좋고.
                </div>
                <input type="text" className='custom-user-input' placeholder='어떤 집을 원하시는지 입력해주세요'/>
                {/* <ul>
                    {selected.map((id) => {
                        const { icon: Icon, label } = itemData[id];
                        return (
                            <li className="custom-selection"
                                key={id}>
                                <span><Icon />{label}</span>
                                <input type="text"
                                    value={inputs[id] ?? ''}
                                    onChange={(e) => handleChange(id, e.target.value)} />
                            </li>
                        )
                    })}
                </ul> */}
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

export default CustomInput
