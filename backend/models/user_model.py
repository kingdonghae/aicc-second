from db import get_connection
import pymysql

# 사용자 생성 (userid 제거 버전)
def create_user(username, hashed_password, email, phone_number, address, birthdate, agree_privacy):
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            sql = """
                INSERT INTO users (username, password, email, phone_number, address, birthdate, agree_privacy)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            """
            cursor.execute(sql, (username, hashed_password, email, phone_number, address, birthdate, agree_privacy))
        connection.commit()
    finally:
        connection.close()

def get_user_by_email_basic(email):
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            sql = "SELECT id FROM users WHERE email = %s"
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