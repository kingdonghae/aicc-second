
def insert_search_log_query():
    return """
                INSERT IGNORE INTO SEARCH_LOG
                ( 
                    INPUT_ADDRESS
                  , KEYWORD 
                  , USER_ID
                  , CLIENT_ID
                )
                VALUES (
                  %s
                , %s
                , %s
                , %s
                )
       """
