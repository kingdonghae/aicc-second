"""
====================================================================
파일명   : noise_model.py
작성자   : guseop
작성일자 : 2025-05-14
설명     : - 주어진 좌표 기준으로 가장 가까운 동(full_adrs_admin)과 소음 점수(score)를 조회
====================================================================
"""

# 주어진 좌표(lng, lat)를 기준으로 가장 가까운 동과 해당 위치의 소음 점수(score)를 조회하는 SQL 쿼리를 반환
def get_dong_noise():
    return """
                SELECT 
                     full_adrs_admin
                   , score
                FROM 
                     noise_score
                ORDER BY 
                     ST_Distance_Sphere(
                        POINT(lng, lat),
                        POINT(%s, %s)
                     ) 
                LIMIT 1;
    """
