import '../../styles/TextDetail.css'
import {useParams} from "react-router-dom";
import {useNavigation} from "@/hook/useNavigation.js";
import {usePostDetail} from "@/pages/textdetail/hook/usePostDetail.js";

const TextDetail = () => {
  const { id } = useParams();
  const { goBoard, goEdit, goTextDetail } = useNavigation();
  const { post, loading, error } = usePostDetail(id);

  if (loading) return <p>로딩 중...</p>;
  if (error || !post) return <p>게시글을 불러오지 못했습니다.</p>;

  const { title, writer, created_at, view_count, content } = post;

  return (
    <div className="write-page">
      <div className="write-box">
        <div className="content-box">
          <div className="title-box">
            <div>
              <h4>{title}</h4>
              <div id="writer">
                작성자 : <span>{writer}</span> │ 작성 시간 : <span>{new Date(created_at).toLocaleString()}</span> │ 조회수 : <span>{view_count}</span>
              </div>
            </div>
            <div className="edit-box">
              <div className="other-content">
                <div onClick={()=>goTextDetail(parseInt(id)-1)}>◀ 이전글</div>
                <div onClick={()=>goTextDetail(parseInt(id)+1)}>다음글 ▶</div>
              </div>
              <div className="buttons">
                <button id="edit-button" onClick={()=>goEdit(id)}>수정</button>
                <button id="list-button" onClick={goBoard}>목록</button>
              </div>
            </div>
          </div>
          <hr id="write-hr" />
          <div className="text-box">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
          <div className="comment-box">
            <p>댓글</p>
            <textarea name="comment" />
            <button>등록</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextDetail;
