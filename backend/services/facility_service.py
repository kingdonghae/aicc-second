# # backend/services/facility_service.py
# from flask import jsonify
# from db import get_connection
# from models.facility_model import get_facilities_query

# def get_facilities():
#     connection = get_connection()
#     try:
#         with connection.cursor() as cursor:
#             sql = get_facilities_query()
#             cursor.execute(sql)
#             facilities = cursor.fetchall()
#             return jsonify({"facilities": facilities})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
#     finally:
#         connection.close()

# backend/services/facility_service.py
import pymysql
from flask import jsonify
from db import get_connection
from models.facility_model import get_facilities_query, get_facility_safe_score_query

# 기존 함수 유지
def get_facilities():
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            sql = get_facilities_query()
            cursor.execute(sql)
            facilities = cursor.fetchall()
            return jsonify({"facilities": facilities})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        connection.close()

# 새로 추가하는 함수 - 안전 점수 가져오기
def get_facility_safe_score(lng, lat):
    connection = get_connection()
    
    try:
        with connection.cursor(pymysql.cursors.DictCursor) as cursor:
            sql = get_facility_safe_score_query()
            cursor.execute(sql, (lng, lat))
            result = cursor.fetchone()
            
            if result and result.get("safe_score") is not None:
                print(f"✅ 시설 안전 점수: {result['safe_score']}")
                return {"score": float(result["safe_score"])}
            else:
                print("⚠️ 시설 안전 점수 정보 없음")
                return {"score": 0}
                
    except Exception as e:
        print(f"❌ 시설 안전 점수 계산 오류: {e}")
        return {"score": 0}
        
    finally:
        connection.close()
