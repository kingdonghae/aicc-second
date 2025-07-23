import requests
from flask import current_app
from db import get_connection
from models.user_model import (
    get_user_by_provider, 
    create_google_user
)
from utils.jwt_utils import generate_jwt

def process_google_auth(code):
    client_id = current_app.config["GOOGLE_CLIENT_ID"]
    client_secret = current_app.config["GOOGLE_CLIENT_SECRET"]
    redirect_uri = current_app.config["GOOGLE_REDIRECT_URI"]

    token_res = requests.post('https://oauth2.googleapis.com/token', data={
        'code': code,
        'client_id': client_id,
        'client_secret': client_secret,
        'redirect_uri': redirect_uri,
        'grant_type': 'authorization_code'
    }).json()

    access_token = token_res.get('access_token')

    userinfo_res = requests.get(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        headers={'Authorization': f'Bearer {access_token}'}
    ).json()

    google_id = userinfo_res.get('id')
    email = userinfo_res.get('email')
    name = userinfo_res.get('name')

    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute(get_user_by_provider(), ('google', google_id))
            user = cursor.fetchone()

            if not user:
                cursor.execute(create_google_user(), (name, email, google_id, 0))
                connection.commit()

                cursor.execute(get_user_by_provider(), ('google', google_id))
                user = cursor.fetchone()

    finally:
        connection.close()

    token = generate_jwt(user)
    return token, 200
