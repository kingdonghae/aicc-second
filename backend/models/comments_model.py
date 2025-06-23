
def insert_comment_query():
    return """
                INSERT INTO COMMENTS (
                   POST_ID
                 , CONTENT
                 , WRITER
                )
                VALUES (
                   %s       
                 , %s       
                 , %s      
                )
    """

def get_comments_by_post_query():
    return """
        SELECT
             c.ID             AS id            
           , c.POST_ID        AS post_id        
           , c.CONTENT        AS content        
           , c.WRITER         AS writer        
           , c.CREATED_AT     AS created_at     
           , u.USERNAME       AS username      
        FROM
             COMMENTS c
        JOIN 
             USERS u
          ON 
             writer = u.id       
        WHERE
            POST_ID = %s                     
        ORDER BY CREATED_AT 
    """

def select_comment_by_id_query():
    return """
        SELECT 
              c.ID             AS id             
            , c.POST_ID        AS post_id        
            , c.CONTENT        AS content        
            , c.WRITER         AS writer         
            , c.CREATED_AT     AS created_at     
            , u.USERNAME       AS username       
        FROM 
              COMMENTS c
        JOIN 
              USERS u
          ON 
              writer = u.id
        WHERE 
              c.ID = %s                           
    """

def delete_comment_by_id_query():
    return """
        DELETE FROM COMMENTS
        WHERE ID = %s
    """
