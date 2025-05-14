"""
====================================================================
파일명   : search_model.py
작성자   : jungeun
작성일자 : 2025-05-01
설명     : 메인 & 지도 페이지에서 주소 검색 시 로그 저장 SQL 쿼리를 정의하는 모델 모듈
           - log insert 쿼리
====================================================================
"""

# 주소 검색 시 로그 저장
def insert_search_log_query():
    return """
                INSERT IGNORE INTO SEARCH_LOG
                ( 
                    KEYWORD
                  , USER_ID
                  , CLIENT_ID
                )
                VALUES (%s, %s, %s)
       """
