from services.facility_service import get_facility_safe_score
from services.cctv_service import get_cctv_score
from services.crime_service import get_crime_score

def convert_crime_score(raw_score):
    mapping = {1: 10, 2: 8, 3: 6, 4: 4, 5: 2}
    return mapping.get(raw_score, 0)

def get_weighted_safety_score(lng, lat):
    facility_score = get_facility_safe_score(lng, lat).get("score", 0)
    cctv_score = get_cctv_score(lng, lat).get("score", 0)
    raw_crime_score = get_crime_score(lng, lat).get("score", 0)

    crime_score = convert_crime_score(raw_crime_score)

    facility_weight = 0.33
    cctv_weight = 0.33
    crime_weight = 0.34

    combined_score = (facility_score * facility_weight) + \
                (cctv_score * cctv_weight) + \
                (crime_score * crime_weight)

    rounded_score = round(combined_score, 4)

    print(f"🔍 가중치 적용된 안전 점수: facility({facility_score * facility_weight:.2f}) + " +
          f"cctv({cctv_score * cctv_weight:.2f}) + crime({crime_score * crime_weight:.2f}) = {rounded_score}")

    return {"score": rounded_score}
