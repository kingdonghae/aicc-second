
def get_rent_query():
    return """
                SELECT 
                    AVG(score) AS avg_score
                FROM 
                    rent_score
                WHERE 
                    ST_Distance_Sphere(
                        POINT(lng, lat),
                        POINT(%s, %s)
                    ) <= 1000;           # 반경(미터 기준)
     """
