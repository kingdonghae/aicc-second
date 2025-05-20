
import re
import bcrypt
from db import get_connection
from models.user_model import create_user, get_user_by_email, update_add_info_user

def is_email_available(email):
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute(get_user_by_email(), (email,))
            user = cursor.fetchone()
            return user is None
    finally:
        connection.close()

def is_valid_email(email):
    return re.match(r"[^@]+@[^@]+\.[^@]+", email) is not None

def signup_user(data):
    email = data.get('email')
    username = data.get('username')
    password = data.get('password')
    birthdate = data.get('birthdate')
    phone_number = data.get('phone_number')
    address = data.get('address')
    detail_address = data.get('detail_address')
    agree_privacy = data.get('agree_privacy', 0)

    if not email or not password:
        return {'error': 'email과 password는 필수입니다.'}, 400

    if not is_valid_email(email):
        return {'error': '올바른 이메일 형식이 아닙니다.'}, 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute(create_user(), (
                username, hashed_password, email, phone_number,
                address, detail_address, birthdate, agree_privacy
            ))
        connection.commit()
    finally:
        connection.close()

    return {'message': '회원가입 성공!'}, 201

def add_user_info(user_id, data):
    phone = data.get('phone_number')
    address = data.get('address')
    detail_address = data.get('detail_address')
    birthdate = data.get('birthdate')
    agree_privacy = data.get('agree_privacy', 0)
    
    if not phone or not address or not birthdate:
        return {'error': '모든 항목을 입력해주세요.'}, 400

    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute(update_add_info_user(), (phone, address, detail_address, birthdate, agree_privacy, user_id))
        connection.commit()
        return {'message': '사용자 추가정보가 입력되었습니다.'}, 200
    finally:
        connection.close()