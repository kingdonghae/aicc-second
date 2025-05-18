"""
====================================================================
파일명   : comment_service.py
작성자   : jungeun
작성일자 : 2025-05-16
설명     : 댓글 생성 비즈니스 로직 처리
           - 댓글 DB 저장
           - DB 연결 및 쿼리 실행 처리 포함
====================================================================
"""
from flask import jsonify
from db import get_connection
from models.comments_model import insert_comment_query, get_comments_by_post_query, delete_comment_by_id_query, \
    select_comment_by_id_query


# 댓글 저장
def save_comment(post_id, content, writer):
    if not post_id:
        return jsonify({"error": "게시물 정보가 없습니다."}), 400
    if not content:
        return jsonify({"error": "댓글 내용이 없습니다."}), 400
    if not writer:
        return jsonify({"error": "작성자 정보가 없습니다."}), 400

    insert_sql = insert_comment_query()
    select_sql = select_comment_by_id_query()
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute(insert_sql, (post_id, content, writer))
            inserted_id = cursor.lastrowid
            connection.commit()

            cursor.execute(select_sql, (inserted_id,))
            new_comment = cursor.fetchone()

        return jsonify(new_comment), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        connection.close()

# 댓글 삭제
def delete_comment_by_id(comment_id):
    if not comment_id:
        return jsonify({"error": "댓글 정보가 없습니다."}), 400

    sql = delete_comment_by_id_query()
    connection = get_connection()

    try:
        with connection.cursor() as cursor:
            cursor.execute(sql, (comment_id,))
            connection.commit()
        return jsonify({"status": "ok", "message": "댓글 삭제 완료"}), 200
    finally:
        connection.close()


# 게시물 댓글 조회
def fetch_comments_by_post(post_id):
    if not post_id:
        return jsonify({"error": "게시물 정보가 없습니다."}), 400
    sql = get_comments_by_post_query()
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute(sql, (post_id,))
            comments = cursor.fetchall()
            return jsonify(comments), 200
    finally:
        connection.close()


