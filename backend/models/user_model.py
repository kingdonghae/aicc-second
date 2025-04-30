from db import get_connection

def create_user(userid, username, hashed_password, email, phone_number, address, birthdate, agree_privacy):
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            sql = """
                INSERT INTO users (userid, username, password, email, phone_number, address, birthdate, agree_privacy)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """
            cursor.execute(sql, (userid, username, hashed_password, email, phone_number, address, birthdate, agree_privacy))
        connection.commit()
    finally:
        connection.close()

def get_user_by_userid(userid):
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            sql = "SELECT id, userid, username, password FROM users WHERE userid = %s"
            cursor.execute(sql, (userid,))
            user = cursor.fetchone()

            return user
    finally:
        connection.close()
