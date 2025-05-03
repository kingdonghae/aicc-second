import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import MapIcon from '@mui/icons-material/Map';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import '../styles/TextDetail.css'

const TextDetail = () => {

    const navigate = useNavigate();
    const [menu, setMenu] = useState(false);

    const toggleMenu = () => {
        setMenu(prev => !prev)
    }

    return (

        <div className='write-page'>
            <button className='home-menu' onClick={() => navigate('/')}>집PT</button><div className='menu-box'>

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
                <nav className='menu-popup'>
                    <ul className='menu-group'>
                        <li className='menu-list' onClick={() => navigate('/map')}><button><MapIcon style={{ fontSize: '2.5rem' }} />지도 보기</button></li>
                        <li className='menu-list' onClick={() => navigate('/rank')}><button><TrendingUpIcon style={{ fontSize: '2.5rem' }} />검색 순위</button></li>
                        <li className='menu-list' onClick={() => navigate('/board')}><button><Diversity3Icon style={{ fontSize: '2.5rem' }} />정보 마당</button></li>
                    </ul>
                </nav>}


            <div className='write-box'>


                <div className='content-box'>
                    <div className='title-box'>
                        <div>
                            <h4>여기가 제목입니다</h4>
                            <div id='writer'>작성자 : <span>소랑</span> │ 작성 시간 : <span>12시간 전</span> │ 조회수 : <span>2</span></div>
                        </div>
                        <div className='edit-box'>
                            <div className='other-content'>
                                <div>◀ 이전글</div>
                                {/* <span></span> */}
                                <div>다음글 ▶</div>
                            </div>
                            <div className='buttons'>
                                <button id='edit-button'>수정</button>
                                <button id='list-button'>목록</button>
                            </div>
                        </div>

                    </div>
                    <hr id='write-hr' />

                    <div className='text-box'>

                        <p>여기가 글 내용이요. 아 집에 가고 싶어졌어요. 이제. 언제쯤 집에 갈 수 있을까요?<br />
                            선생님들 작업 많이들 하셨나요?
                            <br />
                            여러분덜 건강 잘 챙기면서 하세요 ~~!
                        </p>

                    </div>
                    <div className='comment-box'>
                        <p>사용자</p>
                        <textarea name="commnet"></textarea>
                        <button>등록</button>
                    </div>

                </div>

            </div>
        </div>

    )
}

export default TextDetail