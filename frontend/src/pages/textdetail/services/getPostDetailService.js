import {
    deleteComment,
    fetchCommentsByPost,
    fetchPostDetail,
    saveComment
} from "@/pages/textdetail/api/postDetailApi.js";

export const getPostDetailService = async (postId) => {
    try {
        const response = await fetchPostDetail(postId);
        return response.data;
    } catch (err) {
        console.error(`게시글 상세 조회 실패 (id: ${postId}):`, err);
        throw err;
    }
};

export const saveCommentService = async ({ post_id, content, writer }) => {
    try {
        return await saveComment({post_id, content, writer});
    } catch (err) {
        console.error(`댓글 저장 실패 (post_id: ${post_id}):`, err);
        throw err;
    }
};

export const getCommentsByPostService = async (postId) => {
    try {
        const response = await fetchCommentsByPost(postId);
        return response.data;
    } catch (err) {
        console.error(`댓글 목록 조회 실패 (post_id: ${postId}):`, err);
        throw err;
    }
};

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
