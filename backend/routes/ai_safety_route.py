from flask import Blueprint, request, jsonify
import requests
import time
import os
from dotenv import load_dotenv

# .env 파일 로드
load_dotenv()

# 블루프린트 생성
ai_safety_bp = Blueprint('ai_safety', __name__)

# Colab AI 모델 URL (환경 변수에서 로드)
COLAB_API_URL = os.getenv("COLAB_API_URL")

@ai_safety_bp.route('/api/safety-check', methods=['POST'])
def safety_check():
    """텍스트 안전성 검사 - 이진 분류 (안전/유해)"""
    try:
        data = request.get_json()
        text = data.get('text', '').strip()
        
        if not text:
            return jsonify({
                'safe': True, 
                'message': '텍스트가 비어있습니다.'
            })
        
        # Colab AI 모델 호출
        start_time = time.time()
        response = requests.post(
            f"{COLAB_API_URL}/api/classify",
            json={"text": text},
            timeout=15  # 15초 타임아웃
        )
        processing_time = time.time() - start_time
        
        if response.status_code == 200:
            result = response.json()
            classification = result.get('classification', '<SAFE>')
            
            # 이진 분류: SAFE vs UNSAFE (S1~S7 모두 UNSAFE로 통일)
            is_safe = classification == '<SAFE>'
            
            return jsonify({
                'safe': is_safe,
                'message': '유해표현이 포함되어 있어 저장할 수 없습니다.' if not is_safe else '안전한 콘텐츠입니다.',
                'processing_time': round(processing_time, 3),
                'model': 'Kanana AI',
                'classification': 'SAFE' if is_safe else 'UNSAFE'  # 단순화된 분류
            })
        else:
            # AI 모델 실패 시 기본 비속어 필터 백업
            return fallback_filter(text)
            
    except requests.exceptions.Timeout:
        print("⚠️ AI 모델 응답 시간 초과 - 기본 필터 사용")
        return fallback_filter(text)
    except requests.exceptions.RequestException as e:
        print(f"⚠️ AI 모델 연결 오류: {e} - 기본 필터 사용")
        return fallback_filter(text)
    except Exception as e:
        print(f"❌ 안전성 검사 오류: {e}")
        return jsonify({'error': f'서버 오류: {str(e)}'}), 500

def fallback_filter(text):
    """AI 모델 실패 시 사용할 기본 비속어 필터"""
    banned_words = ['bad_word0', '욕설', '비속어']  # 기본 비속어 목록
    
    contains_banned = any(word in text.lower() for word in banned_words)
    
    return jsonify({
        'safe': not contains_banned,
        'message': '유해표현이 포함되어 있어 저장할 수 없습니다.' if contains_banned else '안전한 콘텐츠입니다.',
        'processing_time': 0.001,
        'model': 'Basic Filter (Fallback)',
        'classification': 'UNSAFE' if contains_banned else 'SAFE',
        'fallback': True
    })

@ai_safety_bp.route('/api/ai-status', methods=['GET'])
def ai_status():
    """AI 모델 상태 확인"""
    try:
        response = requests.get(f"{COLAB_API_URL}/api/health", timeout=5)
        if response.status_code == 200:
            health_data = response.json()
            return jsonify({
                'status': 'online',
                'model_loaded': health_data.get('model_loaded', False),
                'gpu_name': health_data.get('gpu_name', 'Unknown'),
                'server': health_data.get('server', 'Colab'),
                'url': COLAB_API_URL
            })
        else:
            return jsonify({'status': 'offline', 'message': 'AI 모델 응답 없음'})
    except:
        return jsonify({'status': 'offline', 'message': 'AI 모델 연결 실패'})


