
def get_nearest_crime_score():
    return """
                SELECT 
                     SCORE               AS score             /*치안 점수*/
                   , FULL_ADRS_ADMIN     AS full_adrs_admin   /*행정동 점수*/
                FROM 
                     crime_score
                ORDER BY 
                     ST_Distance_Sphere(
                        POINT(LNG, LAT)
                      , POINT(%s, %s)
                     ) 
                LIMIT 1
    """
