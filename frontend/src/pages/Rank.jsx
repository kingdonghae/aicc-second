import '../styles/Rank.css'
import TodayTable from '../features/rank/components/TodayTable.jsx'
import MonthYearTable from '../features/rank/components/MonthYearTable.jsx'
import {useSearchRank} from "../features/rank/hook/useSearchRank.jsx";


const Rank = () => {

    const ranksData =  useSearchRank();
    if (!ranksData || !Array.isArray(ranksData.rankings)) {
        return <div>로딩 중...</div>;
    }
    const todayRanks = ranksData.rankings.filter(rank => rank.period_type === 'daily');
    const weeklyRanks = ranksData.rankings.filter(rank => rank.period_type === 'weekly');
    const monthlyRanks = ranksData.rankings.filter(rank => rank.period_type === 'monthly');

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
                        <input type="text" placeholder='주소를 입력해주세요.' id='white-text'/>
                        <button id='input-button'></button>
                    </form>
                    <h3>오늘의 순위 <span id='check-number'>12</span>위</h3>
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
