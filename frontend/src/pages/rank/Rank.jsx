import { useState } from "react";
import WeekSelector from "@/pages/rank/components/WeekSelector.jsx";
import MonthSelector from "@/pages/rank/components/MonthSelector.jsx";
import RankTable from "@/pages/rank/components/RankTable.jsx";
import { useMonthSelector } from "@/pages/rank/hook/UseMonthSelector.jsx";
import { useWeekSelector } from "@/pages/rank/hook/UseWeekSelector.jsx";
import { useTodaySelector } from "@/pages/rank/hook/UseTodaySelector.jsx";
import '../../styles/Rank.css';
import * as React from "react";


const Rank = () => {
    const { monthRank, monthValue, handleChange: handleMonthChange } = useMonthSelector();
    const { weekRank, weekValue, handleChange: handleWeekChange } = useWeekSelector();
    const { todayRank } = useTodaySelector();

    console.log(monthRank)
    console.log(weekRank)
    console.log(todayRank)

    const [inputValue, setInputValue] = useState('');
    const [keywordData, setKeywordData] = useState(null);

    const handleSearchClick = () => {
        useKeywordRank(inputValue).then((res) => {
            setKeywordData(res.rankings[0]?.currentRank ?? '-');
        });
    };

    return (
        <div className='whole-section'>
            <section className='rank-section' id='one'>
                <div>
                    <h1>오늘 검색 순위</h1>
                    <RankTable rankData={[...todayRank]} />
                </div>
                <hr />
                <div id='check-rank'>
                    <h1>순위 확인하기</h1>
                    <form id='input-box' onSubmit={handleSearchClick}>
                        <input
                            type="text"
                            placeholder='주소를 입력해주세요.'
                            id='white-text'
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onSubmit={(e) => { e.preventDefault(); }}
                        />
                        <button id='input-button' type='submit' ></button>
                    </form>
                    <h3>오늘의 순위 <span id='check-number'> {keywordData}</span>위</h3>
                </div>
            </section>

            <section className='rank-section' id='two'>
                <div className='table-with-input'>
                    <h1>- 월별 검색 순위</h1>
                    <MonthSelector value={monthValue} onChange={handleMonthChange} />
                </div>
                <div>
                    <RankTable rankData={[...monthRank]} />
                </div>

                <div className='table-with-input'>
                    <h1>- 주별 검색 순위</h1>
                    <WeekSelector value={weekValue} onChange={handleWeekChange} />
                </div>
                <div>
                    <RankTable rankData={[...weekRank]} />
                </div>
            </section>
        </div>
    );
};

export default Rank;
