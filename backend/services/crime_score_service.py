# backend/services/score_service.py

from services.facility_service import get_facility_safe_score
from services.cctv_service import get_cctv_score
from services.crime_service import get_crime_score

def convert_crime_score(raw_score):
    # crime_score는 낮을수록 안전(1이 가장 안전)하므로 변환이 필요함
    mapping = {1: 10, 2: 8, 3: 6, 4: 4, 5: 2}
    return mapping.get(raw_score, 0)  # 기본값 0

def get_weighted_safety_score(lng, lat):
    # 각 요소별 점수 가져오기
    facility_score = get_facility_safe_score(lng, lat).get("score", 0)
    cctv_score = get_cctv_score(lng, lat).get("score", 0)
    raw_crime_score = get_crime_score(lng, lat).get("score", 0)

    # crime_score 변환 (낮은 값이 좋은 것을 높은 값이 좋은 것으로 변경)
    crime_score = convert_crime_score(raw_crime_score)

    # 가중치 설정 (세 요소 각각 1/3씩)
    facility_weight = 0.33
    cctv_weight = 0.33
    crime_weight = 0.34  # 소수점 오차 방지를 위해 0.34

    combined_score = (facility_score * facility_weight) + \
                (cctv_score * cctv_weight) + \
                (crime_score * crime_weight)

    # 소수점 3자리까지 반올림
    rounded_score = round(combined_score, 4)

    print(f"🔍 가중치 적용된 안전 점수: facility({facility_score * facility_weight:.2f}) + " +
          f"cctv({cctv_score * cctv_weight:.2f}) + crime({crime_score * crime_weight:.2f}) = {rounded_score}")

    return {"score": rounded_score}
