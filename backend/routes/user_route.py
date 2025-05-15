from flask import Blueprint, request, jsonify
from services.user_service import fetch_user_info, modify_user_info

user_bp = Blueprint('user', __name__, url_prefix='/user')

@user_bp.route('/<int:user_id>', methods=['GET'])
def get_user(user_id):
    response, status = fetch_user_info(user_id)
    print(response)
    return jsonify(response), status

@user_bp.route('/<int:user_id>', methods=['PATCH'])
def update_user(user_id):
    data = request.get_json()
    response, status = modify_user_info(user_id, data)
    return jsonify(response), status
