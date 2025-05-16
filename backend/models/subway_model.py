"""
====================================================================
파일명   : subway_model.py
작성자   : guseop
작성일자 : 2025-05-14
설명     : - 주어진 좌표 기준으로 가장 가까운 동(full_adrs_admin)을
            subway_score 테이블에서 조회
====================================================================
"""

# 좌표를 기준으로 subway_score 테이블에서 가장 가까운 동을 조회
def get_dong_subway():
    return """
        SELECT 
             FULL_ADRS_ADMIN AS full_adrs_admin
        FROM 
             SUBWAY_SCORE
        ORDER BY 
            ST_Distance_Sphere(
                POINT(lng, lat),
                POINT(%s, %s)
            ) 
        LIMIT 1;
    """
