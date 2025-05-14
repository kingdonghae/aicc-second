import jwt
import datetime

from flask import current_app

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
