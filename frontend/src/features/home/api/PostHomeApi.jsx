import apiClient from "@/api/ApiClient.jsx";

// 검색 로그 추가 및 검색 수 업데이트
export const fetchLogSearchKeyword  = (keyword) => {
    return apiClient.post('/search/log-search', {keyword});
};
