import { useState } from 'react';
import {useNavigation} from "@/hook/useNavigation.js";
import MapIcon from '@mui/icons-material/Map';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import SearchBox from "@/components/SearchBox.jsx";
import ToolTip from '@/components/ToolTip';
import {useRecoilValue} from "recoil";
import {authState} from "@/atoms/authState.js";
import '@/styles/Home.css';


const Home = () => {
    const { goMap, goRank, goBoard } = useNavigation();
    const { isLoggedIn, user } = useRecoilValue(authState);
    return (
        <div className="home-container">
            <section id='top'>
                 <ToolTip/>
                <h1 id='main-title'>집PT</h1>
                <p id='sub-title'>Zip Place Tool</p>
                <SearchBox user_id={isLoggedIn ? user?.user_id : null}/>
                <p id='sub-text'>동네의 모든 것, 집PT가 요약해드립니다!<br/>
                <span>주소를 입력해보세요</span>
                </p>
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
                        <p>순위 보기</p>
                    </div>
                    <div>
                        <button onClick={goBoard}>
                            <Diversity3Icon style={{ fontSize: '3rem' }} />
                        </button>
                        <p>정보 마당</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;