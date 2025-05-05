import React from 'react';

const categoryList = [
    { id: 'subway', label: '지하철', color: 'red' },
    { id: 'school', label: '학교', color: 'green' },
    { id: 'mart', label: '마트', color: 'blue' },
    { id: 'hospital', label: '병원', color: 'purple' }
];

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
                {categoryList.map(({ id, label, color }) => (
                    <div
                        key={id}
                        className="custom-button-frame"
                        onClick={() => toggleCategory(id)}
                        style={{
                            color: category[id] ? color : 'gray',
                        }}
                    >
                        <button
                            className="custom-button"
                            style={{
                                backgroundColor: category[id] ? color : 'gray',
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