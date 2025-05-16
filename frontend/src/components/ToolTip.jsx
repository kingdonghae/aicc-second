import React from 'react';
import { Tooltip } from 'react-tooltip';

const ToolTip = () => {
    return (
        <div className='help-tooltip'>
            {/* <button>
                <img src="/logo_house.png" alt="" />
            </button> */}
            <div className='tooltip-icon'>
                <a id="clickable">❁´◡`❁</a>
                <Tooltip anchorSelect="#clickable" clickable style={{ width: '10rem', margin: '0.5rem' }}>
                    <button className='tooltip-message'>
                        안녕하세요? 반가워요.
                    </button>
                </Tooltip>

            </div>
            <div className='tooltip-info'>저희 페이지에 처음 오셨나요?</div>
        </div>
    )
}

export default ToolTip
