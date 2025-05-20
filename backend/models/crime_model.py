
def get_nearest_crime_score():
    return """
                SELECT 
                     SCORE               AS score            
                   , FULL_ADRS_ADMIN     AS full_adrs_admin   
                FROM 
                     crime_score
                ORDER BY 
                     ST_Distance_Sphere(
                        POINT(LNG, LAT)
                      , POINT(%s, %s)
                     ) 
                LIMIT 1
    """
