import {fetchWeekRanking} from "@/pages/rank/api/PostRankingApi.jsx";

export function getISOWeekString(date = new Date()) {
    const tmp = new Date(date.getTime());
    tmp.setHours(0, 0, 0, 0);
    tmp.setDate(tmp.getDate() + 3 - ((tmp.getDay() + 6) % 7));
    const week1 = new Date(tmp.getFullYear(), 0, 4);
    const weekNum = 1 + Math.round(
        ((tmp - week1) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7
    );
    return `${tmp.getFullYear()}-W${String(weekNum).padStart(2, "0")}`;
}

export function getMonthWeekLabel(weekStr) {
    if (!weekStr) return "";
    const [year, weekPart] = weekStr.split("-W");
    const weekNum = parseInt(weekPart);
    const janFirst = new Date(year, 0, 1);
    const weekStart = new Date(janFirst);
    weekStart.setDate(janFirst.getDate() + (weekNum - 1) * 7);

    const month = weekStart.getMonth() + 1;
    const firstDayOfMonth = new Date(weekStart.getFullYear(), weekStart.getMonth(), 1);
    const weekOfMonth = Math.ceil((weekStart.getDate() + firstDayOfMonth.getDay()) / 7);

    return `${month}월 ${weekOfMonth}번째 주`;
}

// 주별 기간 옵션 랭킹 조회
export const getWeekRanking = async (year, week) => {
    const { data } = await fetchWeekRanking({year, week});
    return data;
};

