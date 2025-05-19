def insert_file_query():
    return """
            INSERT INTO FILES (
                 POST_ID
               , FILENAME
               , ORIGINAL_NAME
               , PATH
               , UPLOADER
            )
            VALUES (
                 %s
               , %s
               , %s
               , %s
               , %s
            )
    """

def select_file_by_filename_query():
    return """
                SELECT 
                      ID
                    , POST_ID
                    , FILENAME
                    , ORIGINAL_NAME
                    , PATH
                    , UPLOADER
                    , UPLOADED_AT  
                  FROM FILES
                WHERE FILENAME = %s
    """

def update_file_query():
    return """
             UPDATE 
                    FILES 
                SET 
                    POST_ID = %s 
              WHERE 
                    FILENAME = %s
    """


def update_files_unlink_query(count):
    return f"""
        UPDATE files 
        SET post_id = NULL 
        WHERE filename IN ({','.join(['%s'] * count)})
    """

def update_files_link_query(count):
    return f"""
        UPDATE files 
        SET post_id = %s 
        WHERE filename IN ({','.join(['%s'] * count)})
    """