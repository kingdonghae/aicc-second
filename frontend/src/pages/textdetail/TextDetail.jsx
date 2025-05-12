import { useState } from 'react'
import '../styles/TextDetail.css'

const TextDetail = () => {
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([]) // 배열로 변경

    const handleRegister = () => {
        if (comment.trim() === '') return
        setComments(prev => [...prev, comment])
        setComment('') // 입력창 비우기
    }

    const deleteComment = (indexToDelete) => {
        const isConfirmed = window.confirm('정말 이 댓글을 삭제하시겠습니까?');
        if (!isConfirmed) return;

        setComments(prev => prev.filter((_, index) => index !== indexToDelete));
    }

    return (
        <div className='write-page'>
            <div className='comment-list'>
                <h2>댓글 목록</h2>
                <hr id='write-hr' />
                <div className='commends-area'>
                    {comments.length > 0 ? (
                        comments.map((cmt, index) => (
                            <div key={index} className='commends'>
                                <div className='commend-head'>
                                    <h3>사용자</h3>
                                    <button id='delete-commend' onClick={() => deleteComment(index)}>삭제</button>
                                </div>
                                <p>{cmt.split('\n').map((line, i) => (
                                    <span key={i}>
                                        {line}
                                        <br />
                                    </span>
                                ))}</p>
                            </div>
                        ))
                    ) : (
                        <p className='no-commends'>댓글이 없습니다.</p>
                    )}
                </div>
            </div>
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
                        <textarea name="commnet" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                        <button onClick={handleRegister}>등록</button>
                    </div>

                </div>

            </div>
        </div>

    )
}

export default TextDetail