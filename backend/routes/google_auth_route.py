from flask import Blueprint, redirect, request, jsonify, current_app
import requests

from db import get_connection
from models.user_model import get_user_by_email_basic, create_user, create_google_user
from services.google_service import process_google_auth

google_auth = Blueprint('google_auth', __name__)

@google_auth.route('/auth/google')
def auth_google():
    client_id = current_app.config["GOOGLE_CLIENT_ID"]
    redirect_uri = current_app.config["GOOGLE_REDIRECT_URI"]

    return redirect(
        f"https://accounts.google.com/o/oauth2/v2/auth"
        f"?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code"
        f"&scope=openid%20email%20profile"
    )

@google_auth.route('/auth/google/callback')
def auth_google_callback():
    try:
        code = request.args.get('code')
        token = process_google_auth(code)
        return redirect(f"http://localhost:5173/oauth/success?token={token}")
    except Exception as e:
        return jsonify({"error": str(e)}), 500
