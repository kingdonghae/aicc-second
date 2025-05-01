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

from backend.db import get_connection
from backend.models.search_model import insert_search_log_query, check_duplicate_search_query
from backend.services.rank_service import has_searched_rank, update_search_count, insert_search_keyword


# 주소 검색 시 로그 저장
def log_search_keyword(keyword, user_id=None, ip_address=None):
    if not keyword:
        return jsonify({"error": "검색어가 없습니다."}), 400

    if not user_id and not ip_address:
        return jsonify({"error": "user_id 또는 ip_address는 필수입니다."}), 400

    # 동일인이 오늘 같은 주소를 검색한 적 있는지 체크
    if has_searched_today(keyword, user_id, ip_address):
        return jsonify({"status": "skipped", "message": "이미 검색된 기록 있음"}), 200

    # 검색 순위 테이블 (있으면 count++, 없으면 INSERT)
    if has_searched_rank(keyword):
        update_search_count(keyword)
    else:
        insert_search_keyword(keyword)

    # 3. 검색 로그 저장
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

        return jsonify({"status": "ok", "message": "로그 저장 및 순위 갱신 완료"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        connection.close()

# 오늘자 동일 사용자의 같은 주소 검색 유무 조회
def has_searched_today(keyword, user_id=None, ip_address=None):
    if not keyword or (not user_id and not ip_address):
        return False

    sql = check_duplicate_search_query()
    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute(sql, (keyword, user_id, ip_address))
            return cursor.fetchone() is not None
    finally:
        conn.close()


