import React from 'react';
import { useNavigation } from "@/hook/useNavigation.js";
import { itemData } from '@/constants/itemData';
import { useCustomData } from './hook/useCustomData';
import { customSubmit } from './services/customService';
import { useRequireLoginAction } from "@/hook/useRequireLoginAction";


const CustomInput = () => {

    useRequireLoginAction(true);

    const { goCustom, goCustomResult } = useNavigation();
    const { selected, inputs, handleChange } = useCustomData();

    return (
        <div className='custom-background'>
            <div className='custom-area'>
                <p>어떤 집을 원하나요?</p>
                <ul>
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
                </ul>
                <button onClick={() => goCustom(selected)}>이전으로</button>
                <button
                    onClick={() => customSubmit({ selectedItem: selected, inputs, goCustomResult })}
                >다음으로</button>
            </div>
        </div>
    )
}

export default CustomInput
