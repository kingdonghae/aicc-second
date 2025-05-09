import {getSearchRank, getTodayRanking} from "../services/RankService.jsx";
import {useEffect, useState} from "react";

export function useTodaySelector() {
    const [todayRank, setTodayRank] = useState([]);
    useEffect(() => {
        const fetchTodayRanking = async () => {
            try {
                const data = await getTodayRanking();
                console.log(data.rankings);
                setTodayRank([...data.rankings]);
            } catch (error) {
                console.error("랭킹 데이터를 가져오는 중 오류 발생:", error);
            }
        };

        fetchTodayRanking();
    }, []);

    const useKeywordRank = (keyword) => {
        const shouldFetch = keyword && keyword.length > 0;
        return (shouldFetch ? getSearchRank(keyword) : null);
    };

    return {
        useKeywordRank,
        todayRank
    };
}
