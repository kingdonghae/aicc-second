import React from 'react';
import '../styles/Board.css';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../assets/search.png';
import homeIcon from '../assets/home.png';
import ReactTable from '../pages/ReactTable';

function createData(no, title, user, time, views) {
  return { no, title, user, time, views };
}

const rows = [
  createData(1, '챗GPT가 알려주는 살기 좋은 동네', '김경중', '2025-04-21', 87),
  createData(2, '공지 │ 청년주택 신청 기간 안내', '운영자', '2025-04-21', 586),
  createData(3, '언제 이사 갈 수 있을까요...', '김소랑', '2025-04-21', 45),
  createData(4, '예쁜 카페 많은 동네 추천 드려요 ~', '김정은', '2025-04-21', 32),
  createData(5, '가산디지털단지역 근처에 만화카페 생겼어요!', '박규섭', '01:12', 51),
  createData(6, '부동산 투자, 어디가 좋을까?', '오재열', '2025-04-21 05:59', 24),
  createData(7, '지하철역 가까운 동네 알고 계신 분??', '최민성', '2025-04-21 11:01', 19),
  createData(8, '동물원에서 팬더가 탈출했대요 !!', '한선아', '2025-04-21 15:32', 3),
];

const Board = () => {
    const navigate = useNavigate();
    const goHome = () => {
        navigate('/');
    };

    return (
      <div class="info-main">

        {/* 상단부 - 제목 + 홈 버튼 + 검색 */}
        <div class="info-header">

          {/* 상단부 왼쪽 - 제목 */}
          <div class="info-title">
            <h1>정보마당</h1>
            <p>와글와글 왁자지껄 함께 소통해요</p>
          </div>

          {/* 상단부 오른쪽 - 홈 버튼 (위쪽) + 검색 (아래쪽) */}
          <div class="functions">

            {/* 홈 버튼 */}
            <div class="home-btn">
              <button type="submit">
                <img src={homeIcon} alt="홈으로 이동" onClick={goHome}/>
              </button>
            </div>

            {/* 검색 */}
            <div class="info-search">
              <div class='search-info'>
                <input type='text' class="input-word"/>
                <button type="submit" class="submit-btn">
                  <img src={searchIcon} alt="검색" />
                </button>
              </div>
              <div class="write-btn">
                <input type="submit" value="글쓰기"/>
              </div>
            </div>
            
          </div>
        </div>

        {/* 중간 - 테이블 */}
        <div class="info-table">
          <ReactTable />
          
          {/* <table>
            <thead>
              <tr>
                <th>No</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성시간</th>
                <th>조회수</th>
              </tr>
            </thead>
            <tbody>
              {[...rows]
                .sort((a, b) => { // 공지글을 테이블 제일 윗부분으로 이동
                  const isNoticeA = a.title.includes('공지 │');
                  const isNoticeB = b.title.includes('공지 │');
                  if (isNoticeA && !isNoticeB) return -1;
                  if (!isNoticeA && isNoticeB) return 1;
                  return b.no - a.no; // 번호순 (내림차순)
                })
                .map((row) => {
                  const isNotice = row.title.includes('공지');
                  return (
                    <tr key={row.no} className={isNotice ? 'notice-row' : ''}>
                      <td>{row.no}</td>
                      <td>{row.title}</td>
                      <td>{row.user}</td>
                      <td>{row.time}</td>
                      <td>{row.views}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table> */}
        </div>

        {/* 하단부 - 페이지네이션 */}
        <div className="pagination">
          <button disabled>{'<'}</button>
          <span className="page-number active">1</span>
          <button>{'>'}</button>
        </div>
      </div>
    );
  };
  
  export default Board;