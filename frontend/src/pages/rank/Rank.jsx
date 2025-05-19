import WeekSelector from "@/pages/rank/components/WeekSelector.jsx";
import MonthSelector from "@/pages/rank/components/MonthSelector.jsx";
import RankTable from "@/pages/rank/components/RankTable.jsx";
import { useMonthSelector } from "@/pages/rank/hook/useMonthSelector.js";
import { useWeekSelector } from "@/pages/rank/hook/useWeekSelector.js";
import { useTodaySelector } from "@/pages/rank/hook/useTodaySelector.js";
import SearchIcon from "@mui/icons-material/Search";
import '@/styles/Rank.css';

const Rank = () => {
    const { monthRank, monthValue, handleChange: handleMonthChange } = useMonthSelector();
    const { weekRank, weekValue,weekLabel, handleChange: handleWeekChange } = useWeekSelector();
    const { inputValue, keywordData, setInputValue, handleSearchSubmit, todayRank,inputRef} = useTodaySelector();


    return (
        <div className='whole-section'>
            <section className='rank-section' id='one'>
                <div>
                    <h1>오늘 검색 순위</h1>
                    <RankTable rankData={todayRank} type="today" />
                </div>
                <hr id="rank-line"/>
                <div id='check-rank'>
                    <h1>주소로 순위 확인하기</h1>
                    <form id='input-box' onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            placeholder='오늘의 순위를 확인해보세요!'
                            ref={inputRef}
                            id='white-text'
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onSubmit={(e) => { e.preventDefault(); }}
                        />
                        <button id='input-button' type='submit' ><SearchIcon /></button>

                    </form>
                    <h3 id="today-rank">오늘의 순위는 <span id='check-number'> {keywordData ? keywordData : '?'}</span>위</h3>
                </div>
            </section>

            <section className='rank-section' id='two'>
                <div className='table-with-input'>
                    <h1>- 월별 검색 순위</h1>
                    <MonthSelector value={monthValue} onChange={handleMonthChange} />
                </div>
                <div>
                    <RankTable key={monthRank} rankData={monthRank} />

                </div>

                <div className='table-with-input'>
                    <h1>- 주별 검색 순위</h1>
                    <WeekSelector value={weekValue} label={weekLabel} onChange={handleWeekChange} />
                </div>
                <div>
                    <RankTable rankData={weekRank} type="week" />
                </div>
            </section>
        </div>
    );
};

export default Rank;
