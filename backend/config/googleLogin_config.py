# config.py
import os
from dotenv import load_dotenv

load_dotenv()

class GoogleConfig:
    GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
    GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
    GOOGLE_REDIRECT_URI = os.getenv("GOOGLE_REDIRECT_URI")

    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
