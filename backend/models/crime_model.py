"""
====================================================================
파일명   : crime_model.py
작성자   : guseop
작성일자 : 2025-05-14
설명     : - crime_score 테이블에서 주어진 좌표 기준으로
            가장 가까운 행정주소와 치안 점수를 조회
====================================================================
"""

def get_nearest_crime_score():
    return """
                SELECT 
                     SCORE               AS score             /*치안 점수*/
                   , FULL_ADRS_ADMIN     AS full_adrs_admin   /*행정동 점수*/
                FROM 
                     crime_score
                ORDER BY 
                     ST_Distance_Sphere(
                        POINT(LNG, LAT)
                      , POINT(%s, %s)
                     ) 
                LIMIT 1
    """
