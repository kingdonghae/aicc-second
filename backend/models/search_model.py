"""
====================================================================
파일명   : search_model.py
작성자   : jungeun
작성일자 : 2025-05-01
설명     : 메인 & 지도 페이지에서 주소 검색 시 로그 저장 SQL 쿼리를 정의하는 모델 모듈
           - log insert 쿼리
           - 같은 유저 또는 ip에서 당일 같은 검색 값 있는지 조회
====================================================================
"""

# 주소 검색 시 로그 저장
def insert_search_log_query():
    return """
                INSERT INTO SEARCH_LOG
                ( 
                    KEYWORD
                  , USER_ID
                  , IP_ADDRESS
                )
                VALUES (%s, %s, %s)
       """

# 오늘자 동일 사용자의 같은 주소 검색 유무 조회
def check_duplicate_search_query():
    return """
                SELECT 1
                FROM SEARCH_LOG
                WHERE KEYWORD = %s
                  AND DATE(SEARCHED_AT) = CURDATE()
                  AND (USER_ID = %s OR IP_ADDRESS = %s)
                LIMIT 1
    """