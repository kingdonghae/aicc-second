import React, { useState } from 'react';

const categoryList = [
    { id: 'subway', label: '지하철', color: 'red' },
    { id: 'school', label: '학교', color: 'green' },
    { id: 'mart', label: '마트', color: 'blue' },
    { id: 'park', label: '공원', color: 'purple' }
];

const DetailList = ({ onClose, isDrag }) => {

    const [active, setActive] = useState({
        subway: true,
        school: true,
        mart: true,
        park: true
    });

    const toggleCategory = (id) => {
        setActive((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className={`list-popup ${isDrag ? 'drag' : ''}`}>
            <div className='list-top'>
                <p>▶ 원하는 항목을 선택해보세요 </p>
                <button id='list-close' onClick={onClose}>닫기</button>

            </div>
            <div className="custom-button-group">
                {categoryList.map(({ id, label, color }) => (
                    <div
                        key={id}
                        className="custom-button-frame"
                        onClick={() => toggleCategory(id)}
                        style={{
                            color: active[id] ? color : 'gray',
                        }}
                    >
                        <button
                            className="custom-button"
                            style={{
                                backgroundColor: active[id] ? color : 'gray',
                                border: 'none'
                            }}
                        ></button>
                        {label}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DetailList;