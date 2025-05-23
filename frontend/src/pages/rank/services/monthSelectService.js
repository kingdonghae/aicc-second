import { fetchMonthRanking } from "@/pages/rank/api/postRankingApi.js";

export function getISOMonthString(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
}

export const getMonthRanking = async (year, month) => {
    const { data } = await fetchMonthRanking({year, month});
    return data;
};