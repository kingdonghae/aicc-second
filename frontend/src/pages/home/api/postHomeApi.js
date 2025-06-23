import apiClient from "@/api/apiClient.js";

export const fetchLogSearchKeyword  = (keyword,user_id) => {
    return apiClient.post('/search/log-search', {keyword,user_id});
};
