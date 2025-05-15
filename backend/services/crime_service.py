from db import get_connection
from models.crime_model import get_nearest_crime_score
import pymysql

def get_crime_score(lng, lat):
    connection = get_connection()

    try:
        with connection.cursor(pymysql.cursors.DictCursor) as cursor:
            # 가장 가까운 위치의 범죄 점수 가져오기
            sql = get_nearest_crime_score()
            cursor.execute(sql, (lng, lat))  # 위도, 경도 순서 주의
            result = cursor.fetchone()

            if result and "score" in result:
                print(f"✅ 찾은 행정동: {result['full_adrs_admin']}")
                print(f"✅ 범죄 점수: {result['score']}")
                return {"score": int(result['score'])}
            else:
                print("❌ 범죄 점수 정보 없음")
                return {"score": 0}

    except Exception as e:
        print(f"❌ 범죄 점수 계산 오류: {e}")
        return {"score": 0}

    finally:
        connection.close()
