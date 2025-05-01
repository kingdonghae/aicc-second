"""
====================================================================
파일명   : rank_model.py
작성자   : jungeun
작성일자 : 2025-04-30
설명     : 검색 순위 페이지 SQL 쿼리를 정의하는 모델 모듈
           - 일간, 주간, 월간 검색 순위 쿼리
           - 주소 검색 순위 조회 쿼리
====================================================================
"""

# 오늘 검색 순위 테이블 조회
def get_daily_rank_query():
    return """
                SELECT
                      KEYWORD                                                   AS keyword         # 검색어
                    , COUNT                                                     as count           # 검색 수
                    , CURRENT_RANKING                                           AS currentRank     # 현재 순위    
                    , PREVIOUS_RANKING                                          AS previousRank      # 이전 순위    
                    , 'daily'                                                   AS periodType      # 기간 구분
                FROM SEARCH_RANKING_DAILY
                WHERE DATE(CREATED_AT) = CURDATE()
                ORDER BY COUNT DESC
                LIMIT 5
           """

# 주간 검색 순위 테이블 조회
def get_weekly_rank_query():
    return """
                SELECT
                      KEYWORD                                                       AS keyword             # 검색어
                    , COUNT                                                         AS count               # 검색 수
                    , ROW_NUMBER() OVER (ORDER BY COUNT DESC)                       AS currentRank         # 현재 순위
                    , PREVIOUS_RANKING                                              AS previousRank          # 이전 순위
                    , 'weekly'                                                      AS periodType          # 기간 구분
                FROM SEARCH_RANKING_WEEKLY
                WHERE RANKING_WEEK = YEARWEEK(NOW())
                ORDER BY COUNT DESC
                LIMIT 5
    """

# 월간 검색 순위 테이블 조회
def get_monthly_rank_query():
    return """
                SELECT
                      KEYWORD                                                      AS keyword             # 검색어
                    , COUNT                                                        AS count               # 검색 수
                    , ROW_NUMBER() OVER (ORDER BY COUNT DESC)                      AS currentRank         # 현재 순위
                    , PREVIOUS_RANKING                                             AS previousRank          # 이전 순위
                    , 'monthly'                                                    AS periodType          # 기간 구분
                FROM SEARCH_RANKING_MONTHLY
                WHERE DATE_FORMAT(CREATED_AT, '%Y-%m') = DATE_FORMAT(CURDATE(), '%Y-%m')
                ORDER BY COUNT DESC
                LIMIT 5
    """

# 특정 주소 키워드의 일간 랭킹 조회
def get_keyword_rank_query():
    return """
                WITH RANKED AS (
                    SELECT
                          KEYWORD                                 AS keyword         # 검색어
                        , COUNT                                   AS count           # 검색 수
                        , ROW_NUMBER() OVER (ORDER BY COUNT DESC) AS currentRank     # 현재 순위
                    FROM SEARCH_RANKING_DAILY
                )
                SELECT *
                FROM RANKED
                WHERE KEYWORD = %s
    """

# 오늘 검색 순위 테이블에 동일한 검색 키워드 유무
def check_duplicate_search_rank_query():
    return """
                SELECT 1
                FROM SEARCH_RANKING_DAILY
                WHERE KEYWORD = %s
                  AND DATE(CREATED_AT) = CURDATE()
                LIMIT 1
    """

# 오늘 검색 순위 카운트 업데이트
def update_search_count_query():
    return """
                UPDATE SEARCH_RANKING_DAILY
                SET COUNT = COUNT + 1,
                    UPDATED_AT = NOW()
                WHERE KEYWORD = %s
    """

# 오늘 검색 순위 데이터 삽입
def insert_search_keyword_query():
    return """
                INSERT INTO SEARCH_RANKING_DAILY (
                    KEYWORD,
                    COUNT,
                    CURRENT_RANKING
                )
                VALUES (%s, 1, 0)
    """



