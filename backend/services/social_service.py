from db import get_connection
from models.user_model import (
    get_user_by_provider, 
    create_social_user
)
from utils.jwt_utils import generate_jwt

def handle_social_login(provider, user_info):
    provider_id = str(user_info['id'])
    email = user_info.get('kakao_account', {}).get('email') or f'{provider_id}@{provider}.com'
    name = user_info.get('properties', {}).get('nickname') or '소셜사용자'
    
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute(get_user_by_provider(), ('kakao', provider_id))
            user = cursor.fetchone()

            if not user:
                cursor.execute(create_social_user(), (name, email, provider_id))
                connection.commit()
                
                cursor.execute(get_user_by_provider(), ('kakao', provider_id))
                user = cursor.fetchone()
                
    finally:
        connection.close() 

    token = generate_jwt(user)

    return {'message': '소셜 로그인 성공!', 'token': token}, 200
