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
                    , DIFF_RANK                                                 AS diffRank        # 변동율    
                    , 'daily'                                                   AS periodType      # 기간 구분
                FROM SEARCH_RANKING_DAILY
                WHERE DATE(START_DATE) = DATE(now())
                ORDER BY COUNT DESC
                LIMIT 5
           """

# 주간 검색 순위 테이블 조회
def get_weekly_rank_query():
    return """
                SELECT
                      KEYWORD                                                       AS keyword             # 검색어
                    , COUNT                                                         AS count               # 검색 수
                    , CURRENT_RANK                                                  AS currentRank         # 현재 순위
                    , DIFF_RANK                                                     AS diffRank            # 변동율 
                    , 'weekly'                                                      AS periodType          # 기간 구분
                FROM SEARCH_RANKING_WEEKLY
                WHERE WEEK_START = STR_TO_DATE(CONCAT(%s, %s, '1'), '%%X%%V%%w')
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
                    , DIFF_RANK                                                    AS diffRank            # 변동율    
                    , 'monthly'                                                    AS periodType          # 기간 구분
                FROM SEARCH_RANKING_MONTHLY
                WHERE YEAR = %s AND MONTH = %s
                ORDER BY COUNT DESC
                LIMIT 5
    """

# 특정 주소 키워드의 일간 랭킹 조회
def get_keyword_rank_query():
    return """
                SELECT
                      KEYWORD                                 AS keyword         # 검색어
                    , COUNT                                   AS count           # 검색 수
                    , CURRENT_RANKING                         AS currentRank     # 현재 순위
                FROM SEARCH_RANKING_DAILY
                WHERE KEYWORD = %s 
                and start_date = current_date
    """

#  당일, 같은 유저 또는 ip로 중복 키워드 검색 유무 체크
def check_search_keyword_duplicate():
    return """
               SELECT COUNT(1)
                FROM SEARCH_LOG
                   WHERE (USER_ID  = %s AND KEYWORD = %s)
                      OR (IP_ADDRESS  = %s AND KEYWORD = %s)
                     AND DATE(SEARCHED_AT)   = DATE(NOW());
           """


# 주소 검색 시 실시간 카운트 증가
def insert_search_keyword_query():
    return """
                INSERT INTO SEARCH_RANKING_LIVE (KEYWORD, LIVE_COUNT)
                VALUES (%s, 1)
                ON DUPLICATE KEY UPDATE LIVE_COUNT = LIVE_COUNT + 1
    """



