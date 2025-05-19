import { useEffect, useState } from "react";
import { getISOMonthString, getMonthRanking } from "@/pages/rank/services/monthSelectService.js";

export function useMonthSelector() {
    const [monthValue, setMonthValue] = useState("");
    const [monthRank, setMonthRank] = useState();

    useEffect(() => {
        const fetchInitialMonthRank = async () => {
            const initialMonth = getISOMonthString();
            setMonthValue(initialMonth);

            const [year, month] = initialMonth.split('-');
            try {
                const data = await getMonthRanking(year, month);
                setMonthRank(data.rankings);
            } catch (error) {
                console.error("월간 랭킹 불러오기 실패:", error);
            }
        };

        fetchInitialMonthRank();
    }, []);


    const handleChange = async (e) => {
        const value = e.target.value;
        setMonthValue(value);

        const [year, month] = value.split('-');

        try {
            const data = await getMonthRanking(year, month);
            setMonthRank(data.rankings);
        } catch (error) {
            console.error("월간 랭킹 불러오기 실패:", error);
        }
    };

    return {
        monthValue,
        handleChange,
        monthRank,
    };
}
