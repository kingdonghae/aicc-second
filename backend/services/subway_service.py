from db import get_connection
from models.subway_model import get_dong_subway
import pymysql

def get_subway_score(lng, lat):
    connection = get_connection()

    try:
        with connection.cursor(pymysql.cursors.DictCursor) as cursor:
            dong_sql = get_dong_subway()
            cursor.execute(dong_sql, (lng, lat))
            dong_result = cursor.fetchone()

            if not dong_result or "full_adrs_admin" not in dong_result:
                print("❌ 행정동 정보 없음")
                return {"score": 0}

            full_adrs_admin = dong_result["full_adrs_admin"]
            print(f"✅ 찾은 행정동: {full_adrs_admin}")

            subway_sql = """
                SELECT subway_score as score
                FROM subway_score
                WHERE full_adrs_admin = %s
            """
            cursor.execute(subway_sql, (full_adrs_admin,))
            score_result = cursor.fetchone()

            if score_result and "score" in score_result:
                print(f"✅ 지하철 점수: {score_result['score']}")
                return {"score": int(score_result["score"])}
            else:
                print("❌ 지하철 점수 정보 없음")
                return {"score": 0}

    except Exception as e:
        print(f"❌ 지하철 점수 계산 오류: {e}")
        return {"score": 0}

    finally:
        connection.close()
