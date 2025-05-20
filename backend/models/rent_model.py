
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
