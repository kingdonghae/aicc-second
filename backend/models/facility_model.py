# backend/models/facility_model.py

def get_facilities_query():
    return """
        SELECT
            id,
            name,
            lat,
            lng,
            description
        FROM
            facility_score
    """
# backend/models/facility_model.py

# 기존 코드 유지
def get_facilities_query():
    return """
        SELECT id, name, lat, lng, description
        FROM facility_score
    """

# 새로 추가하는 함수
def get_facility_safe_score_query():
    return """
        SELECT safe_score
        FROM facility_score
        ORDER BY ST_Distance_Sphere(POINT(lng, lat), POINT(%s, %s)) ASC
        LIMIT 1
    """
