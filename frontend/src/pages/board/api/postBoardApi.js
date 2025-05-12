import apiClient from "@/api/apiClient.js";

export const fetchPostList = async ({ page = 1, limit = 10, search='' }) => {
    return apiClient.get('/posts', { params: { page, limit, search } });
};

export const fetchPostCount = async (search='') => {
    return apiClient.get('/posts/count',{ params: { search }});
};

