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
                INSERT INTO POSTS (
                    TITLE       
                  , CONTENT    
                  , WRITER      
                ) VALUES (
                    %s     /*제목*/     
                  , %s     /*내용*/ 
                  , %s     /*작성자*/
                );
           """


# 게시물 수정
def update_post_query():
    return """
                UPDATE POSTS
                SET 
                    TITLE = %s,
                    CONTENT = %s
                WHERE 
                    ID = %s;
           """


# 게시물 리스트 조회 (검색 키워드 포함 가능)
def get_posts_query(search):
    base_query = """
                        SELECT 
                             ID             as id               /* 키 값 */
                           , TITLE          as title            /* 제목 */
                           , WRITER         as writer           /* 작성자 */
                           , CONTENT        as content          /* 내용 */
                           , VIEW_COUNT     as view_count       /* 조회수 */
                           , CREATED_AT     as created_at       /* 작성 시간 */
                        FROM 
                             POSTS
    """
    # 검색 키워드가 있을 경우
    where_clause = " WHERE TITLE LIKE %s" if search else ""
    order_limit_clause = " ORDER BY CREATED_AT DESC, ID DESC LIMIT %s OFFSET %s"

    return base_query + where_clause + order_limit_clause


# 게시물 상세 조회 (+ 전체 게시물 수 포함)
def get_post_detail_query():
    return """
                SELECT 
                       ID                   AS id              /* 글 번호 */              
                     , TITLE                AS title           /* 제목 */
                     , CONTENT              AS content         /* 내용 */   
                     , WRITER               AS writer          /* 작성자 */   
                     , VIEW_COUNT           AS view_count      /* 조회수 */          
                     , CREATED_AT           AS created_at      /* 작성 시간 */            
                     ,(
                        SELECT 
                             COUNT(*) 
                        FROM 
                             posts
                      )                     AS total_count      /* 총 게시글 수 */
                 FROM POSTS WHERE ID = %s
           """


# 조회수 증가
def update_views_query():
    return """
                UPDATE POSTS 
                SET 
                    VIEW_COUNT = VIEW_COUNT + 1 
                WHERE 
                    ID = %s
     """


# 게시물 총 개수 조회 (검색 키워드 조건 포함)
def count_posts_query(search):
    base_query = """
                    SELECT 
                         COUNT(*) as count 
                    FROM 
                         POSTS 
                """
    where_clause = " WHERE TITLE LIKE %s" if search else ""
    return base_query + where_clause
