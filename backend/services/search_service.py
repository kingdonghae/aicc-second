
from flask import jsonify

from db import get_connection
from models.search_model import insert_search_log_query
from services.rank_service import insert_search_keyword


def log_search_keyword(keyword, user_id=None, client_id=None):
    if not keyword:
        return jsonify({"error": "검색어가 없습니다."}), 400

    if not user_id and not client_id:
        return jsonify({"error": "user_id 또는 ip_address는 필수입니다."}), 400

    if user_id:
        client_id = None

    sql = insert_search_log_query()
    connection = get_connection()

    try:
        with connection.cursor() as cursor:
            cursor.execute(sql, (
                keyword,
                user_id,
                client_id
            ))
            connection.commit()

            if cursor.rowcount == 1:
                insert_search_keyword(keyword)
                return jsonify({"status": "ok", "message": "신규 검색 기록 저장"}), 200
            else:
                return jsonify({"status": "ok", "message": "이미 검색한 기록입니다."}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        connection.close()
