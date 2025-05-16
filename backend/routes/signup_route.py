from flask import Blueprint, request, jsonify
from services.signup_service import signup_user, is_email_available, add_user_info

signup_bp = Blueprint('signup', __name__, url_prefix='/signup')

@signup_bp.route('/check', methods=['GET'])
def check_email():
    email = request.args.get('email')
    if not email:
        return jsonify({'error': '이메일을 입력해주세요.'}), 400
 
    available = is_email_available(email)
    return jsonify({'available': available}), 200

@signup_bp.route('', methods=['POST'])
def signup():
    data = request.get_json()
    print("Received signup data:", data)  # 로그로 확인
    if data is None:
        return jsonify({'error': '요청 본문이 비어 있습니다.'}), 400

    response, status_code = signup_user(data)
    return jsonify(response), status_code

@signup_bp.route('/<int:user_id>', methods=['PATCH'])
def add_info_user(user_id):
    data = request.get_json()
    response, status = add_user_info(user_id, data)
    return jsonify(response), status