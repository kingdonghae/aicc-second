SELECT 
    AVG(score) AS avg_score
FROM 
    rent_score
WHERE 
    ST_Distance_Sphere(
        POINT(lon, lat),
        POINT(126.97794, 37.52008)    #경도, 위도
    ) <= 1000;



SELECT 
    AVG(score) AS avg_score
FROM 
    population_score
WHERE 
    ST_Distance_Sphere(
        POINT(lon, lat),
        POINT(126.97794, 37.52008)    #경도, 위도
    ) <= 1000;

