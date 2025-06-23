from flask import Blueprint, request, jsonify
from services.population_service import get_population_score
from services.rent_service import get_rent_score
from services.crime_score_service import get_weighted_safety_score
from services.amenities_service import get_amenities_score
from services.subway_service import get_subway_score
from services.noise_service import get_noise_score

score_bp = Blueprint("score", __name__)

@score_bp.route("/score", methods=["POST"])
def get_combined_score():
    data = request.get_json()
    lat = data.get("lat")
    lng = data.get("lng")

    population = get_population_score(lng, lat)
    rent = get_rent_score(lng, lat)
    safety = get_weighted_safety_score(lng, lat)
    amenites = get_amenities_score(lng, lat)
    subway = get_subway_score(lng,lat)
    noise  = get_noise_score(lng, lat)

    print(f"📍 전달된 좌표: lat={lat}, lng={lng}")
    
    return jsonify({
        "population": population.get("score", 0),
        "rent": rent.get("score", 0),
        "safety": safety.get("score", 0),
        "infra":amenites.get("score", 0),
        "traffic" : subway.get("score", 0),
        "noise": noise.get("score",0)
    })
