from flask import Blueprint, request, jsonify
from services.population_service import get_population_score
from services.rent_service import get_rent_score
from services.cctv_service import get_cctv_score
# + safety_service, noise_service 등 나중에 확장 가능

score_bp = Blueprint("score", __name__)

@score_bp.route("/score", methods=["POST"])
def get_combined_score():
    data = request.get_json()
    lat = data.get("lat")
    lng = data.get("lng")

    population = get_population_score(lng, lat)
    rent = get_rent_score(lng, lat)
    safety = get_cctv_score(lng, lat)

    print(f"📍 전달된 좌표: lat={lat}, lng={lng}")

    return jsonify({
        "population": population.get("score", 0),
        "rent": rent.get("score", 0),
        "safety": safety.get("score", 0),
        
    })