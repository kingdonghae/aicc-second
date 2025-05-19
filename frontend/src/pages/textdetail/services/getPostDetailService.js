import {
    deleteComment,
    fetchCommentsByPost,
    fetchPostDetail,
    saveComment
} from "@/pages/textdetail/api/postDetailApi.js";

/**
 * 게시글 상세 조회 서비스
 * @param {number} postId
 * @returns {Promise<Object>}
 */
export const getPostDetailService = async (postId) => {
    try {
        const response = await fetchPostDetail(postId);
        return response.data;
    } catch (err) {
        console.error(`게시글 상세 조회 실패 (id: ${postId}):`, err);
        throw err;
    }
};

/**
 * 댓글 저장 서비스
 * @param {Object} commentData - 저장할 댓글 데이터
 * @param {number} commentData.post_id - 게시글 ID
 * @param {string} commentData.content - 댓글 내용
 * @param {string} commentData.writer - 작성자 이름
 * @returns {Promise<Object>} - 성공 메시지 반환
 */
export const saveCommentService = async ({ post_id, content, writer }) => {
    try {
        return await saveComment({post_id, content, writer});
    } catch (err) {
        console.error(`댓글 저장 실패 (post_id: ${post_id}):`, err);
        throw err;
    }
};


/**
 * 특정 게시글의 댓글 목록 조회 서비스
 * @param {number} postId - 댓글을 조회할 게시글 ID
 * @returns {Promise<Array>} - 댓글 목록 배열 반환
 */
export const getCommentsByPostService = async (postId) => {
    try {
        const response = await fetchCommentsByPost(postId);
        return response.data;
    } catch (err) {
        console.error(`댓글 목록 조회 실패 (post_id: ${postId}):`, err);
        throw err;
    }
};

/**
 * 댓글 삭제 비즈니스 로직 서비스
 * @param {number} commentId - 삭제할 댓글 ID
 * @returns {Promise<Object>} - { success: boolean, message: string }
 */

export const deleteCommentService = async (commentId) => {
    try {
        const res = await deleteComment(commentId);
        return { success: true, message: res.message };
    } catch (err) {
        console.error(`댓글 삭제 실패 (id: ${commentId})`, err);
        return {
            success: false,
            message: err?.response?.data?.error || '댓글 삭제 중 오류 발생',
        };
    }
};
