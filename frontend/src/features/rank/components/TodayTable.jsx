import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import RemoveIcon from '@mui/icons-material/Remove';

export default function TodayTable({ rows }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{fontSize:'0.5rem'}} aria-label="simple table">
        <TableBody>
            {rows.length > 0 ?
                rows.map((row) => (
                <TableRow key={row.keyword}>
                <TableCell align="center" sx={{fontFamily:'KIMM_Bold', padding: '0rem 1rem'}}>{row.currentRank}</TableCell>
                <TableCell align="center" sx={{fontFamily:'KIMM_Bold', padding: '0rem'}}>
                    {row.diffRank > 0 ? (
                    <ArrowUpwardIcon sx={{ fontSize: 16, color: 'red' }} />
                    ) : row.diffRank < 0 ? (
                    <ArrowDownwardIcon sx={{ fontSize: 16, color: 'blue' }} />
                    ) : (
                    <RemoveIcon sx={{ fontSize: 16, color: 'gray' }} />
                    )}
                    {Math.abs(row.diffRank)}
                </TableCell>
                <TableCell align="center" sx={{fontFamily:'KIMM_Bold', fontSize: '0.85rem', padding: '0.4rem'}}>{row.keyword}</TableCell>
                </TableRow>
            )): <div style={{minHeight:'280px',fontSize:'20px', textAlign:'center',padding:'140px'}}> 오늘의 검색 키워드가 존재하지 않습니다. </div>
            }
            </TableBody>
      </Table>
    </TableContainer>
  );
}
