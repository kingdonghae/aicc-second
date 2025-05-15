"""
====================================================================
파일명   : cctv_model.py
작성자   : sorang
작성일자 : 2025-05-12
설명     : - cctv_score테이블에서 주어진 좌표와 가장 가까운 동을 조회
          - 특정 행정주소에 해당하는 CCTV 안전 점수를 조회
====================================================================
"""

# 좌표와 가장 가까운 동을 조회
def get_dong_by_coords():
    return """
                SELECT 
                     FULL_ADRS_ADMIN  AS full_adrs_admin   /*행정동 주소*/
                FROM 
                     CCTV_SCORE
                ORDER BY 
                    ST_Distance_Sphere(
                        POINT(LNG, LAT)
                      , POINT(%s, %s)
                    ) 
                LIMIT 1
    """

# CCTV 안전 점수를 조회
def get_cctv_query():
    return """
                SELECT 
                     SCORE      AS score    /*안전 점수*/
                FROM 
                     CCTV_SCORE 
                WHERE 
                     FULL_ADRS_ADMIN = %s
     """
