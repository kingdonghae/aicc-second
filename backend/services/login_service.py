# services/login_service.py

import bcrypt
from models.user_model import get_user_by_userid

def login_user(data):
    userid = data.get('userid')
    password = data.get('password')

    if not userid or not password:
        return {'error': 'userid와 password는 필수입니다.'}, 400

    user = get_user_by_userid(userid)

    if not user or not bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        return {'error': '아이디 또는 비밀번호가 일치하지 않습니다.'}, 401
    
    return {
        'message': '로그인 성공!',
        'user': {
            'id': user['id'],
            'userid': user['userid'],
            'username': user['username']
        }
    }, 200
