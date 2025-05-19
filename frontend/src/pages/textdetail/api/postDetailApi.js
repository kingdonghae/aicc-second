import apiClient from "@/api/apiClient.js";

export const fetchPostDetail = async (postId) => {
    return apiClient.get(`/posts/${postId}`);
};

export const saveComment = async ({ post_id, content, writer }) => {
    const res = await apiClient.post('/save-comments', {post_id, content, writer});
    return res.data;
};

export const fetchCommentsByPost = async (postId) => {
    return apiClient.get('/comments', {
        params: { post_id: postId }
    });
};

export const deleteComment = async (commentId) => {
    return apiClient.delete(`/delete-comments/${commentId}`);
};
