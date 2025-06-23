import { useState } from 'react';
import MapAgain from './MapAgain';

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
                <div className='legend-box-section'>
                    <div className='legend-box'>
                        {displayLegend && (
                            <>
                                <div>{legends[displayLegend].description}
                                    <br />{legends[displayLegend].description2}
                                    <br />
                                    <span style={{ fontSize: '12px' }}>{legends[displayLegend].source}</span></div>
                            </>
                        )}
                        {!displayLegend && <div>왼쪽 아이콘을 클릭해서<br />점수 기준을 확인해보세요</div>}

                    </div>
                    <div className="legend-return">
                        <MapAgain />
                    </div>
                </div>
                <p className='legend-warn'>* 제공하는 정보는 행정동을 기준으로 하며 의사결정의 모든 책임은 사용자에게 있습니다.</p>

            </div>
        </div>
    );
};

export default CustomLegend;
