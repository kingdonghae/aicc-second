import apiClient from "@/api/apiClient.js";

export const fetchLogSearchKeyword  = (input_address, keyword, user_id) => {
    return apiClient.post('/search/log-search', {input_address, keyword,user_id});
};
