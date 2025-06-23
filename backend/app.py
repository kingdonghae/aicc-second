from flask import Flask
from flask_cors import CORS

from routes.file_route import file_bp
from config.file_config import WRITE_UPLOAD_FOLDER
from config.login_config import LoginConfig
from routes.comments_route import comment_bp
from routes.google_auth_route import google_auth
from routes.post_route import post_bp

import os, sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', line_buffering=True)
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', line_buffering=True)

os.environ['PYTHONUNBUFFERED'] = '1'
os.environ['PYTHONIOENCODING'] = 'utf-8'

from routes.signup_route import signup_bp
from routes.login_route import login_bp
from routes.social_route import social_bp
from routes.search_route import search_bp
from routes.rank_route import rank_bp
from routes.upload_route import upload_bp
from routes.user_route import user_bp
from routes.score_route import score_bp

import decimal
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


app.register_blueprint(signup_bp)
app.register_blueprint(login_bp)
app.register_blueprint(social_bp, url_prefix='/social')
app.register_blueprint(google_auth)
app.register_blueprint(rank_bp, url_prefix='/rank')
app.register_blueprint(search_bp, url_prefix='/search')
app.register_blueprint(upload_bp)
app.register_blueprint(file_bp)
app.register_blueprint(post_bp)
app.register_blueprint(comment_bp)
app.register_blueprint(score_bp)
app.register_blueprint(user_bp)

if __name__ == '__main__':
    print("서버 시작: 로그 즉시 출력 및 UTF-8 인코딩 활성화됨 ✅")
    app.run(host="0.0.0.0", port=5000)
