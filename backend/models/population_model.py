"""
====================================================================
파일명   : population_model.py
작성자   : jungeun
작성일자 : 2025-05-08
설명     : - 주어진 좌표 기준 반경 1km 이내의 평균 인구 점수(avg_score)를 조회
====================================================================
"""

# 주어진 좌표(lng, lat)를 기준으로 반경 1km 이내에 있는 지역들의 평균 인구 점수(avg_score)를 조회하는 SQL 쿼리를 반환
def get_population_query():
    return """
                SELECT 
                    AVG(SCORE)  AS avg_score
                FROM 
                    population_score
                WHERE 
                    ST_Distance_Sphere(
                        POINT(LNG, LAT),
                        POINT(%s, %s)
                    ) <= 1000;           # 반경(미터 기준)
     """
