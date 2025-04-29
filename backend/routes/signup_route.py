from flask import Blueprint, request, jsonify
from services.signup_service import signup_user

# blueprint lib 매서드
signup_bp = Blueprint('signup', __name__)

@signup_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    response, status_code = signup_user(data)
    return jsonify(response), status_code
