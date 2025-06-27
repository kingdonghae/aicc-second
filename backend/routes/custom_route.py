from flask import Blueprint, request, jsonify
from services.custom_service import custom_request

custom_bp = Blueprint('custom', __name__)

@custom_bp.route('/custom/api', methods=["POST"])
def handle_custom():
    data = request.json
    selected_item = data.get('selectedItem')
    inputs = data.get('inputs')
    
    result = custom_request(selected_item, inputs)
    return jsonify(result)