import apiClient from "@/api/apiClient.js";

export const fetchSearchRanking = (keyword) => {
    return apiClient.post('/rank/search-ranking', {keyword});
};

export const fetchTodayRanking = () => {
    return apiClient.get('/rank/today-ranking');
}

export const fetchWeekRanking = (query) => {
    return apiClient.get('/rank/week-ranking', {
        params: query
    });
}

export const fetchMonthRanking = (query) => {
    return apiClient.get('/rank/month-ranking', {
        params: query
    });
}