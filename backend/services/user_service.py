import bcrypt
from models.user_model import get_user_by_id, update_user

def fetch_user_info(user_id):
    user = get_user_by_id(user_id)
    if not user:
        return {'error': '사용자를 찾을 수 없습니다.'}, 404
    return user, 200

def modify_user_info(user_id, data):
    password = data.get('password')
    phone = data.get('phone_number')
    address = data.get('address')

    if not password or not phone or not address:
        return {'error': '모든 항목을 입력해주세요.'}, 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    update_user(user_id, hashed_password, phone, address)
    return {'message': '사용자 정보가 수정되었습니다.'}, 200
