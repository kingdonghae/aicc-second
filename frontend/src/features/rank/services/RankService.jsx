
import {fetchAllRankings, fetchSearchRanking} from '../api/PostRankingApi.jsx';

export const getSearchALLRank = async () => {
    const { data } = await fetchAllRankings();
    print(await fetchAllRankings())
    return data;
};

export const getSearchRank = async (keyword) => {
    const { data } = await fetchSearchRanking(keyword);
    return data;
};