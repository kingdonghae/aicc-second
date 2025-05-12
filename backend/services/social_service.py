from models.user_model import get_user_by_provider, create_social_user
from utils.jwt_utils import generate_jwt

def handle_social_login(provider, user_info):
    provider_id = str(user_info['id'])
    email = user_info.get('kakao_account', {}).get('email')
    nickname = user_info.get('properties', {}).get('nickname')

    user = get_user_by_provider(provider, provider_id)

    if not user:
        create_social_user(provider, provider_id, email, nickname)
        user = get_user_by_provider(provider, provider_id)

    token = generate_jwt(user['id'], provider)

    return {'message': '소셜 로그인 성공!', 'token': token}, 200
