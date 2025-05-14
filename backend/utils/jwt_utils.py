# jwt_utils.py
import jwt
import os
from datetime import datetime, timedelta, timezone
from dotenv import load_dotenv

# ✅ 환경 변수 불러오기
load_dotenv()
SECRET_KEY = os.getenv('JWT_SECRET_KEY')

# ✅ JWT 생성 함수
def generate_jwt(user_id, provider, expires_in_hours=2):
    if not SECRET_KEY:
        raise ValueError("JWT_SECRET_KEY 환경변수가 설정되어 있지 않습니다.")

    exp_time = datetime.now(timezone.utc) + timedelta(hours=expires_in_hours)
    payload = {
        'user_id': user_id,
        'provider': provider,
        'exp': exp_time
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return token