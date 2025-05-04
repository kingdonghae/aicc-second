import apiClient from "@/api/ApiClient.jsx";

// 기간별 주소 검색어 랭킹 모두 조회
export const fetchAllRankings = () => {
    return apiClient.get('/rank/search-rankings');
};

// 검색 키워드 랭킹 조회
export const fetchSearchRanking = (keyword) => {
    return apiClient.post('/rank/search-ranking', {keyword});
};

// 주별 기간 옵션 랭킹 조회
export const fetchWeekRanking = (keyword) => {
    return apiClient.post('/rank/search-ranking', {keyword});
}
// 월별 기간 옵션 랭킹 조회
export const fetchMonthRanking = (keyword) => {
    return apiClient.post('/rank/search-ranking', {keyword});
}