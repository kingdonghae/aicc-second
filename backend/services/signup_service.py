import re
import bcrypt
from models.user_model import create_user, get_user_by_email

def is_email_available(email):
    user = get_user_by_email(email)
    return user is None

def is_valid_email(email):
    # re lib 매서드
    return re.match(r"[^@]+@[^@]+\.[^@]+", email) is not None

def signup_user(data):
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    phone_number = data.get('phone_number')
    address = data.get('address')
    birthdate = data.get('birthdate')
    agree_privacy = data.get('agree_privacy', 0)

    if not email or not password:
        return {'error': 'email과 password는 필수입니다.'}, 400

    if email and not is_valid_email(email):
        return {'error': '올바른 이메일 형식이 아닙니다.'}, 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    create_user(username, hashed_password, email, phone_number, address, birthdate, agree_privacy)

    return {'message': '회원가입 성공!'}, 201