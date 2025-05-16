





import jwt
from datetime import datetime, timedelta, timezone
from flask import current_app

def get_jwt_secret():
    secret = current_app.config.get("JWT_SECRET_KEY")
    if not secret:
        raise RuntimeError("JWT_SECRET_KEY 환경변수가 설정되어 있지 않습니다.")
    return secret

def generate_jwt(user,expires_in_hours=2):
    payload = {
        "user_id": user["id"],
        "username": user["username"],
        "email": user["email"],
        "provider": user["provider"],
        "exp": datetime.now(timezone.utc) + timedelta(hours=expires_in_hours),
        "type": "access"
    }
    return jwt.encode(payload, get_jwt_secret(), algorithm="HS256")

def create_refresh_token(user):
    payload = {
        "user_id": user["id"],
        "exp": datetime.now(timezone.utc) + timedelta(days=7),
        "type": "refresh"
    }
    return jwt.encode(payload, get_jwt_secret(), algorithm="HS256")

def decode_jwt(token):
    try:
        return jwt.decode(token, get_jwt_secret(), algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
