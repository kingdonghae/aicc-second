from flask import jsonify

from db import get_connection
from models.population_model import get_population_query


def get_population_score(lon, lat):
    connection = get_connection()
    if not lon:
        return jsonify({"error": "경도 정보가 없습니다."}), 400
    if not lat:
        return jsonify({"error": "위도 정보가 없습니다."}), 400
    try:
        with connection.cursor() as cursor:
            sql = get_population_query()
            cursor.execute(sql,(lat, lat, lon))
            return cursor.fetchone()

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        connection.close()
