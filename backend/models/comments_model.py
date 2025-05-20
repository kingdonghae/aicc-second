
def insert_comment_query():
    return """
                INSERT INTO COMMENTS (
                   POST_ID
                 , CONTENT
                 , WRITER
                )
                VALUES (
                   %s       /* 게시물 아이디 */
                 , %s       /* 댓글 내용 */
                 , %s       /* 작성자 아이디 */
                )
    """

def get_comments_by_post_query():
    return """
        SELECT
             c.ID             AS id             /* 키 값 */
           , c.POST_ID        AS post_id        /* 게시물 아이디 */
           , c.CONTENT        AS content        /* 댓글 내용 */  
           , c.WRITER         AS writer         /* 작성자 아이디 */
           , c.CREATED_AT     AS created_at     /* 작성 시간 */
           , u.USERNAME       AS username       /* 작성자 명 */ 
        FROM
             COMMENTS c
        JOIN 
             USERS u
          ON 
             writer = u.id       
        WHERE
            POST_ID = %s                      /* 게시물 아이디 */  
        ORDER BY CREATED_AT 
    """

def select_comment_by_id_query():
    return """
        SELECT 
              c.ID             AS id             /* 키 값 */
            , c.POST_ID        AS post_id        /* 게시물 아이디 */
            , c.CONTENT        AS content        /* 댓글 내용 */  
            , c.WRITER         AS writer         /* 작성자 아이디 */
            , c.CREATED_AT     AS created_at     /* 작성 시간 */
            , u.USERNAME       AS username       /* 작성자 명 */ 
        FROM 
              COMMENTS c
        JOIN 
              USERS u
          ON 
              writer = u.id
        WHERE 
              c.ID = %s                           /* 댓글 아이디 */
    """

def delete_comment_by_id_query():
    return """
        DELETE FROM COMMENTS
        WHERE ID = %s
    """
