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


    return (
        <div className='whole-section'>

            <section id='one'>
                <header id='search-header'></header>
                <h1>오늘 검색 순위</h1>
                <div>
                    <TodayTable rows={todayRanks}></TodayTable>
                </div>

                <hr />

                <div id='check-rank'>
                    <h1>순위 확인하기</h1>
                    <form id='input-box'>
                        <input type="text" placeholder='주소를 입력해주세요.' id='white-text' value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                        <button id='input-button' type='button' onClick={handleSearchClick}></button>
                    </form>
                    <h3>오늘의 순위 <span id='check-number'> {keywordData ?? '-'}</span>위</h3>
                </div>
            </section>

            <section id='two'>
                <header></header>
                <h1>월별 검색 순위</h1>
                <div>
                    <MonthYearTable rows={weeklyRanks}/>
                </div>

                <h1>주별 검색 순위</h1>
                <div>
                    <MonthYearTable rows={monthlyRanks}/>
                </div>
            </section>
        </div>
  )
}

export default Rank
