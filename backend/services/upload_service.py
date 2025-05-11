# services/file_service.py
import os
from werkzeug.utils import secure_filename
from flask import current_app, jsonify

from db import get_connection
from models.post_model import insert_post_query, update_post_query


def save_uploaded_file(file):
    filename = secure_filename(file.filename)
    upload_folder = current_app.config['WRITE_UPLOAD_FOLDER']
    filepath = os.path.join(upload_folder, filename)
    file.save(filepath)
    return f'/static/uploads/write/{filename}'


def save_post_service(title, content,writer):
    if not title:
        return jsonify({"error": "제목이 없습니다."}), 400

    if not content:
        return jsonify({"error": "게시물이 없습니다."}), 400
    if not writer:
        return jsonify({"error": "작성자가 없습니다."}), 400


    sql = insert_post_query()
    connection = get_connection()

    try:
        with connection.cursor() as cursor:
            cursor.execute(sql, (
                title,
                content,
                writer,
            ))
        connection.commit()
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        connection.close()
        return jsonify({"status": "ok", "message": "게시물 등록 완료"}), 200

def update_post_service(title, content):
    if not title:
        return jsonify({"error": "제목이 없습니다."}), 400

    if not content:
        return jsonify({"error": "게시물이 없습니다."}), 400

    sql = update_post_query()
    connection = get_connection()

    try:
        with connection.cursor() as cursor:
            cursor.execute(sql, (
                title,
                content,
            ))
        connection.commit()
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        connection.close()
        return jsonify({"status": "ok", "message": "게시물 수정 완료"}), 200

