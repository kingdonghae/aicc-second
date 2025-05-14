from db import get_connection
import pymysql

# 사용자 생성 (userid 제거 버전)
def create_user(username, hashed_password, email, phone_number, address, birthdate, agree_privacy):
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            sql = """
                INSERT INTO users (username, password, email, phone_number, address, birthdate, agree_privacy,login_type)
                VALUES (%s, %s, %s, %s, %s, %s, %s,'normal')
            """
            cursor.execute(sql, (username, hashed_password, email, phone_number, address, birthdate, agree_privacy))
        connection.commit()
    finally:
        connection.close()

def create_google_user(social_id, username, email):
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            sql = """
                INSERT INTO users (
                    username, email, login_type, social_id
                )
                VALUES (%s, %s, 'google', %s)
            """
            cursor.execute(sql, (
                username, email, social_id
            ))
        connection.commit()
    finally:
        connection.close()

def get_user_by_email_basic(email):
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            sql = "SELECT id, email, username FROM users WHERE email = %s"
            cursor.execute(sql, (email,))
            result = cursor.fetchone()
            return result
    finally:
        connection.close()

def get_user_by_email_detailed(email):
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            sql = "SELECT id, username, password, email FROM users WHERE email = %s"
            cursor.execute(sql, (email,))
            user = cursor.fetchone()
            return user
    finally:
        connection.close()