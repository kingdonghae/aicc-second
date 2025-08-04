import * as React from 'react';
import { useState, useEffect } from 'react'; // useState와 useEffect 임포트
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import RemoveIcon from '@mui/icons-material/Remove';

export default function RankTable({ rankData }) {
    const MIN_ROWS = 5; // 최소 유지할 행의 개수
    const ANIMATION_DELAY = 100; // 각 행이 나타나는 시간 간격 (ms)
    const ANIMATION_DURATION = 300; // 각 행이 페이드인되는 시간 (ms)
    const NO_DATA_MESSAGE_TIMEOUT = 3000; // '검색 키워드 없음' 메시지 표시 지연 시간 (ms)

    // 각 행의 투명도 상태를 관리하는 배열 (페이드인 애니메이션용)
    const [rowOpacities, setRowOpacities] = useState([]);
    // '검색 키워드가 존재하지 않습니다' 메시지 표시 여부 상태
    const [showNoDataMessage, setShowNoDataMessage] = useState(false);

    // 랭크 데이터 로딩 및 애니메이션, 메시지 지연 처리
    useEffect(() => {
        // rankData가 유효하고 데이터가 있을 때
        if (rankData && rankData.length > 0) {
            setRowOpacities(rankData.map(() => 0)); // 모든 행을 처음에는 투명하게 (0) 설정
            setShowNoDataMessage(false); // 데이터가 있으므로 메시지 숨김 (이전 타이머가 있었다면 무효화됨)

            rankData.forEach((_, index) => {
                setTimeout(() => {
                    setRowOpacities(prevOpacities => {
                        const newOpacities = [...prevOpacities];
                        newOpacities[index] = 1; // 해당 인덱스의 opacity를 1로 변경 (불투명)
                        return newOpacities;
                    });
                }, index * ANIMATION_DELAY); // index에 따라 지연 시간 증가
            });
            // 데이터가 로드되면 NoDataMessage 타이머를 클리어할 필요는 없습니다.
            // 아래 else 블록에서 새로운 타이머가 시작될 때 이전 타이머가 클리어됩니다.
        }
        // rankData가 없거나 비어있을 때 (데이터 로딩 중이거나 실제 데이터가 없는 경우)
        else {
            // 메시지를 바로 숨기고, 일정 시간 후에 표시할 타이머 설정
            setShowNoDataMessage(false);
            const timer = setTimeout(() => {
                setShowNoDataMessage(true);
            }, NO_DATA_MESSAGE_TIMEOUT);

            // 컴포넌트 언마운트 또는 rankData 변경 시 (새로운 데이터가 들어오거나 다시 비어질 때)
            // 이전 타이머를 클리어하여 예상치 못한 동작 방지
            return () => clearTimeout(timer);
        }
    }, [rankData]); // rankData가 변경될 때마다 이 이펙트가 실행됩니다.


    // 실제 랭크 데이터를 기반으로 테이블 행 생성
    const actualRows = rankData && rankData.length > 0 ? (
        rankData.map((row, index) => (
            <TableRow
                key={row.keyword}
                style={{
                    opacity: rowOpacities[index] !== undefined ? rowOpacities[index] : 0, // 상태에 따른 opacity 적용
                    transition: `opacity ${ANIMATION_DURATION}ms ease-in` // 부드러운 전환 효과
                }}
            >
                <TableCell align="center" sx={{ fontFamily: 'Pretendard', fontWeight: '600', padding: '0rem 1rem' }}>{index + 1}</TableCell>
                <TableCell align="center" sx={{ fontFamily: 'Pretendard', fontWeight: '600', padding: '0rem' }}>
                    {row.diffRank === 0 ? (
                        <RemoveIcon sx={{ fontSize: 16, color: 'gray' }} />
                    ) : (
                        <>
                            {row.diffRank > 0 ? (
                                <ArrowUpwardIcon sx={{ fontSize: 18, color: 'red' }} />
                            ) : (
                                <ArrowDownwardIcon sx={{ fontSize: 18, color: 'blue' }} />
                            )}
                            {Math.abs(row.diffRank)}
                        </>
                    )}
                </TableCell>
                <TableCell align="center" sx={{ fontFamily: 'Pretendard', fontWeight: '600', fontSize: '0.7rem', padding: '0.4rem', width: "600px" }}>
                    {row.keyword}
                </TableCell>
            </TableRow>
        ))
    ) : (
        [] // rankData가 없거나 비어있으면 빈 배열 반환
    );

    // 최소 행 개수를 채우기 위한 빈 행(placeholder) 생성
    const emptyRowsCount = MIN_ROWS - actualRows.length;
    const placeholderRows = [];
    // 실제 데이터가 있을 때만 placeholder를 추가하여 MIN_ROWS를 채움
    if (rankData && rankData.length > 0 && emptyRowsCount > 0) {
        for (let i = 0; i < emptyRowsCount; i++) {
            placeholderRows.push(
                <TableRow key={`placeholder-${i}`} style={{ height: 'auto' }}>
                    <TableCell colSpan={3} sx={{ padding: '0.4rem', borderBottom: 'none' }}>
                        &nbsp; {/* 빈 셀을 위한 공백 */}
                    </TableCell>
                </TableRow>
            );
        }
    }

    // '검색 키워드가 존재하지 않습니다.' 메시지를 담을 내용
    const noDataMessageContent = (
        <TableRow>
            <TableCell colSpan={3} align="center" sx={{ minHeight: '280px', fontSize: '20px', padding: '140px 0' }}>
                검색 키워드가 존재하지 않습니다.
            </TableCell>
        </TableRow>
    );

    return (
        <TableContainer component={Paper}>
            <Table sx={{ fontSize: '0.5rem', padding: '0rem' }} aria-label="simple table" >
                <TableBody >
                    {/* rankData가 있고 데이터가 있을 때 (정상적인 랭킹 표시) */}
                    {rankData && rankData.length > 0 ? (
                        <>
                            {actualRows}
                            {placeholderRows} {/* 실제 데이터 뒤에 빈 행 추가 */}
                        </>
                    ) : (
                        // rankData가 없거나 비어있을 때
                        showNoDataMessage ? (
                            // 3초 후 메시지 표시
                            noDataMessageContent
                        ) : (
                            // 3초 동안 메시지 대신 MIN_ROWS만큼의 빈 행을 표시하여 레이아웃 유지
                            <>
                                {Array.from({ length: MIN_ROWS }).map((_, i) => (
                                    <TableRow key={`loading-placeholder-${i}`} style={{ height: 'auto' }}>
                                        <TableCell colSpan={3} sx={{ padding: '0.4rem', borderBottom: 'none' }}>
                                            &nbsp;
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </>
                        )
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}