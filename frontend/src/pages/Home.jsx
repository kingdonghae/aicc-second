<<<<<<< HEAD
import '../styles/Home.css';
import {useNavigate} from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
=======
  import React from 'react';
  import '../styles/Home.css';
  import { useState } from 'react';
  import { useNavigate } from 'react-router-dom';

  const Home = () => {
>>>>>>> 3f5ecfb010b64a7a3d5319472caeebca60b8a473

    const navigate = useNavigate();
    const [address, setAddress] = useState('')

    const handleKeyDown = (e) => {
      if(e.key === "Enter"){
        e.preventDefault();
        if(address.trim()){
          navigate(`/map?address=${encodeURIComponent(address.trim())}`);
        }
      }
    };

    const handleClick = (e) => {
      e.preventDefault();
      if (address.trim()) {
        navigate(`/map?address=${encodeURIComponent(address.trim())}`);
      }
    };

    return (
      <div>

      <section id='top'>
        {/* <nav></nav> */}
        <header id='main-header'>
          <h1 id='main-title'>집PT</h1>
          <p>Zip Place Tool</p>
        </header>

        <form id='main-input-box'>
          <input type="text"
          placeholder='주소를 입력해주세요.' 
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onKeyDown={handleKeyDown}/>
          <button id='input-button'
          type='submit'
          onClick={handleClick}></button>
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

<<<<<<< HEAD
        <div>
          <button id='rank' onClick={()=>navigate('/rank')}></button>
          <p>검색 순위 보기</p>
        </div>
=======
      </section>
>>>>>>> 3f5ecfb010b64a7a3d5319472caeebca60b8a473

    </div>
  )
    
  }

  export default Home
