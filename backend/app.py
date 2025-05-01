from flask import Flask
from flask_cors import CORS

from backend.routes.search_route import search_bp
from routes.rank_route import rank_bp
from routes.signup_route import signup_bp
from routes.login_route import login_bp

app = Flask(__name__)
CORS(app)

# 블루프린트 등록
app.register_blueprint(signup_bp, url_prefix='/signup')
app.register_blueprint(login_bp, url_prefix='/login')
app.register_blueprint(rank_bp, url_prefix='/rank')
app.register_blueprint(search_bp, url_prefix='/search')

if __name__ == '__main__':
    app.run(debug=True)
