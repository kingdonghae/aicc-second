# backend/routes/facility_route.py
from flask import Blueprint, jsonify
from services.facility_service import get_facilities

facility_bp = Blueprint('facility', __name__)

@facility_bp.route('/facilities', methods=['GET'])
def get_all_facilities():
    return get_facilities()
