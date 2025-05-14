def get_dong_by_coords():
    return """
        SELECT full_adrs_admin
        FROM cctv_dong
        WHERE ST_Distance_Sphere(
            POINT(lng, lat),
            POINT(%s, %s)
        ) < 100
        LIMIT 1;
    """

def get_cctv_query():
    return "SELECT score FROM cctv_score WHERE full_adrs_admin = %s"
