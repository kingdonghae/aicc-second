
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
                        COUNT(DISTINCT c.ID)         AS comment_count,
                        COUNT(DISTINCT f.ID) > 0     AS has_attachment   
                    FROM
                        POSTS p
                    LEFT JOIN COMMENTS c ON p.ID = c.POST_ID
                    LEFT JOIN FILES f ON p.ID = f.POST_ID
                    JOIN USERS u ON p.WRITER = u.ID
        """
    where_clause = " WHERE p.TITLE LIKE %s" if search else ""
    group_by = """
        GROUP BY
            p.ID, p.CREATED_AT, p.TITLE, p.WRITER,
            u.USERNAME, p.CONTENT, p.VIEW_COUNT
    """
    order_limit_clause = " ORDER BY p.CREATED_AT DESC, p.ID DESC LIMIT %s OFFSET %s"

    return f"{base_query} {where_clause} {group_by} {order_limit_clause}"


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
