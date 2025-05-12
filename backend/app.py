from flask import Flask
from flask_cors import CORS
from config.file_config import WRITE_UPLOAD_FOLDER
from routes.post_route import post_bp

from routes.signup_route import signup_bp
from routes.login_route import login_bp
from routes.search_route import search_bp
from routes.rank_route import rank_bp
from routes.upload_route import upload_bp

from routes.score_route import score_bp


app = Flask(__name__, static_folder='static', static_url_path='/static')
app.config['WRITE_UPLOAD_FOLDER'] = WRITE_UPLOAD_FOLDER
CORS(app)

# 블루프린트 등록
app.register_blueprint(signup_bp)
app.register_blueprint(login_bp)
app.register_blueprint(rank_bp, url_prefix='/rank')
app.register_blueprint(search_bp, url_prefix='/search')
app.register_blueprint(upload_bp)
app.register_blueprint(post_bp)
app.register_blueprint(score_bp)
if __name__ == '__main__':
    app.run(debug=True)