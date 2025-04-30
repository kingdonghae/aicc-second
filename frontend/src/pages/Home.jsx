  import React from 'react';
  import '../styles/Home.css';

  const Home = () => {

    return (
      <div>

      <section id='top'>
        {/* <nav></nav> */}
        <header id='main-header'>
          <h1 id='main-title'>집PT</h1>
          <p>Zip Place Tool</p>
        </header>

        <form id='main-input-box'>
          <input type="text" placeholder='주소를 입력해주세요.' />
          <button id='input-button'></button>
        </form>

      </section>

      <section id='bottom'>
        
        <div id='button-box'>

          <div>
            <button id='map-button'></button>
            <p>지도 보기</p>
          </div>

          <div>
            <button id='rank-button'></button>
            <p>검색 순위 보기</p>
          </div>

          <div>
            <button id='speak-button'></button>
            <p>정보마당</p>
          </div>

        </div>

      </section>

    </div>
  )
    
  }

  export default Home
