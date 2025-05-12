import '../../styles/TextDetail.css';
import { useParams } from "react-router-dom";
import { useNavigation } from "@/hook/useNavigation.js";
import { usePostDetail } from "@/pages/textdetail/hook/usePostDetail.js";

const TextDetail = () => {
  const { id } = useParams();
  const { goBoard, goEdit, goWrite, goTextDetail } = useNavigation();
  const { post, loading, error } = usePostDetail(id);
  const currentUser = 'test111';

  if (loading) return <p>로딩 중...</p>;
  if (error || !post) return <p>게시글을 불러오지 못했습니다.</p>;

  const {
    title,
    writer,
    created_at,
    view_count,
    content,
    total_count,
  } = post;

  const parsedId = parseInt(id);
  const date = new Date(created_at);
  const pad = (n) => String(n).padStart(2, '0');

  const formatted =
      `${date.getUTCFullYear()}.${pad(date.getUTCMonth() + 1)}.${pad(date.getUTCDate())} ` +
      `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}`;

  const renderNavButton = (direction, condition, onClick) => (
      <div
          onClick={condition ? onClick : undefined}
          style={{
            opacity: condition ? 1 : 0.4,
            cursor: condition ? 'pointer' : 'default',
          }}
      >
        {direction === 'prev' ? '◀ 이전글' : '다음글 ▶'}
      </div>
  );

  return (
      <div className="write-page">
        <div className="write-box">
          <div className="content-box">

            {/* 제목, 작성 정보 */}
            <div className="title-box">
              <div>
                <h4>{title}</h4>
                <div id="writer">
                  작성자 : <span>{writer}</span> │ 작성 시간 : <span>{formatted}</span>
                  │ 조회수 : <span>{view_count}</span>
                </div>
              </div>

              {/* 이전/다음글, 수정/목록 버튼 */}
              <div className="edit-box">
                <div className="other-content">
                  {renderNavButton('prev', parsedId > 1, () => goTextDetail(parsedId - 1))}
                  {renderNavButton('next', parsedId < total_count, () => goTextDetail(parsedId + 1))}
                </div>
                <div className="buttons">
                  {currentUser === writer ? (
                      <button id="edit-button" onClick={() => goEdit(id)}>수정</button>
                  ) : (
                      <button id="edit-button" onClick={goWrite}>글쓰기</button>
                  )}
                  <button id="list-button" onClick={goBoard}>목록</button>
                </div>
              </div>
            </div>

            <hr id="write-hr" />

            {/* 본문 */}
            <div className="text-box">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>

            {/* 댓글 */}
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
