import jwt
import os
from dotenv import load_dotenv

# ✅ .env 파일 로드
load_dotenv()

# ✅ 환경변수에서 비밀키 가져오기
SECRET_KEY = os.getenv('JWT_SECRET_KEY')

def generate_jwt(user_id, provider):
    if not SECRET_KEY:
        raise ValueError("JWT_SECRET_KEY 환경변수가 설정되어 있지 않습니다.")

    payload = {'user_id': user_id, 'provider': provider}
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return token
