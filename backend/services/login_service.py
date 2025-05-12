import bcrypt
from models.user_model import get_user_by_email
from utils.jwt_utils import generate_jwt

def login_user(data):
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return {'error': '이메일과 비밀번호는 필수입니다.'}, 400

    user = get_user_by_email(email)

    if not user or not bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        return {'error': '이메일 또는 비밀번호가 일치하지 않습니다.'}, 401

    # ✅ JWT 발급
    token = generate_jwt(user['id'], 'local')

    return {
        'message': '로그인 성공!',
        'token': token,
        'user': {
            'id': user['id'],
            'email': user['email'],
            'username': user['username']
        }
    }, 200
