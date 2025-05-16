import {getSearchRank, getTodayRanking} from "../services/rankService.js";
import {useEffect, useState} from "react";

export function useTodaySelector() {
    const [todayRank, setTodayRank] = useState([]);
    useEffect(() => {
        const fetchTodayRanking = async () => {
            try {
                const data = await getTodayRanking();
                console.log(data.rankings);
                setTodayRank(data.rankings);
            } catch (error) {
                console.error("랭킹 데이터를 가져오는 중 오류 발생:", error);
            }
        };

        fetchTodayRanking();
    }, []);


    const handleSearchSubmit = async (e) => {
        e.preventDefault(); //

        if (!inputValue.trim()) {
            alert("검색어를 입력해주세요.");
            return;
        }

        try {
            const res = await useKeywordRank(inputValue);
            setKeywordData(res.rankings[0]?.currentRank ?? '-');
        } catch (error) {
            console.error("검색 실패:", error);
            setKeywordData('-'); // 검색 실패 시 기본값
        }
    };

    return {
        inputValue,
        setInputValue,
        keywordData,
        handleSearchSubmit,
        todayRank
    }
}
