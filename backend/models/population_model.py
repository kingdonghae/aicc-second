
def get_population_query():
    return """
                SELECT 
                    AVG(score) AS score
                FROM 
                    population_score
                WHERE 
                    6371000 * 2 * ASIN(
                        SQRT(
                            POWER(SIN(RADIANS((lat - %s) / 2)), 2) +
                            COS(RADIANS(%s)) * COS(RADIANS(lat)) *
                            POWER(SIN(RADIANS((lng - %s) / 2)), 2)
                        )
                    ) < 500;           # 반경(미터 기준)
     """
