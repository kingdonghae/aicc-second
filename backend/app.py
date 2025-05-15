from flask import Flask
from flask_cors import CORS
from config.file_config import WRITE_UPLOAD_FOLDER
from routes.post_route import post_bp
import decimal
from flask.json import JSONEncoder

from routes.signup_route import signup_bp
from routes.login_route import login_bp
from routes.social_route import social_bp
from routes.search_route import search_bp
from routes.rank_route import rank_bp
from routes.upload_route import upload_bp
from routes.user_route import user_bp
from routes.score_route import score_bp

class CustomJSONEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, decimal.Decimal):
            return float(obj)
        return super().default(obj)

app = Flask(__name__, static_folder='static', static_url_path='/static')
app.json_encoder = CustomJSONEncoder
app.config['WRITE_UPLOAD_FOLDER'] = WRITE_UPLOAD_FOLDER
CORS(app)

# 블루프린트 등록
app.register_blueprint(signup_bp)
app.register_blueprint(login_bp)
app.register_blueprint(social_bp, url_prefix='/social')
app.register_blueprint(rank_bp, url_prefix='/rank')
app.register_blueprint(search_bp, url_prefix='/search')
app.register_blueprint(upload_bp)
app.register_blueprint(post_bp)
app.register_blueprint(score_bp)
app.register_blueprint(user_bp)
if __name__ == '__main__':
    app.run(debug=True)