
def get_amenities_query():
    return """
                SELECT 
                     AMENITIES_SCORE      AS amenities_score    
                   , FULL_ADRS_ADMIN      AS full_adrs_admin    
                FROM 
                     amenities_score
                ORDER BY 
                     ST_Distance_Sphere(
                         POINT(LNG, LAT)
                       , POINT(%s, %s)
                     ) 
                LIMIT 1
    """
