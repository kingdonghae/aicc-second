"""
====================================================================
파일명   : post_model.py
작성자   : jungeun
작성일자 : 2025-05-08
설명     : 게시물 추가 및 조회 관련 데이터 관리
====================================================================
"""

# 게시물 데이터 추가
def insert_post_query():
    return """
                INSERT INTO POSTS (title, content, writer)
                VALUES (%s, %s, %s)
           """

def update_post_query():
    return """
                UPDATE posts 
                   SET title = %s
                     , content = %s 
                 WHERE id = %s
           """

def get_posts_query(search):
    base_query = """
                        SELECT 
                               id
                             , title
                             , content
                             , writer
                             , view_count
                             , created_at 
                        FROM posts
    """

    where_clause = " WHERE title LIKE %s" if search else ""
    order_limit_clause = " ORDER BY id LIMIT %s OFFSET %s"

    return base_query + where_clause + order_limit_clause

def get_post_detail_query():
    return """
                SELECT 
                       id
                     , title
                     , content
                     , writer
                     , view_count
                     , created_at 
                     ,(SELECT 
                            COUNT(*) 
                         FROM posts
                      )                     AS total_count
                 FROM posts WHERE id = %s
           """

def update_views_query():
    return """
                UPDATE POSTS 
                   SET VIEW_COUNT = VIEW_COUNT + 1 
                 WHERE ID = %s
     """

def count_posts_query(search):
    base_query = """
                    SELECT COUNT(*) as count FROM posts 
                """
    where_clause = " WHERE title LIKE %s" if search else ""
    return base_query + where_clause
