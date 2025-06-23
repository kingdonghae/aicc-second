
def get_facilities_query():
    return """
                SELECT
                    ID              as id             
                   ,NAME            as name           
                   ,LAT             as lat            
                   ,LNG             as lng            
                   ,DESCRIPTION     as description    
                FROM
                    FACILITY_SCORE
    """

def get_facility_safe_score_query():
    return """
                SELECT 
                     SAFE_SCORE   as safe_score     
                FROM 
                     FACILITY_SCORE
                ORDER BY 
                     ST_DISTANCE_SPHERE(
                        POINT(LNG, LAT)
                      , POINT(%s, %s)
                     ) 
                LIMIT 1
    """
