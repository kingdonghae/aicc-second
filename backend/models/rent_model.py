"""
====================================================================
파일명   : rent_model.py
작성자   : sorang
작성일자 : 2025-05-12
설명     : - 주어진 좌표 기준 반경 1km 이내의 평균 임대 점수(avg_score)를 조회
====================================================================
"""

# 주어진 좌표(lng, lat)를 기준으로 반경 1km 이내에 있는 평균 임대 점수(avg_score)를 조회
def get_rent_query():
    return """
                SELECT 
                    AVG(SCORE)      AS avg_score
                FROM 
                    RENT_SCORE
                WHERE 
                    ST_Distance_Sphere(
                        POINT(LNG, LAT),
                        POINT(%s, %s)
                    ) <= 1000;           # 반경(미터 기준)
     """
