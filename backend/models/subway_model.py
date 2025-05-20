
def get_dong_subway():
    return """
        SELECT 
             FULL_ADRS_ADMIN AS full_adrs_admin
        FROM 
             SUBWAY_SCORE
        ORDER BY 
            ST_Distance_Sphere(
                POINT(lng, lat),
                POINT(%s, %s)
            ) 
        LIMIT 1;
    """
