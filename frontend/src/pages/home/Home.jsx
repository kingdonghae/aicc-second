import { useState } from 'react';
import {useNavigation} from "@/hook/useNavigation.js";
import MapIcon from '@mui/icons-material/Map';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import '@/styles/Home.css';
import SearchBox from "@/components/SearchBox.jsx";

const Home = () => {
    const { goMap, goRank, goBoard } = useNavigation();


    return (
        <div className="home-container">
            <section id='top'>
                <h1 id='main-title'>집PT</h1>
                <p>Zip Place Tool</p>
                <SearchBox />
                <p>e.g. 서울시 영등포구 선유서로 │ 검색 불가 : 코드랩 아카데미, 서울시청</p>
            </section>

            <section id='bottom'>
                <div id='button-box'>
                    <div>
                        <button onClick={goMap}>
                            <MapIcon style={{ fontSize: '3rem' }} />
                        </button>
                        <p>지도 보기</p>
                    </div>
                    <div>
                        <button onClick={goRank}>
                            <TrendingUpIcon style={{ fontSize: '3rem' }} />
                        </button>
                        <p>검색 순위 보기</p>
                    </div>
                    <div>
                        <button onClick={goBoard}>
                            <Diversity3Icon style={{ fontSize: '3rem' }} />
                        </button>
                        <p>정보마당</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;