import React from 'react';
import CategoryButton from './CategoryButton';
import {CATEGORY_MAP} from "@/constants/mapDefaults.js";

const DetailList = ({ onClose, isDrag, category, setCategory }) => {
    const toggleCategory = (id) => {
        setCategory((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className={`list-popup ${isDrag ? 'drag' : ''}`}>
            <div className='list-top'>
                <p>▶ 원하는 항목을 선택해보세요 </p>
                <button id='list-close' onClick={onClose}>닫기</button>
            </div>
            <div className="custom-button-group">
                {Object.entries(CATEGORY_MAP).map(([id, { label, color }]) => (
                    <CategoryButton
                        key={id}
                        id={id}
                        label={label}
                        color={color}
                        isActive={category[id]}
                        onToggle={toggleCategory}
                    />
                ))}
            </div>
        </div>
    );
};

export default DetailList;
