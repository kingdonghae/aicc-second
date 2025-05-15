def get_nearest_crime_score():
    return """
        SELECT amenities_score, full_adrs_admin
        FROM amenities_score
        ORDER BY ST_Distance_Sphere(POINT(lng, lat), POINT(%s, %s)) ASC
        LIMIT 1
    """
