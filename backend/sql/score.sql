SELECT 
    AVG(score) AS avg_score
FROM 
    rent_score
WHERE 
    ST_Distance_Sphere(
        POINT(lng, lat),
        POINT(%s, %s)    #경도, 위도
    ) <= 1000;



SELECT 
    AVG(score) AS avg_score
FROM 
    population_score
WHERE 
    ST_Distance_Sphere(
        POINT(lng, lat),
        POINT(%s, %s)    #경도, 위도
    ) <= 1000;



SELECT 
    AVG(score) AS avg_score
FROM 
    cctv_score
WHERE 
    ST_Distance_Sphere(
        POINT(lng, lat),
        POINT(%s, %s)    #경도, 위도
    ) <= 1000;