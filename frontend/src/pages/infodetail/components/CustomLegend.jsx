import React, { useState } from 'react';

const CustomLegend = ({ legends }) => {
    const [selectedLegend, setSelectedLegend] = useState(null);
    const [hoverLegend, setHoverLegend] = useState(null);


    const displayLegend = selectedLegend || hoverLegend;


    return (
        <div className="legend-background">


            <ul className="legend-container">
                {Object.entries(legends).map(([key, { icon, label }]) => (
                    <li
                        key={key}
                        className={`legend-list ${selectedLegend === key ? 'active' : ''}`}
                        onClick={() =>
                            setSelectedLegend(prev => (prev === key ? null : key))
                        }
                        onMouseEnter={() => setHoverLegend(key)}
                        onMouseLeave={() => setHoverLegend(null)}
                    >
                        {icon && <div>{icon}</div>}
                        <span className="legend-label">{label}</span>
                    </li>
                ))}
            </ul>
            <div className="legend-desc">
                <div className='legend-box'>
                    {displayLegend && legends[displayLegend].description}
                    {!displayLegend && <div>왼쪽 아이콘을 눌러<br/>점수를 확인해보세요</div>}
                </div>
                <p>안 맞을 수도 있고 다시 누르면 처음으로</p>
            </div>


        </div>
    );
};

export default CustomLegend;