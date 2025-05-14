import jwt
import os
from datetime import datetime, timedelta, timezone
from dotenv import load_dotenv

from flask import current_app
# ✅ .env 파일 로드
load_dotenv()
SECRET_KEY = os.getenv('JWT_SECRET_KEY')
def create_jwt(user):
    payload = {
        "user_id": user["id"],
        "email": user["email"],
        "username": user["username"],
        "exp": datetime.utcnow() + timedelta(days=1)
    }
    secret = current_app.config["JWT_SECRET_KEY"]
    return jwt.encode(payload, secret, algorithm="HS256")

def decode_jwt(token):
    try:
        secret = current_app.config["JWT_SECRET_KEY"]
        decoded = jwt.decode(token, secret, algorithms=["HS256"])
        return decoded
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

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
