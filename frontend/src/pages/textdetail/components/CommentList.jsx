import {useDeleteComment} from "@/pages/textdetail/hook/useDeleteComment.js";

const CommentList = ({ comments, setComments, user }) => {
    const {handleDeleteComment} = useDeleteComment(setComments);

    return (
        <div className='comment-list'>
            <h2 style={{'font-family': 'Pretendard'}}>댓글 목록</h2>
            <hr className='content-line' />
            <div className='commends-area' style={{'font-family': 'Pretendard'}}>
                {comments.length > 0 ? (
                    comments.map((cmt) => (
                        <div key={cmt.id} className='commends'>
                            <div className='commend-head'>
                                <h3>{cmt.username}</h3>
                                {parseInt(user?.user_id) === parseInt(cmt.writer) && (
                                    <button id='delete-commend' onClick={() => handleDeleteComment(cmt.id)}>삭제</button>
                                )}
                            </div>
                            <p>
                                {cmt.content.split('\n').map((line, i) => (
                                    <span key={i}>
                                        {line}
                                        <br />
                                    </span>
                                ))}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className='no-commends'>댓글이 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default CommentList;
