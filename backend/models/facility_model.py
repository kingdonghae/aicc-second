
def get_facilities_query():
    return """
                SELECT
                    ID              as id             /*키 값*/
                   ,NAME            as name           /*시설물 명*/
                   ,LAT             as lat            /*위도*/
                   ,LNG             as lng            /*경도*/
                   ,DESCRIPTION     as description    /*설명*/
                FROM
                    FACILITY_SCORE
    """

def get_facility_safe_score_query():
    return """
                SELECT 
                     SAFE_SCORE   as safe_score     /*안전 점수*/
                FROM 
                     FACILITY_SCORE
                ORDER BY 
                     ST_DISTANCE_SPHERE(
                        POINT(LNG, LAT)
                      , POINT(%s, %s)
                     ) 
                LIMIT 1
    """
