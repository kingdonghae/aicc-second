import bcrypt
from models.user_model import get_user_by_id, update_user
from db import get_connection
import pymysql

def fetch_user_info(user_id):
    connection = get_connection()
    try:
        with connection.cursor(pymysql.cursor.DictCursor) as cursor:
            cursor.execute(get_user_by_id(), (user_id,))
            user = cursor.fetchone()
            if not user:
                return {'error': '사용자를 찾을 수 없습니다.'}, 404
            return user, 200
    finally:
        connection.close()

def modify_user_info(user_id, data):
    password = data.get('password')
    phone = data.get('phone_number')
    address = data.get('address')

    if not password or not phone or not address:
        return {'error': '모든 항목을 입력해주세요.'}, 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute(update_user(), (hashed_password, phone, address, user_id))
        connection.commit()
        return {'message': '사용자 정보가 수정되었습니다.'}, 200
    finally:
        connection.close()