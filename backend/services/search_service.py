"""
====================================================================
파일명   : search_service.py
작성자   : jungeun
작성일자 : 2025-05-01
설명     : 메인 & 지도 페이지에서 주소 검색 시 로그 저장 로직 처리
            - 검색 시 같은 유저 또는 ip에서 당일 같은 검색 값 있는지 조회
            - 검색 로그 저장
====================================================================
"""
from flask import jsonify

from db import get_connection
from models.search_model import insert_search_log_query
from services.rank_service import insert_search_keyword


# 주소 검색 시 로그 저장
def log_search_keyword(keyword, user_id=None, ip_address=None):
    if not keyword:
        return jsonify({"error": "검색어가 없습니다."}), 400

    if not user_id and not ip_address:
        return jsonify({"error": "user_id 또는 ip_address는 필수입니다."}), 400


    # 검색 카운트 업데이트
    insert_search_keyword(keyword)

    # 검색 로그 저장
    sql = insert_search_log_query()
    connection = get_connection()

    try:
        with connection.cursor() as cursor:
            cursor.execute(sql, (
                keyword,
                user_id,
                ip_address
            ))
        connection.commit()

        return jsonify({"status": "ok", "message": "로그 저장 및 카운트 갱신 완료"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        connection.close()

