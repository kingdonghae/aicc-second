import {getSearchRank} from "../services/RankService.jsx";

export const useKeywordRank = (keyword) => {
    const shouldFetch = keyword && keyword.length > 0;
    return (shouldFetch ? getSearchRank(keyword) : null);
};