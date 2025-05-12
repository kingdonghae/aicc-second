from flask import Blueprint, request, jsonify
from db import get_connection  # DB 연결 함수
from services.population_service import get_population_score

population_bp = Blueprint('population', __name__)

@population_bp.route('/population', methods=['POST'])
def get_average_score():
    try:
        data = request.get_json()
        lat = data.get('lat')
        lng = data.get('lng')
        return get_population_score(lng,lat)

    except (TypeError, ValueError):
        return jsonify({'error': 'Invalid or missing parameters'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500
