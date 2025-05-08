import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { styled } from '@mui/material/styles';
import '../styles/Board.css';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(no, title, user, time, views) {
  return { no, title, user, time, views };
}

// Board.jsx 테이블에서 th였던 부분
const StyledTableCell = styled(TableCell)({
    backgroundColor: '#6EA8DC',
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'KIMM_Bold',
  });

// Board.jsx 테이블에서 td였던 부분
const FontChangedTableCell = styled(TableCell)({
    fontFamily: 'KIMM_Bold',
  });

const NoticeTableCell = styled(TableCell)({
  fontFamily: 'KIMM_Bold', 
  fontWeight: "bolder",
});


const rows = [
  createData(1, '챗GPT가 알려주는 살기 좋은 동네', '김경중', '2025-04-21', 87),
  createData(2, '공지 │ 청년주택 신청 기간 안내', '운영자', '2025-04-21', 586),
  createData(3, '언제 이사 갈 수 있을까요...', '김소랑', '2025-04-21', 45),
  createData(4, '예쁜 카페 많은 동네 추천 드려요 ~', '김정은', '2025-04-21', 32),
  createData(5, '가산디지털단지역 근처에 만화카페 생겼어요!', '박규섭', '01:12', 51),
  createData(6, '부동산 투자, 어디가 좋을까?', '오재열', '05:59', 24),
  createData(7, '지하철역 가까운 동네 알고 계신 분??', '최민성', '11:01', 19),
  createData(8, '동물원에서 팬더가 탈출했대요 !!', '한선아', '15:32', 3),
];

const noticeRows = rows.filter((row) => row.title.includes('공지 │'));
const normalRows = rows.filter((row) => !row.title.includes('공지 │'));

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">No</StyledTableCell>
            <StyledTableCell align="center">제목</StyledTableCell>
            <StyledTableCell align="center">작성자</StyledTableCell>
            <StyledTableCell align="center">작성시간</StyledTableCell>
            <StyledTableCell align="center">조회수</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {noticeRows.map((row) => (
            <TableRow key={row.no} sx={{ backgroundColor: '#FFF6CC' }}>
              <NoticeTableCell scope="row" align="center">
                {row.no}
              </NoticeTableCell>
              <NoticeTableCell align="left">{row.title}</NoticeTableCell>
              <NoticeTableCell align="center">{row.user}</NoticeTableCell>
              <NoticeTableCell align="center">{row.time}</NoticeTableCell>
              <NoticeTableCell align="center">{row.views}</NoticeTableCell>
            </TableRow>
          ))}
          {normalRows.map((row) => (
            <TableRow key={row.no}>
              <FontChangedTableCell scope="row" align="center">
                {row.no}
              </FontChangedTableCell>
              <FontChangedTableCell align="left">{row.title}</FontChangedTableCell>
              <FontChangedTableCell align="center">{row.user}</FontChangedTableCell>
              <FontChangedTableCell align="center">{row.time}</FontChangedTableCell>
              <FontChangedTableCell align="center">{row.views}</FontChangedTableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
}
