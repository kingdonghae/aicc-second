# custom_service.py - 개선된 디버깅 버전

import pymysql
from db import get_connection
from models.custom_model import get_all_dong_scores_query
import requests
import json

COLAB_API_URL = "https://b717f16842cd.ngrok-free.app"

def get_custom_result(selected_item, inputs):
    print(f"[DEBUG] 함수 시작 - selected_item: {selected_item}, inputs: {inputs}")
    
    user_text = inputs.get("userText", "").strip()
    print(f"[DEBUG] 처리된 user_text: '{user_text}'")

    predicted = {}
    
    # Colab AI 호출
    if user_text:
        predicted = call_colab_ai(user_text)
    else:
        print("[DEBUG] userText가 비어있어 기본값 사용")
        predicted = get_default_predictions()

    # AI 예측값 검증
    if all(value == 0 for value in predicted.values() if isinstance(value, (int, float))):
        print("❌ [CRITICAL ERROR] AI 모델이 모든 값을 0으로 반환했습니다!")
        print("❌ Colab 모델 상태를 확인하고 수정이 필요합니다.")
        print("❌ 현재 상태로는 정확한 추천을 제공할 수 없습니다.")

    # DB 데이터 가져오기
    rows = get_db_data()
    
    if not rows:
        print("경고: DB에서 데이터를 가져오지 못하여 추천을 수행할 수 없습니다.")
        return create_empty_result(selected_item, user_text, predicted)

    # 추천 결과 생성
    recommendations = generate_recommendations(rows, selected_item, predicted)
    
    final_result = {
        "selectedItem": selected_item,
        "userText": user_text,
        "predictedScores": predicted,
        "recommendations": recommendations
    }
    
    print(f"[DEBUG] 최종 결과 생성 완료 - 추천 지역 수: {len(recommendations)}")
    return final_result

def call_colab_ai(user_text):
    """Colab AI API 호출 함수"""
    try:
        print(f"[DEBUG 0] COLAB_API_URL 확인: {COLAB_API_URL}")
        print(f"[DEBUG 0-1] user_text 길이: {len(user_text)} 글자")
        print(f"[DEBUG 0-2] 요청 URL: {COLAB_API_URL}/api/classify")
        print(f"[DEBUG 0-3] 요청 데이터: {{'text': '{user_text}'}}")
        
        # 실제 요청 전송
        print(f"[DEBUG 1] Colab URL로 요청 전송: {COLAB_API_URL}/api/classify")
        print(f"[DEBUG 1] 전송할 텍스트: '{user_text}'")
        
        response = requests.post(
            f"{COLAB_API_URL}/api/classify",
            json={"text": user_text},
            timeout=15,  # 타임아웃 단축
            headers={'Content-Type': 'application/json'}
        )
        
        print(f"[DEBUG 2] 응답 상태 코드: {response.status_code}")
        print(f"[DEBUG 3] 응답 텍스트: {response.text}")
        print(f"[DEBUG 3-1] 응답 헤더: {dict(response.headers)}")
        
        if response.status_code != 200:
            print(f"❌ HTTP 오류: {response.status_code}")
            print(f"❌ 응답 내용: {response.text}")
            return get_default_predictions()

        colab_predictions = response.json()
        print(f"[DEBUG 4] 파싱된 JSON: {colab_predictions}")
        print(f"[DEBUG 4-1] JSON 타입: {type(colab_predictions)}")
        
        if isinstance(colab_predictions, dict):
            print(f"[DEBUG 4-2] JSON 키들: {list(colab_predictions.keys())}")
            # 각 키의 값과 타입 출력
            for key, value in colab_predictions.items():
                print(f"[DEBUG 4-3] {key}: {value} (타입: {type(value)})")
        else:
            print(f"[DEBUG 4-2] JSON이 딕셔너리가 아님: {colab_predictions}")

        # 예상되는 키들 확인
        expected_keys = ["amenities", "crime", "facility", "noise", "population", "subway"]
        missing_keys = [key for key in expected_keys if key not in colab_predictions]
        
        if missing_keys:
            print(f"⚠️ 누락된 키들: {missing_keys}")

        # 예측값 매핑
        predicted = {
            "amenities": colab_predictions.get("amenities", 0),
            "crime": colab_predictions.get("crime", 0),
            "facility": colab_predictions.get("facility", 0),
            "noise": colab_predictions.get("noise", 0),
            "population": colab_predictions.get("population", 0),
            "subway": colab_predictions.get("subway", 0),
            "rent": colab_predictions.get("rent", 0),  # rent는 Colab 모델에서 제공하지 않음
        }

        print(f"[DEBUG 5] 최종 predicted 딕셔너리: {predicted}")
        print(f"[SUCCESS] Colab AI 예측 성공")
        return predicted

    except requests.exceptions.Timeout as e:
        print(f"⚠️ [TIMEOUT] Colab AI 응답 시간 초과: {e}")
        return get_default_predictions()
    except requests.exceptions.ConnectionError as e:
        print(f"⚠️ [CONNECTION_ERROR] Colab AI 연결 오류: {e}")
        print(f"   URL 확인 필요: {COLAB_API_URL}")
        return get_default_predictions()
    except requests.exceptions.RequestException as e:
        print(f"⚠️ [REQUEST_ERROR] Colab AI 요청 오류: {e}")
        return get_default_predictions()
    except json.JSONDecodeError as e:
        print(f"❌ [JSON_ERROR] JSON 파싱 오류: {e}")
        return get_default_predictions()
    except Exception as e:
        print(f"❌ [GENERAL_ERROR] 예상치 못한 오류: {type(e).__name__}: {e}")
        import traceback
        print(f"[TRACEBACK] {traceback.format_exc()}")
        return get_default_predictions()

def get_default_predictions():
    """기본 예측값 반환"""
    return {"amenities": 0, "crime": 0, "facility": 0, "noise": 0, "population": 0, "subway": 0, "rent": 0}



def get_db_data():
    """DB에서 동 점수 데이터 가져오기"""
    connection = None
    try:
        print("[DEBUG 6] DB 연결 시도")
        connection = get_connection()
        print("[DEBUG 7] DB 연결 성공")
        
        with connection.cursor(pymysql.cursors.DictCursor) as cursor:
            sql = get_all_dong_scores_query()
            print(f"[DEBUG 8] SQL 실행: {sql}")
            cursor.execute(sql)
            rows = cursor.fetchall()
            print(f"[DEBUG 9] DB에서 가져온 행 수: {len(rows)}")
            
            if rows:
                print(f"[DEBUG 10] 첫 번째 행 샘플: {rows[0]}")
                # NULL 값 통계
                sample_row = rows[0]
                null_columns = [k for k, v in sample_row.items() if v is None]
                if null_columns:
                    print(f"[DEBUG 10-1] NULL 값이 있는 컬럼들: {null_columns}")
            else:
                print("[ERROR] DB에서 데이터를 가져오지 못했습니다!")
            
            return rows
                
    except Exception as e:
        print(f"❌ DB 작업 실패: {e}")
        return []
    finally:
        if connection:
            connection.close()
            print("[DEBUG 11] DB 연결 종료")

def generate_recommendations(rows, selected_item, predicted):
    """추천 지역 생성"""
    # 매핑 및 가중치 설정
    col_map = {
        "subway": "subway_score",
        "crime": "crime_score", 
        "rent": "rent_score",
        "noise": "noise_score",
        "population": "population_score",
        "amenities": "amenities_score",
        "facility": "facility_score",
    }

    print(f"[DEBUG] selected_item 길이: {len(selected_item)}")
    print(f"[DEBUG] selected_item 내용: {selected_item}")

    weights = {}
    if len(selected_item) > 0:
        weights[selected_item[0]] = 1.5
        print(f"[DEBUG] 가중치 1순위: {selected_item[0]} = 1.5")
    if len(selected_item) > 1:
        weights[selected_item[1]] = 1.3
        print(f"[DEBUG] 가중치 2순위: {selected_item[1]} = 1.3")
    if len(selected_item) > 2:
        weights[selected_item[2]] = 1.0
        print(f"[DEBUG] 가중치 3순위: {selected_item[2]} = 1.0")

    print(f"[DEBUG] 최종 weights: {weights}")

    def compute_weighted_diff(row):
        total_weighted_diff = 0
        valid_calculations = 0
        
        dong_name = row.get('only_dong', 'Unknown')
        print(f"[DEBUG] 동 '{dong_name}' 가중치 계산 시작")
        
        for item_key, weight in weights.items():
            # 🚨 프론트엔드 키 -> Colab 모델 키 -> DB 컬럼 매핑 🚨
            colab_model_key = None
            db_col_prefix = None

            if item_key == "traffic":
                colab_model_key = "subway"
                db_col_prefix = "subway"
            elif item_key == "infra":
                colab_model_key = "amenities"
                db_col_prefix = "amenities"
            elif item_key == "rent":
                colab_model_key = "rent"
                db_col_prefix = "rent"
            elif item_key == "safety":
                colab_model_key = "crime"
                db_col_prefix = "crime"
            elif item_key == "noise":
                colab_model_key = "noise"
                db_col_prefix = "noise"
            elif item_key == "population":
                colab_model_key = "population"
                db_col_prefix = "population"
            else:
                print(f"경고: 프론트엔드 항목 '{item_key}'에 대한 매핑을 찾을 수 없습니다. 계산에서 제외합니다.")
                continue

            # 예측값 확인
            predicted_score = predicted.get(colab_model_key)
            if predicted_score is None:
                print(f"경고: {colab_model_key} 모델의 예측값을 찾을 수 없습니다. 계산에서 제외합니다.")
                continue

            # DB 컬럼명 확인
            db_col_name = col_map.get(colab_model_key)
            if not db_col_name:
                print(f"경고: DB 매핑에 '{colab_model_key}'에 대한 컬럼명 정의가 없습니다. 계산에서 제외합니다.")
                continue

            actual_score_from_db = row.get(db_col_name)
            if actual_score_from_db is None:
                print(f"경고: 동 '{dong_name}'의 '{db_col_name}' 컬럼 값이 NULL입니다. 기본값 5.0으로 대체합니다.")
                actual_score_from_db = 5.0  # 중간값으로 대체

            # 차이 계산
            diff = abs(predicted_score - actual_score_from_db) * weight
            total_weighted_diff += diff
            valid_calculations += 1
            
            print(f"[DEBUG] {item_key}: |{predicted_score} - {actual_score_from_db}| * {weight} = {diff}")

        print(f"[DEBUG] 동 '{dong_name}'의 총 가중 차이: {total_weighted_diff} (유효 계산: {valid_calculations})")
        
        # 유효한 계산이 없으면 매우 큰 값 반환 (낮은 우선순위)
        if valid_calculations == 0:
            return float('inf')
        
        return total_weighted_diff

    # 정렬 및 상위 3개 선택
    try:
        sorted_rows = sorted(rows, key=compute_weighted_diff)[:3]
        print(f"[DEBUG] 상위 3개 지역 선정 완료")
    except Exception as e:
        print(f"❌ 정렬 중 오류 발생: {e}")
        sorted_rows = rows[:3]  # 오류 시 첫 3개 반환

    recommendations = []
    for i, row in enumerate(sorted_rows):
        recommendation = {
            "full_adr": row.get("full_adr", "주소 정보 없음"),
            "dong": row.get("only_dong", "동 정보 없음"),
            "score": {
                # 🚨 프론트엔드 itemData 키에 맞게 매핑 🚨
                "traffic": row.get("subway_score"),
                "infra": row.get("amenities_score"),
                "rent": row.get("rent_score"),
                "safety": row.get("crime_score"),
                "noise": row.get("noise_score"),
                "population": row.get("population_score"),
            }
        }
        recommendations.append(recommendation)
        print(f"[DEBUG] 추천 {i+1}: {recommendation['dong']} - {recommendation['full_adr']}")

    return recommendations

def create_empty_result(selected_item, user_text, predicted):
    """빈 결과 생성"""
    return {
        "selectedItem": selected_item,
        "userText": user_text,
        "predictedScores": predicted,
        "recommendations": []
    }