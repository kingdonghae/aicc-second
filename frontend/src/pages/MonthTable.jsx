import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import RemoveIcon from '@mui/icons-material/Remove';
// import '../styles/Rank.css'

const rows = [
    { rank: 1, rankChange: 3, location: '서울시 양천구 신월로' },
    { rank: 2, rankChange: -1, location: '서울시 서초구 서초중앙로' },
    { rank: 3, rankChange: 0, location: '서울시 영등포구 선유서로' },
    { rank: 4, rankChange: 12, location: '경기 안산시 단원구 예술대학로' },
    { rank: 5, rankChange: 6, location: '경기 용인시 기흥구 구갈로' },
];

export default function MonthTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, fontFamily:'KIMM_Bold', fontSize:'1rem' }} aria-label="simple table">
        {/* <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead> */}
        <TableBody>
            {rows.map((row) => (
                <TableRow key={row.location}>
                <TableCell align="center" sx={{fontFamily:'KIMM_Bold'}}>{row.rank}</TableCell>
                <TableCell align="center" sx={{fontFamily:'KIMM_Bold'}}>
                    {row.rankChange > 0 ? (
                    <ArrowUpwardIcon sx={{ fontSize: 16, color: 'red' }} />
                    ) : row.rankChange < 0 ? (
                    <ArrowDownwardIcon sx={{ fontSize: 16, color: 'blue' }} />
                    ) : (
                    <RemoveIcon sx={{ fontSize: 16, color: 'gray' }} />
                    )}
                    {Math.abs(row.rankChange)}
                </TableCell>
                <TableCell align="center" sx={{fontFamily:'KIMM_Bold'}}>{row.location}</TableCell>
                </TableRow>
            ))}
            </TableBody>
      </Table>
    </TableContainer>
  );
}
