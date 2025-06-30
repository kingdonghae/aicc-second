import React from 'react';
import { itemData } from '@/constants/itemData';
import { useCustomData } from './hook/useCustomData';
import { useRequireLoginAction } from "@/hook/useRequireLoginAction";
import '@/styles/Custom.css';


const CustomResult = () => {

    useRequireLoginAction(true);

    const { selected, inputs, result } = useCustomData();

    return (
        <div className="custom-background">
            <div className="custom-result-area">
                <div className='custom-group'>
                    <div className='custom-list'>
                        <div className='custom-card'>
                            <h1>1순위</h1>
                            <div className='custom-map'></div>
                            <ul className='result-container'>
                                {selected.map((id) => {
                                    const { icon: Icon, label } = itemData[id];
                                    return (
                                        <li className="selected-result"
                                            key={id}>
                                            <span><Icon />{label}</span>
                                            <p>{inputs[id]}</p>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div className='custom-card'>
                            <h1>2순위</h1>
                            <div className='custom-map'></div>
                            <ul className='result-container'>
                                <li className="selected-result">
                                    <span>총합 점수</span>
                                    <p>{result?.totalScore}</p>
                                </li>
                                <li className="selected-result">
                                    <span>입력 수</span>
                                    <p>{result?.inputCount}</p>
                                </li>
                                <li className="selected-result">
                                    <span>메시지</span>
                                    <p>{result?.message}</p>
                                </li>
                            </ul>
                        </div>
                        <div className='custom-card'>
                            <h1>3순위</h1>
                            <div className='custom-map'></div>
                            <ul className='result-container'>
                                <li className="selected-result">
                                    <span>label</span><p>지하철역</p></li>
                                <li className="selected-result">
                                    <span>label</span><p>지하철역</p></li>
                                <li className="selected-result">
                                    <span>label</span><p>안전해요~</p></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CustomResult
