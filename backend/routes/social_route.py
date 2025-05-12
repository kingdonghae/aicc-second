from flask import Blueprint, request, jsonify
import requests
from services.social_service import handle_social_login

social_bp = Blueprint('social', __name__, url_prefix='/social')

@social_bp.route('/kakao', methods=['POST'])
def kakao_login():
    access_token = request.json.get('access_token')
    if not access_token:
        return jsonify({'error': 'access_token이 필요합니다.'}), 400

    kakao_user_info = requests.get(
        'https://kapi.kakao.com/v2/user/me',
        headers={'Authorization': f'Bearer {access_token}'}
    ).json()

    response, status_code = handle_social_login('kakao', kakao_user_info)
    return jsonify(response), status_code
