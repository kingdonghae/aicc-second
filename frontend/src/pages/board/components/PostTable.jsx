import React, { useCallback } from 'react' ;
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigation } from "@/hook/useNavigation.js";
import Pagination from "@/pages/board/components/Pagination.jsx";
import { styled } from '@mui/material/styles';
import '@/styles/Board.css';

const StyledTableCell = styled(TableCell)({
  backgroundColor: '#B9DCC4',
  color: 'white',
  fontWeight: 'bold',
  fontFamily: 'KIMM_Bold',
});

const NoticeTableCell = styled(TableCell)({
  fontFamily: 'KIMM_Bold',
  fontWeight: "bolder",
});

export default React.memo(function PostTable({ posts, totalPages, error, page, setPage, limit }) {
  const { goTextDetail } = useNavigation();

  // goTextDetail 함수가 매번 재생성되지 않도록 useCallback 사용
  const memoizedGoTextDetail = useCallback((id) => {
    goTextDetail(id);
  }, [goTextDetail]); // goTextDetail이 변경될 때만 재생성


  // if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error.message}</p>;

  const formatTime = (dateString) => {
    const date = new Date(dateString);

    const pad = (n) => String(n).padStart(2, '0');

    const y = date.getUTCFullYear();
    const m = pad(date.getUTCMonth() + 1);
    const d = pad(date.getUTCDate());
    const hh = pad(date.getUTCHours());
    const mm = pad(date.getUTCMinutes());

    const today = new Date();
    const todayY = today.getUTCFullYear();
    const todayM = today.getUTCMonth() + 1;
    const todayD = today.getUTCDate();

    const isToday =
        y === todayY &&
        (m == pad(todayM)) &&
        (d == pad(todayD));

    return isToday ? `${hh}:${mm}` : `${y}.${m}.${d}`;
  };


  return (
      <>
        <TableContainer component={Paper} sx={{minHeight:410}}>
          <Table sx={{ minWidth: 650}} aria-label="게시판 테이블">
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
              {posts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ minHeight: '280px', fontSize: '20px', padding: '140px 0' }}>
                      게시물이 없습니다.
                    </TableCell>
                  </TableRow>
              ) : (
                  posts.map((row) => (
                      <TableRow key={row.id} sx={{ cursor: 'pointer' }} onClick={() => memoizedGoTextDetail(row.id)}>
                        <NoticeTableCell align="center">{row.id}</NoticeTableCell>

                        <NoticeTableCell align="left" className="flex items-center gap-2">
                          <span className="flex items-center gap-1 truncate">
                            <span className="truncate">{row.title}</span>
                            {(row.comment_count) >= 1 && (
                                <span className="text-blue-400 ml-1 whitespace-nowrap">[{row.comment_count}]</span>
                            )}

                          {row.has_attachment===1 &&
                              <img className="text-gray-400 ml-1" src='/assets/clip.svg' width='20' height='20'
                              alt='첨부파일'/>
                          }
                          </span>
                        </NoticeTableCell>

                        <NoticeTableCell align="center">{row.username}</NoticeTableCell>
                        <NoticeTableCell align="center">{formatTime(row.created_at)}</NoticeTableCell>
                        <NoticeTableCell align="center">{row.view_count}</NoticeTableCell>
                      </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            limit={limit}
        />
      </>
  );
})
