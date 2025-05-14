from flask import Flask
from flask_cors import CORS
from config.file_config import WRITE_UPLOAD_FOLDER
from config.login_config import LoginConfig
from routes.google_auth_route import google_auth
from routes.post_route import post_bp

from routes.signup_route import signup_bp
from routes.login_route import login_bp
from routes.social_route import social_bp
from routes.search_route import search_bp
from routes.rank_route import rank_bp
from routes.upload_route import upload_bp
from routes.user_route import user_bp
from routes.score_route import score_bp

import subprocess, os, sys

app = Flask(__name__, static_folder='static', static_url_path='/static')
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
    launch_streamlit()
    app.run(host="0.0.0.0", port=5000)
