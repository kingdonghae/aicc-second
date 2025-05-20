from flask import jsonify

from db import get_connection
from models.post_model import update_views_query, get_post_detail_query, get_posts_query, count_posts_query, get_file_query


def get_post_list_service(limit, page, search):
    if not limit or not page:
        return jsonify({"limit or page": "페이지 정보가 없습니다."}), 400
    offset = (page - 1) * limit
    sql =  get_posts_query(search)
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            if search:
                cursor.execute(sql, (f"%{search}%", limit, offset))
            else:
                cursor.execute(sql, (limit, offset))
            return cursor.fetchall()

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        connection.close()

def get_post_detail_service(post_id):
    if not post_id:
        return jsonify({"post_id": "게시물 정보가 없습니다."}), 400

    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            update_sql = update_views_query()
            cursor.execute(update_sql, (post_id,))

            detail_sql = get_post_detail_query()
            cursor.execute(detail_sql, (post_id,))
            post = cursor.fetchone()

            file_sql = get_file_query()
            cursor.execute(file_sql, (post_id,))
            files = cursor.fetchall()

            post['uploadedFiles'] = files

        connection.commit()
        if post:
            return post
        else:
            return None

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        connection.close()


def get_count_posts(search):
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            sql = count_posts_query(search)
            if search:
                cursor.execute(sql, f"%{search}%")
            else:
                cursor.execute(sql)
            return cursor.fetchone()

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        connection.close()
