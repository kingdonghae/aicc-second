import React from 'react'
import { useNavigate } from 'react-router-dom';

const DetailPreview = () => {
    const navigate = useNavigate();

    return (
        <div className='preview-popup'>
            <div className='preview-text-frame'>
                <p>이건 주소입니다. 주소가 너무 길면 다음으로 넘어가게 해뒀어요. 단어별로 뜯었는데 별로일까요</p>
                <h3>이 곳은..</h3>
                <div id='preview-text'>시끄럽군요.<br /> 이사는 어때요?</div>
                <button id='detail-move' onClick={() => navigate('/infodetail')}>상세 보기</button>
            </div>
        </div>
    )
}

export default DetailPreview