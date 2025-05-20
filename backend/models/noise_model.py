
def get_dong_noise():
    return """
                SELECT 
                     full_adrs_admin
                   , score
                FROM 
                     noise_score
                ORDER BY 
                     ST_Distance_Sphere(
                        POINT(lng, lat),
                        POINT(%s, %s)
                     ) 
                LIMIT 1;
    """
