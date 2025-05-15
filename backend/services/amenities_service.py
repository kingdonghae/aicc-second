from db import get_connection
import pymysql
from models.amenities_model import get_nearest_crime_score

def get_amenities_score(lng, lat):
    connection = get_connection()

    try:
        with connection.cursor(pymysql.cursors.DictCursor) as cursor:
            # 가장 가까운 위치의 편의시설 점수 가져오기
            sql = get_nearest_crime_score()
            cursor.execute(sql, (lng, lat))
            result = cursor.fetchone()
            
            if result and "amenities_score" in result:
                print(f"✅ 찾은 행정동: {result['full_adrs_admin']}")
                print(f"✅ 편의시설 점수: {result['amenities_score']}")
                return {"score": int(result['amenities_score'])}
            else:
                print("❌ 편의시설 점수 정보 없음")
                return {"score": 0}

    except Exception as e:
        print(f"❌ 편의시설 점수 계산 오류: {e}")
        return {"score": 0}

    finally:
        connection.close()

# 행정동 기준으로 편의시설 점수 조회 (추가 기능)
def get_amenities_score_by_dong(dong_name):
    connection = get_connection()

    try:
        with connection.cursor(pymysql.cursors.DictCursor) as cursor:
            sql = """
                SELECT 
                    full_adrs_admin, 
                    score, 
                    COUNT(*) as facility_count 
                FROM amenities_score 
                WHERE full_adrs_admin LIKE %s
                GROUP BY full_adrs_admin, score
                LIMIT 1
            """
            cursor.execute(sql, (f"%{dong_name}%",))
            result = cursor.fetchone()
            
            if result and "score" in result:
                print(f"✅ 조회 행정동: {result['full_adrs_admin']}")
                print(f"✅ 편의시설 점수: {result['score']}")
                print(f"✅ 편의시설 개수: {result['facility_count']}")
                return {
                    "score": int(result['score']),
                    "facility_count": int(result['facility_count']),
                    "dong": result['full_adrs_admin']
                }
            else:
                print(f"❌ '{dong_name}'에 대한 편의시설 점수 정보 없음")
                return {"score": 0, "facility_count": 0, "dong": dong_name}

    except Exception as e:
        print(f"❌ 편의시설 점수 조회 오류: {e}")
        return {"score": 0, "facility_count": 0, "dong": dong_name}

    finally:
        connection.close()