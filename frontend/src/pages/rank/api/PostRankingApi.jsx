import apiClient from "@/api/apiClient.js";


// 검색 키워드 랭킹 조회
export const fetchSearchRanking = (keyword) => {
    return apiClient.post('/rank/search-ranking', {keyword});
};

// 투데이 랭킹 조회
export const fetchTodayRanking = () => {
    return apiClient.get('/rank/today-ranking');
}

// 주별 기간 옵션 랭킹 조회
export const fetchWeekRanking = (query) => {
    return apiClient.get('/rank/week-ranking', {
        params: query
    });
}

// 월별 기간 옵션 랭킹 조회
export const fetchMonthRanking = (query) => {
    return apiClient.get('/rank/month-ranking', {
        params: query
    });
}