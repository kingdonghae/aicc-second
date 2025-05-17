import { useCallback, useState } from "react";
import {saveCommentService} from "@/pages/textdetail/services/getPostDetailService.js";

/**
 * 댓글 입력 & 저장 전용 훅
 * @param {number} postId - 게시글 ID
 * @param user
 * @param {function} setComments - 부모에서 전달받는 댓글 목록 setter
 */
export const useSaveComment = (postId, user, setComments) => {
    const [comment, setComment] = useState('');

    const onSubmit = (async () => {
        if (comment.trim() === '') return;

        try {
            const newComment = await saveCommentService({
                post_id: postId,
                content: comment,
                writer: user.user_id,
            });

            setComments((prev) => [...prev, newComment]);
            setComment('');
        } catch (error) {
            alert(error?.response?.data?.error || '댓글 저장 오류');
        }
    })

    return {
        comment,
        setComment,
        onSubmit,
    };
};
