from db import get_connection
import pymysql
from models.noise_model import get_dong_by_coords

def get_noise_score(lng, lat):
    connection = get_connection()

    try:
        with connection.cursor(pymysql.cursors.DictCursor) as cursor:
            # 가장 가까운 위치의 소음 점수 가져오기
            sql = get_dong_by_coords()
            cursor.execute(sql, (lng, lat))
            result = cursor.fetchone()

            if result and "score" in result:
                print(f"✅ 찾은 행정동: {result['full_adrs_admin']}")
                print(f"✅ 소음 점수: {result['score']}")
                return {"score": int(result['score'])}
            else:
                print("❌ 소음 점수 정보 없음")
                return {"score": 0}

    except Exception as e:
        print(f"❌ 소음 점수 계산 오류: {e}")
        return {"score": 0}

    finally:
        connection.close()
