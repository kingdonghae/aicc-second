import React from 'react';
import { useNavigation } from "@/hook/useNavigation.js";
import { itemData } from '@/constants/itemData';
import { useCustomSelection } from './hook/useCustomSelection';
import '@/styles/Custom.css';



const CustomInput = () => {

    const { goCustom } = useNavigation();

    const selected = useCustomSelection();

    return (
        <div className='custom-background'>
            <div className='custom-area'>
                <p>어떤 집을 원하나요?</p>
                <ul>
                    {selected.map((id) => {
                        const { icon: Icon, label } = itemData[id];
                        return (
                            <li className="custom-selection">
                                <span><Icon />{label}</span>
                                <input type="text" />
                            </li>
                        )
                    })}
                </ul>
                <p onClick={() => goCustom(selected)}>이전으로</p>
            </div>
        </div>
    )
}

export default CustomInput
