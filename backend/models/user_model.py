from db import get_connection
import pymysql

def create_user(username, hashed_password, email, phone_number, address, birthdate, agree_privacy):
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            sql = """
                INSERT INTO users (username, password, email, phone_number, address, birthdate, agree_privacy, provider)
                VALUES (%s, %s, %s, %s, %s, %s, %s, 'local')
            """
            cursor.execute(sql, (username, hashed_password, email, phone_number, address, birthdate, agree_privacy))
        connection.commit()
    finally:
        connection.close()

def get_user_by_email(email):
    connection = get_connection()
    try:
        with connection.cursor(pymysql.cursors.DictCursor) as cursor:
            sql = "SELECT * FROM users WHERE email = %s AND provider = 'local'"
            cursor.execute(sql, (email,))
            return cursor.fetchone()
    finally:
        connection.close()

def get_user_by_provider(provider, provider_id):
    connection = get_connection()
    try:
        with connection.cursor(pymysql.cursors.DictCursor) as cursor:
            sql = "SELECT * FROM users WHERE provider = %s AND provider_id = %s"
            cursor.execute(sql, (provider, provider_id))
            return cursor.fetchone()
    finally:
        connection.close()

def create_social_user(provider, provider_id, email, username):
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            sql = """
                INSERT INTO users (username, email, provider, provider_id)
                VALUES (%s, %s, %s, %s)
            """
            cursor.execute(sql, (username, email, provider, provider_id))
        connection.commit()
    finally:
        connection.close()

def get_user_by_id(user_id):
    connection = get_connection()
    try:
        with connection.cursor(pymysql.cursors.DictCursor) as cursor:
            sql = "SELECT id, username, email, phone_number, address, birthdate FROM users WHERE id = %s"
            cursor.execute(sql, (user_id,))
            return cursor.fetchone()
    finally:
        connection.close()

def update_user(user_id, password, phone_number, address):
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            sql = "UPDATE users SET password=%s, phone_number=%s, address=%s WHERE id=%s"
            cursor.execute(sql, (password, phone_number, address, user_id))
        connection.commit()
    finally:
        connection.close()
