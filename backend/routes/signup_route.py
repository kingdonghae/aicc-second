from flask import Blueprint, request, jsonify

from services.signup_service import signup_user, is_userid_available

# blueprint lib 매서드
signup_bp = Blueprint('signup', __name__, url_prefix='/signup')

@signup_bp.route('/check', methods=['GET'])
def check_userid():
    userid = request.args.get('userid')
    if not userid:
        return jsonify({'error': '아이디를 입력해주세요.'}), 400

    available = is_userid_available(userid)
    return jsonify({'available': available}), 200

@signup_bp.route('', methods=['POST'])
def signup():
    data = request.get_json()
    response, status_code = signup_user(data)
    return jsonify(response), status_code
