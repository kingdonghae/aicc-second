import apiClient from '../../../api/ApiClient.jsx';
import {data} from "react-router-dom";


// 기간별 주소 검색어 랭킹 가져오기
export const fetchAllRankings = () => {
    return apiClient.get('/rank/search-rankings');
};

// 검색주소 랭킹 가져오기
export const fetchSearchRanking = (keyword) => {
    return apiClient.post('/rank/search-ranking', {keyword});
};
