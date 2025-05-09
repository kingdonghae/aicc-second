"""
====================================================================
파일명   : search_route.py
작성자   : jungeun
작성일자 : 2025-05-01
설명     : 메인 & 지도 페이지에서 주소 검색 시 로그 관련 API
====================================================================
"""
from flask import Blueprint, request, jsonify
from services.search_service import log_search_keyword

search_bp = Blueprint('search', __name__)

@search_bp.route("/log-search", methods=["POST"])
def log_search_route():
    """
    [POST] /search//log-search
     - 클라이언트에서 keyword, user_id || ip(택 1)를 전달하면
    - 당일 동일한 user_id 또는 ip_address로 같은 검색어가 검색된 적 있는지 확인
    - 없다면 검색 로그를 search_log 테이블에 저장
    - 검색어 순위 테이블에 count update or insert

    Query Parameters:
         Reqeust: JSON
         example:
            {
                "keyword": "서울 강남구 개포동",
                "user_id": "david123"       # 선택 (비회원일 경우 없음)
            }

    Returns:
        Response: JSON
        example:
            {
                "status": "ok",
                "message": "로그 기록됨"
            }
    """
    data = request.json or {}
    keyword = data.get("keyword", "").strip()
    user_id = data.get("user_id")
    ip_address = request.remote_addr

    return log_search_keyword(keyword,user_id, ip_address)

