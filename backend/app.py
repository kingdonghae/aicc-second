import os
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
from routes import all_blueprints

load_dotenv()

def create_app() :
    app = Flask(__name__)
    CORS(app)

    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')

    jwt = JWTManager(app)

    for bp, url_prefix in all_blueprints:
        app.register_blueprint(bp, url_prefix=url_prefix)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)
