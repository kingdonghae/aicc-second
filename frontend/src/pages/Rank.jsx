import '../styles/Rank.css'
import TodayTable from '../features/rank/components/TodayTable.jsx'
import MonthYearTable from '../features/rank/components/MonthYearTable.jsx'
import {useAllRank} from "../features/rank/hook/useAllRank.jsx";
import {useRef, useState} from "react";
import {useKeywordRank} from "../features/rank/hook/useKeywordRank.jsx";


const Rank = () => {
    const [inputValue, setInputValue] = useState('');
    const [keywordData, setKeywordData] = useState(null);
    const ranksData =  useAllRank();
    if (!ranksData || !Array.isArray(ranksData.rankings)) {
        return <div>로딩 중...</div>;
    }
    const todayRanks = ranksData.rankings.filter(rank => rank.periodType === 'daily');
    const weeklyRanks = ranksData.rankings.filter(rank => rank.periodType === 'weekly');
    const monthlyRanks = ranksData.rankings.filter(rank => rank.periodType === 'monthly');
    // const { data: keywordRankData } = useKeywordRank(searchKeyword, !!searchKeyword)||[];

    const handleSearchClick = () => {
        useKeywordRank(inputValue).then((res) => {setKeywordData(res.rankings[0].currentRank)});
    };

            <hr/>

    return (
        <div className='whole-section'>

        <section id='two'>
            <header></header>
            <div className='table-with-input'>
                <h1>- 월별 검색 순위</h1>
                <div className='calendar'>
                    <input type="month" id='month-rank'/>
                    <p>달력을 열어 기간을 설정해보세요 ▲</p>
                </div>
            </div>
            <div>
                <MonthTable/>
            </div>
            

            <div className='table-with-input'>
                <h1>- 주별 검색 순위</h1>
                <div className='calendar'>
                    <input type="week" id='week-rank'/>
                    <p>달력을 열어 기간을 설정해보세요 ▲</p>
                </div>
            </div>
            <div>
                <MonthTable/>
            </div>
        </section>
    </div>
  )
}

export default Rank
