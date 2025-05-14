from db import get_connection
from models.cctv_model import get_cctv_query
from models.cctv_model import get_dong_by_coords  # 좌표로 동 찾기 쿼리

def get_cctv_score(lng, lat):
    connection = get_connection()

    try:
        with connection.cursor() as cursor:
            # ✅ 1. 좌표로 동 찾기
            dong_sql = get_dong_by_coords()
            cursor.execute(dong_sql, (lng, lat))
            dong_result = cursor.fetchone()
            if not dong_result or "full_adrs_admin" not in dong_result:
                print("❌ 행정동 정보 없음")
                return {"score": 0}

            full_adrs_admin = dong_result["full_adrs_admin"]

            # ✅ 2. 동 이름으로 CCTV 점수 조회
            cctv_sql = get_cctv_query()
            cursor.execute(cctv_sql, (full_adrs_admin,))
            score_result = cursor.fetchone()

            if score_result and score_result["score"] is not None:
                return {"score": int(score_result["score"])}
            else:
                return {"score": 0}

    except Exception as e:
        print("❌ CCTV 점수 계산 오류:", e)
        return {"score": 0}

    finally:
        connection.close()
