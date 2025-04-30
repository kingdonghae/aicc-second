import React from 'react'
import '../styles/Rank.css'
import BasicTable from '../components/BasicTable'
import MonthTable from '../components/MonthTable'


const Rank = () => {
  return (
    <div className='whole-section'>

        <section id='one'>
            <header id='search-header'></header>
            <h1>오늘 검색 순위</h1>
            <div>
                <BasicTable></BasicTable>
            </div>

            <hr/>

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
