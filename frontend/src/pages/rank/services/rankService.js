import {
    fetchSearchRanking,
    fetchTodayRanking,
} from '../api/postRankingApi.js';

// 투데이 랭킹 조회
export const getTodayRanking = async () => {
    const { data } = await fetchTodayRanking();
    return data;
};


// 검색 키워드 랭킹 조회
export const getSearchRank = async (keyword) => {
    const { data } = await fetchSearchRanking(keyword);
    return data;
};