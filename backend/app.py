# from flask import Flask
# from flask_cors import CORS
# from config.file_config import WRITE_UPLOAD_FOLDER
# from config.login_config import LoginConfig
# from routes.google_auth_route import google_auth
# from routes.post_route import post_bp

# from routes.signup_route import signup_bp
# from routes.login_route import login_bp
# from routes.social_route import social_bp
# from routes.search_route import search_bp
# from routes.rank_route import rank_bp
# from routes.upload_route import upload_bp
# from routes.user_route import user_bp
# from routes.score_route import score_bp

# import subprocess, os, sys

# import decimal
# # from flask.json import JSONEncoder
# from flask.json.provider import DefaultJSONProvider

# class CustomJSONEncoder(DefaultJSONProvider):
#     def default(self, obj):
#         if isinstance(obj, decimal.Decimal):
#             return float(obj)
#         return super().default(obj)

# app = Flask(__name__, static_folder='static', static_url_path='/static')
# app.json_encoder = CustomJSONEncoder
# app.config['WRITE_UPLOAD_FOLDER'] = WRITE_UPLOAD_FOLDER
# app.config.from_object(LoginConfig)
# CORS(app)
# CORS(app, supports_credentials=True)


# # 블루프린트 등록
# app.register_blueprint(signup_bp)
# app.register_blueprint(login_bp)
# app.register_blueprint(social_bp, url_prefix='/social')
# app.register_blueprint(google_auth)
# app.register_blueprint(rank_bp, url_prefix='/rank')
# app.register_blueprint(search_bp, url_prefix='/search')
# app.register_blueprint(upload_bp)
# app.register_blueprint(post_bp)
# app.register_blueprint(score_bp)
# app.register_blueprint(user_bp)



# def launch_streamlit():
#     script_path = os.path.join(os.path.dirname(__file__), "models", "rent_report.py")

#     subprocess.Popen(
#         [sys.executable, "-m", "streamlit", "run", script_path, "--server.port", "8501", "--server.headless", "true"],
#         stdout=subprocess.DEVNULL,
#         stderr=subprocess.DEVNULL
#     )

# if __name__ == '__main__':
#     launch_streamlit()
#     app.run(host="0.0.0.0", port=5000)

from flask import Flask
from flask_cors import CORS
from config.file_config import WRITE_UPLOAD_FOLDER
from config.login_config import LoginConfig
from routes.google_auth_route import google_auth
from routes.post_route import post_bp

# 인코딩 및 버퍼링 설정
import os, sys
import io

# UTF-8 인코딩 강제 설정 (이모지 출력 문제 해결)
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

# 환경 변수를 통한 Python 버퍼링 비활성화
os.environ['PYTHONUNBUFFERED'] = '1'
os.environ['PYTHONIOENCODING'] = 'utf-8'  # 환경 변수로도 UTF-8 설정

from routes.signup_route import signup_bp
from routes.login_route import login_bp
from routes.social_route import social_bp
from routes.search_route import search_bp
from routes.rank_route import rank_bp
from routes.upload_route import upload_bp
from routes.user_route import user_bp
from routes.score_route import score_bp

import subprocess, decimal
# from flask.json import JSONEncoder
from flask.json.provider import DefaultJSONProvider

class CustomJSONEncoder(DefaultJSONProvider):
    def default(self, obj):
        if isinstance(obj, decimal.Decimal):
            return float(obj)
        return super().default(obj)

app = Flask(__name__, static_folder='static', static_url_path='/static')
app.json_encoder = CustomJSONEncoder
app.config['WRITE_UPLOAD_FOLDER'] = WRITE_UPLOAD_FOLDER
app.config.from_object(LoginConfig)
CORS(app)
CORS(app, supports_credentials=True)


# 블루프린트 등록
app.register_blueprint(signup_bp)
app.register_blueprint(login_bp)
app.register_blueprint(social_bp, url_prefix='/social')
app.register_blueprint(google_auth)
app.register_blueprint(rank_bp, url_prefix='/rank')
app.register_blueprint(search_bp, url_prefix='/search')
app.register_blueprint(upload_bp)
app.register_blueprint(post_bp)
app.register_blueprint(score_bp)
app.register_blueprint(user_bp)


def launch_streamlit():
    script_path = os.path.join(os.path.dirname(__file__), "models", "rent_report.py")

    subprocess.Popen(
        [sys.executable, "-m", "streamlit", "run", script_path, "--server.port", "8501", "--server.headless", "true"],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )

if __name__ == '__main__':
    # 서버 시작 메시지 (확인용)
    print("서버 시작: 로그 즉시 출력 및 UTF-8 인코딩 활성화됨 ✅")
    launch_streamlit()
    app.run(host="0.0.0.0", port=5000)
