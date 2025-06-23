import os

BASE_DIR = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))

WRITE_UPLOAD_FOLDER = os.path.join(BASE_DIR, 'static', 'uploads', 'write')

os.makedirs(WRITE_UPLOAD_FOLDER, exist_ok=True)
