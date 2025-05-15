"""
====================================================================
파일명   : amenities_model.py
작성자   : guseop
작성일자 : 2025-05-14
설명     : 좌표로 부터 가장 가까운 위치의 생활 편의 점수와
          행정 주소를 조회 하는 SQL 쿼리를 반환
====================================================================
"""

# 좌표에서 가장 가까운 위치의 생활 편의 데이터(점수, 주소) 조회
def get_nearest_crime_score():
    return """
                SELECT 
                     AMENITIES_SCORE      AS amenities_score    /*생활 편의 점수*/
                   , FULL_ADRS_ADMIN      AS full_adrs_admin    /*행정 주소*/
                FROM 
                     amenities_score
                ORDER BY 
                     ST_Distance_Sphere(
                         POINT(LNG, LAT)
                       , POINT(%s, %s)
                     ) 
                LIMIT 1
    """
