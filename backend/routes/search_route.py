
from flask import Blueprint, request
from services.search_service import log_search_keyword

search_bp = Blueprint('search', __name__)

@search_bp.route("/log-search", methods=["POST"])
def log_search_route():
    print(f"search_request: {request.json}")
    data = request.json or {}
    input_address = data.get("input_address", "").strip()
    keyword = data.get("keyword", "").strip()
    user_id = data.get("user_id")
    client_id = request.cookies.get("client_id")
    if not client_id:
        client_id = request.headers.get("X-Client-ID")

    return log_search_keyword(input_address, keyword, user_id, client_id)