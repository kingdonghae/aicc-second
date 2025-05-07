import '../styles/TextDetail.css'

const TextDetail = () => {

    return (

        <div className='write-page'>
            <div className='write-box'>
                <div className='content-box'>
                    <div className='title-box'>
                        <div>
                            <h4>여기가 제목입니다</h4>
                            <div id='writer'>작성자 : <span>소랑</span> │ 작성 시간 : <span>12시간 전</span> │ 조회수 : <span>2</span></div>
                        </div>
                        <div className='edit-box'>
                            <div className='other-content'>
                                <div>◀ 이전글</div>
                                {/* <span></span> */}
                                <div>다음글 ▶</div>
                            </div>
                            <div className='buttons'>
                                <button id='edit-button'>수정</button>
                                <button id='list-button'>목록</button>
                            </div>
                        </div>

                    </div>
                    <hr id='write-hr' />

                    <div className='text-box'>

                        <p>여기가 글 내용이요. 아 집에 가고 싶어졌어요. 이제. 언제쯤 집에 갈 수 있을까요?<br />
                            선생님들 작업 많이들 하셨나요?
                            <br />
                            여러분덜 건강 잘 챙기면서 하세요 ~~!
                        </p>

                    </div>
                    <div className='comment-box'>
                        <p>사용자</p>
                        <textarea name="commnet"></textarea>
                        <button>등록</button>
                    </div>

                </div>

            </div>
        </div>

    )
}

export default TextDetail