"""
====================================================================
파일명   : facility_model.py
작성자   : guseop
작성일자 : 2025-05-14
설명     : - 전체 시설 목록(id, name, lat, lng, description)을 조회
          - 주어진 좌표와 가장 가까운 시설의 안전 점수(safe_score)를 조회
====================================================================
"""

# 시설 전체 목록을 조회하는 SQL 쿼리를 반환
def get_facilities_query():
    return """
                SELECT
                    ID              as id             /*키 값*/
                   ,NAME            as name           /*시설물 명*/
                   ,LAT             as lat            /*위도*/
                   ,LNG             as lng            /*경도*/
                   ,DESCRIPTION     as description    /*설명*/
                FROM
                    FACILITY_SCORE
    """

# 주어진 좌표(lng, lat)로부터 가장 가까운 시설의 안전 점수(safe_score)를 조회하는 SQL 쿼리를 반환
def get_facility_safe_score_query():
    return """
                SELECT 
                     SAFE_SCORE   as safe_score     /*안전 점수*/
                FROM 
                     FACILITY_SCORE
                ORDER BY 
                     ST_DISTANCE_SPHERE(
                        POINT(LNG, LAT)
                      , POINT(%s, %s)
                     ) 
                LIMIT 1
    """
