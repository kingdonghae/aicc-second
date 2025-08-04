def get_all_dong_scores_query():
    return """
        SELECT 
            full_adr,
            only_dong,
            amenities_score,
            crime_score,
            facility_score,
            noise_score,
            population_score,
            rent_score,
            subway_score
        FROM
            area_score
    """
