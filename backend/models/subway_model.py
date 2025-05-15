def get_subway_query():
    return """
        SELECT full_adrs_admin
        FROM subway_score
        ORDER BY ST_Distance_Sphere(
            POINT(lng, lat),
            POINT(%s, %s)
        ) ASC
        LIMIT 1;
    """