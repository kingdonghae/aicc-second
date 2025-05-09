import { useEffect, useState } from "react";
import {
    getISOWeekString,
    getMonthWeekLabel,
    getWeekRanking
} from "@/pages/rank/services/WeekSelectService.jsx";

export function useWeekSelector() {
    const [weekValue, setWeekValue] = useState("");
    const [weekLabel, setWeekLabel] = useState("");
    const [weekRank, setWeekRank] = useState([]);

    useEffect(() => {
        const fetchInitialWeekRank = async () => {
            const initialWeek = getISOWeekString();
            setWeekValue(initialWeek);
            setWeekLabel(getMonthWeekLabel(initialWeek));

            const [year, week] = initialWeek.split('-W');
            const data = await getWeekRanking(year, week);
            setWeekRank(data.rankings);
        };

        fetchInitialWeekRank();
    }, []);

    const handleChange = async (e) => {
        const newVal = e.target.value;
        setWeekValue(newVal);
        setWeekLabel(getMonthWeekLabel(newVal));

        const [year, week] = newVal.split('-W');
        const data = await getWeekRanking(year, week);
        setWeekRank([...data.rankings]);
    };

    return {
        weekValue,
        weekLabel,
        handleChange,
        weekRank
    };
}
