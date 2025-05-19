import os
import uuid
from db import get_connection
from flask import jsonify
from werkzeug.utils import secure_filename
from models.file_model import insert_file_query, select_file_by_filename_query

UPLOAD_FOLDER = "uploads"

def generate_unique_filename(filename):
    ext = filename.rsplit('.', 1)[-1].lower()
    unique_name = f"{uuid.uuid4().hex}.{ext}"
    return unique_name


def save_uploaded_file(file, post_id=None, uploader='anonymous'):

    filename = secure_filename(file.filename)
    original_name = file.filename
    unique_filename = generate_unique_filename(original_name)
    save_path = os.path.join(UPLOAD_FOLDER, unique_filename)
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    file.save(save_path)

    sql = insert_file_query()
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute(sql, (post_id, unique_filename, original_name, save_path, uploader))
            connection.commit()
    finally:
        connection.close()

    return jsonify({
        "success": True,
        "filename": unique_filename,
        "original_name": original_name,
        "url": f"files/{unique_filename}"
    }), 201

def get_file_path(filename):
    sql = select_file_by_filename_query()
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute(sql, (filename,))
            result = cursor.fetchone()
            return result
    finally:
        connection.close()
