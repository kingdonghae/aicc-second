const CommentForm = ({ comment,setComment,onSubmit, isLoggedIn, user }) => {
    if (!isLoggedIn||!user.username) {
        return (
            <div className="comment-box">
                <textarea
                    readOnly={true}
                    style={{fontFamily:'NPSfontBold',fontSize:'20px', paddingTop:'20px', textAlign:"center"}}
                    defaultValue="댓글 작성은 로그인 후 이용 가능합니다."
                />
            </div>
        );
    }
    const username = user.username

    return (
        <div className="comment-box">
            <p>{username}</p>
            <textarea
                name="comment"
                value={comment}
                onChange={(e)=>setComment(e.target.value)}
            />
            <button onClick={onSubmit}>등록</button>
        </div>
    );
};

export default CommentForm;