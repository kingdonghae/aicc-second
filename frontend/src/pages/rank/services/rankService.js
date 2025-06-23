import {
    fetchSearchRanking,
    fetchTodayRanking,
} from '../api/postRankingApi.js';

export const getTodayRanking = async () => {
    const { data } = await fetchTodayRanking();
    return data;
};

export const getSearchRank = async (keyword) => {
    const { data } = await fetchSearchRanking(keyword);
    return data;
};