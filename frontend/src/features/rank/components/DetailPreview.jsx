import React from 'react'

const DetailPreview = () => {
  return (
    <div className='preview-popup'>
        <div className='preview-score-frame'>
            <h3>가산디지털단지역</h3>
            <p>이건 주소입니다. 주소가 너무 길면 다음으로 넘어가게 해뒀어요. 단어별로 뜯었는데 별로일까요</p>
            <div id='preview-score'>80</div>
            <button id='detail-move'>상세 보기</button>
        </div>
    </div>
  )
}

export default DetailPreview
