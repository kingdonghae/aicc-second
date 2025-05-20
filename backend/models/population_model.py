
def get_population_query():
    return """
                SELECT 
                    AVG(SCORE)  AS avg_score
                FROM 
                    population_score
                WHERE 
                    ST_Distance_Sphere(
                        POINT(LNG, LAT),
                        POINT(%s, %s)
                    ) <= 1000;           
     """
