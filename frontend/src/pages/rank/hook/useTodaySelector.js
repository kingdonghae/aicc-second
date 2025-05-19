import { useEffect, useRef, useState } from "react";
import { getSearchRank, getTodayRanking } from "@/pages/rank/services/rankService.js";
import { useShowModal } from "@/utils/showModal.js";

export function useTodaySelector() {
    const [todayRank, setTodayRank] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);
    const [keywordData, setKeywordData] = useState(null);
    const showModal = useShowModal();

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

    useEffect(() => {
        if (!inputValue.trim()) {
            setKeywordData('?');
        }
    }, [inputValue]);

    const handleSearchSubmit = async (e) => {
        e.preventDefault();

        const currentInput = inputRef.current?.value ?? '';
        setKeywordData('?');
        if (!currentInput.trim()) {
            showModal({
                title: '',
                message: "검색어를 입력해주세요.",
                showCancelButton: false,
                onConfirm:false

            });
            return;
        }

        try {
            const res = await getSearchRank(currentInput);
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
        todayRank,
        inputRef
    }
}
