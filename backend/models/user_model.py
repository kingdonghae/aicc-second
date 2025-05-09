from db import get_connection

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

def get_user_by_email(email):
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            sql = "SELECT id, username, password FROM users WHERE email = %s"
            cursor.execute(sql, (email,))
            user = cursor.fetchone()
            return user
    finally:
        connection.close()