
def insert_search_log_query():
    return """
                INSERT IGNORE INTO SEARCH_LOG
                ( 
                    KEYWORD 
                  , USER_ID
                  , CLIENT_ID
                )
                VALUES (
                  %s    
                , %s    
                , %s    
                )
       """
