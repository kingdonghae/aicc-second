import os
import pymysql

# MySQL 연결 함수
def get_connection():
    connection = pymysql.connect(
        host=os.getenv('DB_HOST', 'localhost'),
        port=int(os.getenv('DB_PORT', 3306)),
        user=os.getenv('DB_USER','root'),
        password=os.getenv('DB_PASSWORD', ''),
        database=os.getenv('DB_NAME', 'zippt'),
        charset=os.getenv('DB_CHARSET','utf8mb4'),
        cursorclass=pymysql.cursors.DictCursor
    )
    return connection

