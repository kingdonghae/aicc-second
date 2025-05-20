import { useNavigation } from "@/hook/useNavigation.js";
import { usePostDetail } from "@/pages/textdetail/hook/usePostDetail.js";
import CommentList from "@/pages/textdetail/components/CommentList.jsx";
import CommentForm from "@/pages/textdetail/components/CommentForm.jsx";
import NavButton from "@/pages/textdetail/components/NavButton.jsx";
import {useSaveComment} from "@/pages/textdetail/hook/useSaveComment.js";
import {useComments} from "@/pages/textdetail/hook/useComments.js";
import {useRecoilValue} from "recoil";
import {authState} from "@/atoms/authState.js";
import '@/styles/TextDetail.css';
import {useRequireLoginAction} from "@/pages/textdetail/hook/useRequireLoginAction.js";
import AttachmentList from "@/pages/write/components/AttachmentList.jsx";

const TextDetail = () => {
    const {isLoggedIn,user} = useRecoilValue(authState);
    const { goBoard,goLogin, goEdit, goWrite, goTextDetail } = useNavigation();
    const { post, loading: postLoading, error: postError, formatted, postId } = usePostDetail();
    const { comments, setComments, loading: commentLoading, error: commentError } = useComments(postId);
    const { comment,setComment, onSubmit } = useSaveComment(postId, user, setComments);
    const requireLoginAction = useRequireLoginAction();

    const handleGoWrite = () => {
        requireLoginAction(goWrite,goLogin);
    };
    if (postLoading || commentLoading) return <p>로딩 중...</p>;

    if (postError || !post) return <p>게시글을 불러오지 못했습니다.</p>;
    if (commentError) return <p>댓글을 불러오지 못했습니다.</p>;

    const {
        title,
        writer,
        username,
        created_at,
        view_count,
        content,
        total_count,
        uploadedFiles
    } = post;

    return (
        <div className='content-background'>
            <CommentList comments={comments} setComments={setComments} user={user} />
            <div className="write-box">
                <div className="content-box">

                    <div className="title-box">
                        <div>
                            <h4>{title}</h4>
                            <div id="writer">
                                작성자 : <span>{username}</span> │ 작성 시간 : <span>{formatted}</span>
                                │ 조회수 : <span>{view_count}</span>
                            </div>
                        </div>

                        <div className="edit-box">
                            <div className="other-content">
                                <NavButton direction={'prev'} condition={postId < total_count} onClick={() => goTextDetail(postId + 1)}/>
                                <NavButton direction={'next'} condition={postId > 1} onClick={() => goTextDetail(postId - 1)}/>
                            </div>
                            <div className="buttons">
                                {parseInt(user?.user_id) === parseInt(writer) ? (
                                    <button id="edit-button" onClick={() => goEdit(postId)}>수정</button>
                                ) : (
                                    <button id="edit-button" onClick={handleGoWrite}>글쓰기</button>
                                )}
                                <button id="list-button" onClick={goBoard}>목록</button>
                            </div>
                        </div>
                    </div>

                    <hr className='content-line'/>

                    <div style={{height:'16rem', overflowY:'auto',overflowX:'hidden'}}>
                        <AttachmentList files={uploadedFiles}/>
                        <div className="content-text-box">
                            <div dangerouslySetInnerHTML={{ __html: content }} />
                        </div>
                    </div>
                    
                    <CommentForm
                        comment={comment}
                        setComment={setComment}
                        onSubmit={onSubmit}
                        user={user}
                        isLoggedIn={isLoggedIn}
                    />
                </div>
            </div>
        </div>

    )
}

export default TextDetail
