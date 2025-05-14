import {useMonthSelector} from "@/pages/rank/hook/UseMonthSelector.jsx";

export default function MonthSelector({value,onChange}) {

    return (
        <div className='calendar'>
            <input
                type="month"
                id='month-rank'
                value={value}
                onChange={onChange}
            />
            <p>달력을 열어 기간을 설정해보세요 ▲</p>
        </div>
    );
}