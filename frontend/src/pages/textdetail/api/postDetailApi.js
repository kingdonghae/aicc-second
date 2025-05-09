import apiClient from "@/api/apiClient.js";

export const fetchPostDetail = async (postId) => {
    return apiClient.get(`/posts/${postId}`);
};