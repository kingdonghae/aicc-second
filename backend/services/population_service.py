from db import get_connection
from models.population_model import get_population_query

def get_population_score(lng, lat):
    connection = get_connection()
    
    if not lng or not lat:
        return {"score": 0}

    try:
        with connection.cursor() as cursor:
            sql = get_population_query()
            cursor.execute(sql, (lng, lat))
            result = cursor.fetchone()

            if result and result.get("avg_score") is not None:
                print("🔥 조회된 결과:", result)
                return {"score": result["avg_score"]}
            else:
                return {"score": 0}

    except Exception as e:
        print("❌ 인구 오류 발생:", e)
        return {"score": 0}

    finally:
        connection.close()
