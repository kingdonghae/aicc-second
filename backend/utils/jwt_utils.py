import jwt
import datetime
import os
from dotenv import load_dotenv

from flask import current_app
# ✅ .env 파일 로드
load_dotenv()

# ✅ 환경변수에서 비밀키 가져오기
SECRET_KEY = os.getenv('JWT_SECRET_KEY')
def create_jwt(user):
    payload = {
        "user_id": user["id"],
        "email": user["email"],
        "username": user["username"],
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1)
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

def generate_jwt(user_id, provider):
    if not SECRET_KEY:
        raise ValueError("JWT_SECRET_KEY 환경변수가 설정되어 있지 않습니다.")

    payload = {'user_id': user_id, 'provider': provider}
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return token
