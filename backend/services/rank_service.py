"""
====================================================================
파일명   : rank_service.py
작성자   : jungeun
작성일자 : 2025-04-30
설명     : 주소 검색 순위 조회 비즈니스 로직 처리
           - 일간/주간/월간 주소 검색 순위 통합 조회
           - 특정 주소 키워드의 현재 순위 조회
           - DB 연결 및 쿼리 실행 처리 포함
====================================================================
"""

from backend.db import get_connection
from backend.models.rank_model import (
    get_daily_rank_query,
    get_weekly_rank_query,
    get_monthly_rank_query,
    get_keyword_rank_query
)


# 일간/주간/월간 별 주소 검색 순위 테이블 데이터 조회
def fetch_all_rankings():
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            combined_query = f"""
                ({get_daily_rank_query()})
                UNION ALL
                ({get_weekly_rank_query()})
                UNION ALL
                ({get_monthly_rank_query()});
            """
            cursor.execute(combined_query)
            results = cursor.fetchall()
            for row in results:
                current = row.get('currentRank')
                previous = row.get('previousRank')

                if isinstance(current, int) and isinstance(previous, int):
                    row['rankChange'] = previous - current
                else:
                    row['rankChange'] = 0

            return results
    finally:
        connection.close()


# 특정 주소 키워드의 일간 랭킹 데이터 조회
def fetch_keyword_ranking(keyword):
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute(get_keyword_rank_query(), (keyword,))
            return cursor.fetchall()
    finally:
        connection.close()
