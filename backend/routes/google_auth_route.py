"""
====================================================================
파일명   : google_auth_route.py
작성자   : jungeun
작성일자 : 2025-05-14
설명     : 구글 OAuth 인증을 위한 라우팅 처리
====================================================================
"""
from flask import Blueprint, redirect, request, jsonify, current_app
from services.google_service import process_google_auth

google_auth = Blueprint('google_auth', __name__)

@google_auth.route('/auth/google')
def auth_google():
    """
    [GET] /auth/google
     - 클라이언트가 Google 로그인 요청 시 호출되는 라우트
     - Google OAuth 인증 URL로 리다이렉트 수행

    Query Parameters:
        없음

    Returns:
        Redirect: Google 인증 페이지 URL
    """
    client_id = current_app.config["GOOGLE_CLIENT_ID"]
    redirect_uri = current_app.config["GOOGLE_REDIRECT_URI"]

    return redirect(
        f"https://accounts.google.com/o/oauth2/v2/auth"
        f"?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code"
        f"&scope=openid%20email%20profile"
    )

@google_auth.route('/auth/google/callback')
def auth_google_callback():
    """
    [GET] /auth/google/callback
     - Google 인증 서버에서 redirect 시 호출되는 콜백 라우트
     - 전달된 인증 코드(code)를 이용해 토큰 처리 수행
     - 성공 시 프론트엔드로 리다이렉션하며 토큰 전달

    Query Parameters:
        code (str): 구글 인증 서버에서 전달하는 authorization code

    Returns:
        Redirect: 성공 시 프론트엔드 페이지로 이동
        JSON: 실패 시 에러 메시지 응답
    """
    try:
        code = request.args.get('code')
        token = process_google_auth(code)
        return redirect(f"http://localhost:5173/oauth/success?token={token}")
    except Exception as e:
        return jsonify({"error": str(e)}), 500
