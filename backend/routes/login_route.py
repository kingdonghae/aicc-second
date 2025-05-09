from flask import Blueprint, request, jsonify
from services.login_service import login_user

# blueprint lib 매서드
login_bp = Blueprint('login', __name__, url_prefix='/login')

@login_bp.route('/', methods=['POST'])
def login():
    data = request.get_json()
    response, status_code = login_user(data)
    return jsonify(response), status_code
