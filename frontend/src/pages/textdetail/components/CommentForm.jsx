import { useState } from 'react';
import { useShowModal } from "@/utils/showModal.js"; // 🔥 추가

const CommentForm = ({ comment, setComment, onSubmit, isLoggedIn, user }) => {
    const [isChecking, setIsChecking] = useState(false);
    const showModal = useShowModal(); // 🔥 추가

    if (!isLoggedIn || !user.username) {
        return (
            <div className="comment-box">
                <textarea 
                    readOnly={true} 
                    style={{
                        fontFamily:'Pretendard',
                        fontSize:'20px', 
                        paddingTop:'20px', 
                        textAlign:"center"
                    }}
                >
                    댓글 작성은 로그인 후 이용 가능합니다.
                </textarea>
            </div>
        );
    }

    const username = user.username;

    // 🔥 유해표현 감지 알림 모달
    const BannedWordAlert = () => {
        showModal({
            title: '🛡️ 유해표현 감지',
            message: '유해표현이 포함되어 있어 저장할 수 없습니다.',
            showCancelButton: false,
        });
    };

    // AI 안전성 검사 함수
    const handleSubmit = async () => {
        const commentText = comment.trim();
        
        if (!commentText) {
            // 🔥 alert 대신 모달 사용
            showModal({
                title: '⚠️ 알림',
                message: '댓글을 입력해주세요.',
                showCancelButton: false,
            });
            return;
        }

        setIsChecking(true);
        
        try {
            // AI 안전성 검사
            const response = await fetch('http://localhost:5000/api/safety-check', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: commentText }),
            });
            
            const result = await response.json();
            
            if (!result.safe) {
                BannedWordAlert(); // 🔥 alert 대신 모달 사용
                return;
            }
            
            // AI 검사 통과 시 댓글 등록
            onSubmit();
            
        } catch (error) {
            console.error('댓글 안전성 검사 오류:', error);
            
            // AI 검사 실패 시에도 댓글 등록 (기본 동작)
            onSubmit();
            
        } finally {
            setIsChecking(false);
        }
    };

    return (
        <div className="comment-box">
            <p>{username}</p>
            <textarea
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={isChecking}
                placeholder="댓글을 입력하세요..."
            />
            <button 
                onClick={handleSubmit}
                disabled={isChecking}
            >
                {isChecking ? '검사중' : '등록'}
            </button>
        </div>
    );
};

export default CommentForm;
