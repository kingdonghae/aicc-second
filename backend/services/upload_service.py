# services/file_service.py
import os
from werkzeug.utils import secure_filename
from flask import current_app, jsonify

from db import get_connection
from models.file_model import update_file_query, update_files_unlink_query, update_files_link_query
from models.post_model import insert_post_query, update_post_query, get_file_query


def save_uploaded_file(file):
    filename = secure_filename(file.filename)
    upload_folder = current_app.config['WRITE_UPLOAD_FOLDER']
    filepath = os.path.join(upload_folder, filename)
    file.save(filepath)
    return f'/static/uploads/write/{filename}'


def save_post_service(title, content, writer, attachments=None):
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
                writer
            ))
            post_id = cursor.lastrowid
            if attachments:
                for file in attachments:
                    sql = update_file_query()
                    cursor.execute(
                        sql,
                        (post_id, file['filename'])
                    )
        connection.commit()
        return jsonify({"status": "ok", "post_id": post_id}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        connection.close()


def update_post_service(title, content, post_id, new_attachments):
    if not title:
        return jsonify({"error": "제목이 없습니다."}), 400

    if not content:
        return jsonify({"error": "게시물이 없습니다."}), 400

    post_sql = update_post_query()
    select_file_sql = get_file_query()
    connection = get_connection()

    try:
        with connection.cursor() as cursor:
            cursor.execute(post_sql, (
                title,
                content,
                post_id
            ))

            cursor.execute(select_file_sql,(post_id ,))
            existing_files = [row['filename'] for row in cursor.fetchall()]

            new_filenames = [f['filename'] for f in new_attachments]
            files_to_delete = list(set(existing_files) - set(new_filenames))
            files_to_add = list(set(new_filenames) - set(existing_files))

            if files_to_delete:
                unlink_sql = update_files_unlink_query(len(files_to_delete))
                cursor.execute(unlink_sql, tuple(files_to_delete))

            if files_to_add:
                link_sql = update_files_link_query(len(files_to_add))
                cursor.execute(link_sql, (post_id, *files_to_add))

            connection.commit()

        return jsonify({"status": "ok", "post_id": post_id})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        connection.close()


