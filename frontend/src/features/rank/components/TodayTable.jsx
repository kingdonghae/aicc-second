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

export default function TodayTable({ rows }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{fontSize:'0.5rem'}} aria-label="simple table">
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
                <TableRow key={row.keyword}>
                <TableCell align="center" sx={{fontFamily:'KIMM_Bold', padding: '0rem 1rem'}}>{row.rank}</TableCell>
                <TableCell align="center" sx={{fontFamily:'KIMM_Bold', padding: '0rem'}}>
                    {row.rankChange > 0 ? (
                    <ArrowUpwardIcon sx={{ fontSize: 16, color: 'red' }} />
                    ) : row.rankChange < 0 ? (
                    <ArrowDownwardIcon sx={{ fontSize: 16, color: 'blue' }} />
                    ) : (
                    <RemoveIcon sx={{ fontSize: 16, color: 'gray' }} />
                    )}
                    {Math.abs(row.rankChange)}
                </TableCell>
                <TableCell align="center" sx={{fontFamily:'KIMM_Bold', padding: '0.4rem'}}>{row.keyword}</TableCell>
                </TableRow>
            ))}
            </TableBody>
      </Table>
    </TableContainer>
  );
}
