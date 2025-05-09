import os

BASE_DIR = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))

# 📁 글쓰기 이미지 저장 경로
WRITE_UPLOAD_FOLDER = os.path.join(BASE_DIR, 'static', 'uploads', 'write')

# 디렉토리 없으면 생성
os.makedirs(WRITE_UPLOAD_FOLDER, exist_ok=True)
