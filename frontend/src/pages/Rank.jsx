import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAllRank } from "../features/rank/hook/useAllRank.jsx";
import { useKeywordRank } from "../features/rank/hook/useKeywordRank.jsx";
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import MapIcon from '@mui/icons-material/Map';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import TodayTable from '../features/rank/components/TodayTable.jsx'
import MonthYearTable from '../features/rank/components/MonthYearTable.jsx'
import WeekSelector from "@/features/rank/components/WeekSelector.jsx";
import '../styles/Rank.css'


const Rank = () => {

    const navigate = useNavigate();
    const [menu, setMenu] = useState(false);

    const toggleMenu = () => {
        setMenu(prev => !prev)
    }


    const [inputValue, setInputValue] = useState('');
    const [keywordData, setKeywordData] = useState(null);
    const ranksData = useAllRank();
    if (!ranksData || !Array.isArray(ranksData.rankings)) {
        return <div>로딩 중...</div>;
    }

    const todayRanks = ranksData.rankings.filter(rank => rank.periodType === 'daily');
    const weeklyRanks = ranksData.rankings.filter(rank => rank.periodType === 'weekly');
    const monthlyRanks = ranksData.rankings.filter(rank => rank.periodType === 'monthly');

    const handleSearchClick = () => {
        useKeywordRank(inputValue).then((res) => { setKeywordData(res.rankings[0].currentRank) });
    };


    return (
        <div className='whole-section'>
            <button className='home-menu' onClick={() => navigate('/')}>집PT</button>
            <div className='menu-box'>
                <button className='menu-button' onClick={() => navigate('/mypage')}><PersonIcon /></button>
                <button className='menu-button' onClick={() => navigate('/')}><LogoutIcon /></button>
                {/* <button className='menu-button' onClick={()=>navigate('/')}>Login</button> */}

                <button className='menu-button'
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleMenu();
                    }}><MenuIcon /></button>
            </div>
            {menu &&
                <nav className='menu-popup' ref={menuRef}>
                    <ul className='menu-group'>
                        <li className='menu-list' onClick={() => navigate('/map')}><button><MapIcon style={{ fontSize: '2.5rem' }} />지도 보기</button></li>
                        <li className='menu-list' id='menu-select' onClick={() => navigate('/rank')}><button><TrendingUpIcon style={{ fontSize: '2.5rem' }} />검색 순위</button></li>
                        <li className='menu-list' onClick={() => navigate('/board')}><button><Diversity3Icon style={{ fontSize: '2.5rem' }} />정보 마당</button></li>
                    </ul>
                </nav>}

            <section className='rank-section' id='one'>
                <header id='search-header'></header>
                <h1>오늘 검색 순위</h1>
                <div>
                    <TodayTable rows={todayRanks}></TodayTable>
                </div>

                <hr />

                <div id='check-rank'>
                    <h1>순위 확인하기</h1>
                    <form id='input-box'>
                        <input type="text" placeholder='주소를 입력해주세요.' id='white-text' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                        <button id='input-button' type='button' onClick={handleSearchClick}></button>
                    </form>
                    <h3>오늘의 순위 <span id='check-number'> {keywordData ?? '-'}</span>위</h3>
                </div>
            </section>

            <section className='rank-section' id='two'>
                <header></header>
                <div className='table-with-input'>
                    <h1>- 월별 검색 순위</h1>
                    <div className='calendar'>
                        <input type="month" id='month-rank' />
                        <p>달력을 열어 기간을 설정해보세요 ▲</p>
                    </div>

                </div>
                <div>
                    <MonthYearTable rows={weeklyRanks} />
                </div>


                <div className='table-with-input'>
                    <h1>- 주별 검색 순위</h1>
                    <WeekSelector />
                </div>
                <div>
                    <MonthYearTable rows={monthlyRanks} />
                </div>
            </section>
        </div>
    )
}

export default Rank