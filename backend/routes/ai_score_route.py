# routes/ai_score_route.py
from flask import Blueprint, request, jsonify
import requests
import time

# 블루프린트 생성
ai_score_bp = Blueprint('ai_score', __name__) # 블루프린트 이름 변경

# Colab AI 모델 URL (Colab에서 얻은 실제 ngrok URL로 변경)
# 🚨🚨🚨 이 값을 현재 활성화된 Colab 서버의 ngrok URL로 업데이트해야 합니다! 🚨🚨🚨
COLAB_API_URL = "https://b717f16842cd.ngrok-free.app" # 예시 URL

@ai_score_bp.route('/api/custom-score', methods=['POST'])
def get_custom_score():
    """
    텍스트에 대해 지정된 AI 모델의 예측 점수를 반환합니다 (1-10점).
    요청 JSON 예시: {"text": "이 근처에 지하철역이 있나요?", "model_type": "subway"}
    """
    try:
        data = request.get_json()
        text = data.get('text', '').strip()
        model_type = data.get('model_type', '').strip().lower()

        if not text:
            return jsonify({
                'success': False,
                'message': '텍스트가 비어있습니다.'
            }), 400
        
        # 유효한 model_type인지 확인 (Colab 서버의 model_names와 일치해야 함)
        valid_model_types = ["amenities", "crime", "facility", "noise", "population", "subway", "rent"]
        if model_type not in valid_model_types:
            return jsonify({
                'success': False,
                'message': f"유효하지 않은 model_type입니다. 다음 중 하나를 사용하세요: {', '.join(valid_model_types)}"
            }), 400

        # Colab AI 모델 호출 (predict_all_models를 호출하는 /api/classify 엔드포인트 사용)
        start_time = time.time()
        response = requests.post(
            f"{COLAB_API_URL}/api/classify", # Colab 서버의 모든 모델 예측 API 호출
            json={"text": text},
            timeout=30 # 충분한 타임아웃
        )
        processing_time = time.time() - start_time

        if response.status_code == 200:
            all_model_scores = response.json() # Colab에서 반환된 모든 모델의 점수 (딕셔너리)
            
            # 요청된 model_type에 해당하는 점수를 추출
            requested_score = all_model_scores.get(model_type, 0.0) # 기본값 0.0
            
            return jsonify({
                'success': True,
                'text': text,
                'model_type': model_type,
                'score': round(requested_score, 2), # 해당 모델의 예측 점수 (1-10)
                'message': f"{model_type} 모델 예측 점수입니다.",
                'processing_time': round(processing_time, 3),
                'model_server': 'Colab AI (Kanana)',
                'all_model_scores': all_model_scores # 디버깅을 위해 모든 점수도 함께 반환 가능
            }), 200
        else:
            print(f"❌ Colab AI 모델 응답 오류: {response.status_code} - {response.text}")
            return jsonify({
                'success': False,
                'message': 'AI 모델 서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
                'status_code': response.status_code,
                'error_detail': response.text
            }), 503 # Service Unavailable

    except requests.exceptions.Timeout:
        print("⚠️ Colab AI 모델 응답 시간 초과")
        return jsonify({
            'success': False,
            'message': 'AI 모델 응답 시간 초과. 잠시 후 다시 시도해주세요.',
            'fallback': True
        }), 504 # Gateway Timeout
    except requests.exceptions.RequestException as e:
        print(f"⚠️ Colab AI 모델 연결 오류: {e}")
        return jsonify({
            'success': False,
            'message': f'AI 모델 연결 오류: {str(e)}',
            'fallback': True
        }), 503
    except Exception as e:
        print(f"❌ 커스텀 점수 검사 오류: {e}")
        return jsonify({'error': f'서버 오류: {str(e)}'}), 500

@ai_score_bp.route('/api/ai-status', methods=['GET'])
def ai_status():
    """Colab AI 모델 서버의 상태 확인 (이전과 동일)"""
    try:
        response = requests.get(f"{COLAB_API_URL}/api/health", timeout=5)
        if response.status_code == 200:
            health_data = response.json()
            return jsonify({
                'status': 'online',
                'model_loaded': health_data.get('model_loaded', False),
                'gpu_name': health_data.get('gpu_name', 'Unknown'),
                'server': health_data.get('server', 'Colab via ngrok'),
                'url': COLAB_API_URL,
                'loaded_models_count': health_data.get('loaded_models_count', 0)
            })
        else:
            print(f"❌ Colab AI 모델 상태 응답 오류: {response.status_code} - {response.text}")
            return jsonify({'status': 'offline', 'message': 'AI 모델 응답 없음'})
    except requests.exceptions.RequestException as e:
        print(f"⚠️ Colab AI 모델 상태 연결 실패: {e}")
        return jsonify({'status': 'offline', 'message': 'AI 모델 연결 실패'})

@ai_score_bp.route('/api/update-model-url', methods=['POST'])
def update_model_url():
    """AI 모델 URL 업데이트 (개발/유지보수용 - 이전과 동일)"""
    global COLAB_API_URL
    data = request.get_json()
    new_url = data.get('url', '').strip()
    
    if new_url and new_url.startswith("https://"):
        COLAB_API_URL = new_url
        print(f"✅ AI 모델 URL이 {new_url}로 업데이트되었습니다.")
        return jsonify({
            'success': True, 
            'message': f'AI 모델 URL이 {new_url}로 업데이트되었습니다.'
        })
    else:
        return jsonify({'success': False, 'message': '유효한 URL이 필요합니다.'}), 400