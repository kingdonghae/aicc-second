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
    import { useMonthSelector } from "@/pages/rank/hook/useMonthSelector.js";
    import { useWeekSelector } from "@/pages/rank/hook/useWeekSelector.js";
    import { useTodaySelector } from "@/pages/rank/hook/useTodaySelector.js";

export default function RankTable({ rankData }) {

    return (
        <TableContainer component={Paper}>
            <Table sx={{ fontSize: '0.5rem', padding: '0rem' }} aria-label="simple table">
                <TableBody>
                    {rankData && rankData.length > 0 ? (
                        rankData.map((row) => (
                            <TableRow key={row.keyword}>
                                <TableCell align="center" sx={{ fontFamily: 'Pretendard-Regular', fontWeight: '600', padding: '0rem 1rem' }}>{row.currentRank}</TableCell>
                                <TableCell align="center" sx={{ fontFamily: 'Pretendard-Regular', fontWeight: '600', padding: '0rem' }}>
                                    {row.diffRank === 0 ? (
                                        <RemoveIcon sx={{ fontSize: 16, color: 'gray' }} />
                                    ) : (
                                        <>
                                            {row.diffRank > 0 ? (
                                                <ArrowUpwardIcon sx={{ fontSize: 18, color: 'red'}} />
                                            ) : (
                                                <ArrowDownwardIcon sx={{ fontSize: 18, color: 'blue' }} />
                                            )}
                                            {Math.abs(row.diffRank)}
                                        </>
                                    )}
                                </TableCell>
                                <TableCell align="center" sx={{ fontFamily: 'Pretendard-Regular', fontWeight: '600', fontSize: '0.7rem', padding: '0.4rem', width: "600px" }}>
                                    {row.keyword}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3} align="center" sx={{ minHeight: '280px', fontSize: '20px', padding: '140px 0' }}>
                                검색 키워드가 존재하지 않습니다.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}