import { useEffect, useState } from "react";

export default function WeekSelector() {
    const [weekValue, setWeekValue] = useState("");         // input value (YYYY-Www)
    const [weekLabel, setWeekLabel] = useState("");         // label (4월 5주차)

    // 현재 주차 구하기
    const getISOWeekString = (date = new Date()) => {
        const tmp = new Date(date.getTime());
        tmp.setHours(0, 0, 0, 0);
        tmp.setDate(tmp.getDate() + 3 - ((tmp.getDay() + 6) % 7));
        const week1 = new Date(tmp.getFullYear(), 0, 4);
        const weekNum = 1 + Math.round(((tmp - week1) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
        return `${tmp.getFullYear()}-W${String(weekNum).padStart(2, "0")}`;
    };

    // "4월 5주차" 포맷 만들기
    const getMonthWeekLabel = (weekStr) => {
        if (!weekStr) return "";
        const [year, weekPart] = weekStr.split("-W");
        const weekNum = parseInt(weekPart);
        const janFirst = new Date(year, 0, 1);
        const weekStart = new Date(janFirst);
        weekStart.setDate(janFirst.getDate() + (weekNum - 1) * 7);

        const month = weekStart.getMonth() + 1; // JS: 0-11 → 1-12
        const firstDayOfMonth = new Date(weekStart.getFullYear(), weekStart.getMonth(), 1);
        const weekOfMonth = Math.ceil((weekStart.getDate() + firstDayOfMonth.getDay()) / 7);

        return `${month}월 ${weekOfMonth}주차`;
    };

    // 초기값 설정
    useEffect(() => {
        const initialWeek = getISOWeekString();
        setWeekValue(initialWeek);
        setWeekLabel(getMonthWeekLabel(initialWeek));
    }, []);

    // 입력값 변경 시 처리
    const handleChange = (e) => {
        const newVal = e.target.value;
        setWeekValue(newVal);
        setWeekLabel(getMonthWeekLabel(newVal));
    };

    return (
        <div className='calendar'>
            <input type="week"
                   id='week-rank'
                   value={weekLabel}
                   onChange={handleChange}/>
            <p>달력을 열어 기간을 설정해보세요 ▲</p>
            <span style={{ marginLeft: "12px", fontWeight: "bold" }}>{weekLabel}</span>
        </div>
    );
}
