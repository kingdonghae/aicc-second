import {fetchMonthRanking} from "@/pages/rank/api/PostRankingApi.jsx";

export function getISOMonthString(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
}


// 월별 기간 옵션 랭킹 조회
export const getMonthRanking = async (year, month) => {
    const { data } = await fetchMonthRanking({year, month});
    return data;
};