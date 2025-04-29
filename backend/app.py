from flask import Flask
from flask_cors import CORS
from routes.signup_route import signup_bp
from routes.login_route import login_bp

app = Flask(__name__)
CORS(app)

# 블루프린트 등록
app.register_blueprint(signup_bp)
app.register_blueprint(login_bp)

if __name__ == '__main__':
    app.run(debug=True)
