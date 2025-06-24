
def insert_post_query():
    return """
                INSERT INTO POSTS (
                    TITLE       
                  , CONTENT    
                  , WRITER      
                ) VALUES (
                    %s     
                  , %s     
                  , %s     
                );
           """
def update_post_query():
    return """
                UPDATE POSTS
                SET 
                    TITLE = %s,
                    CONTENT = %s
                WHERE 
                    ID = %s;
           """

def get_posts_query(search):
    base_query = """
        SELECT
            p.ID                         AS id,
            p.TITLE                      AS title,
            p.WRITER                     AS writer,
            u.USERNAME                   AS username,
            p.CONTENT                    AS content,
            p.VIEW_COUNT                 AS view_count,
            p.CREATED_AT                 AS created_at,
            (
                SELECT COUNT(*) 
                FROM COMMENTS c 
                WHERE c.POST_ID = p.ID
            ) AS comment_count,
            (
                SELECT COUNT(*) > 0 
                FROM FILES f 
                WHERE f.POST_ID = p.ID
            ) AS has_attachment
        FROM
            POSTS p
        JOIN USERS u ON p.WRITER = u.ID
    """
    where_clause = " WHERE p.TITLE LIKE %s" if search else ""
    order_limit_clause = " ORDER BY p.CREATED_AT DESC, p.ID DESC LIMIT %s OFFSET %s"

    return f"{base_query} {where_clause} {order_limit_clause}"


def get_post_detail_query():
    return """
                SELECT 
                       p.ID                   AS id                    
                     , p.TITLE                AS title          
                     , p.CONTENT              AS content         
                     , p.WRITER               AS writer          
                     , u.USERNAME             AS username         
                     , p.VIEW_COUNT           AS view_count          
                     , p.CREATED_AT           AS created_at         
                     ,(
                        SELECT 
                             COUNT(*) 
                        FROM 
                             posts
                      )                     AS total_count      
                 FROM 
                      POSTS p 
                 JOIN USERS u
                   ON u.ID = p.WRITER
                 WHERE p.ID = %s
           """

def get_file_query():
    return """
                SELECT 
                     FILENAME                       AS filename
                   , ORIGINAL_NAME                  AS original_name
                   , CONCAT('files/', filename)     AS url 
                FROM 
                     FILES
                WHERE 
                     POST_ID = %s
     """

def update_views_query():
    return """
                UPDATE POSTS 
                SET 
                    VIEW_COUNT = VIEW_COUNT + 1 
                WHERE 
                    ID = %s
     """


def count_posts_query(search):
    base_query = """
                    SELECT 
                         COUNT(*) as count 
                    FROM 
                         POSTS 
                """
    where_clause = " WHERE TITLE LIKE %s" if search else ""
    return base_query + where_clause
