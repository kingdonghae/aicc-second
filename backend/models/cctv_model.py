
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

def get_cctv_query():
    return """
                SELECT 
                     SCORE      AS score    /*안전 점수*/
                FROM 
                     CCTV_SCORE 
                WHERE 
                     FULL_ADRS_ADMIN = %s
     """
