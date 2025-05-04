import { useEffect, useState } from "react";

export default function MonthSelector() {
    const [monthValue, setMonthValue] = useState("");

    const getISOMonthString = (date = new Date()) => {
        const year = date.getFullYear();
        const month = date.getMonth()+1;
        console.log(`${year}-${month>10 ? month :'0'+month}`);
        return `${year}-${month>10 ? month :'0'+month}`;
    };


    useEffect(() => {
        const initialWeek = getISOMonthString();
        setMonthValue(initialWeek);
    }, []);

    const handleChange = (e) => {
        const newVal = e.target.value;
        setMonthValue(newVal);
    };

    return (
        <div className='calendar'>
            <input
                type="month"
                id='month-rank'
                value={monthValue}
                onChange={handleChange}
                style={{}}
            />
            <p>달력을 열어 기간을 설정해보세요 ▲</p>
        </div>
    );
}
