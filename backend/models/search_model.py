
def insert_search_log_query():
    return """
                INSERT IGNORE INTO SEARCH_LOG
                ( 
                    KEYWORD 
                  , USER_ID
                  , CLIENT_ID
                )
                VALUES (
                  %s    /*검색 주소*/
                , %s    /*검색한 유저 아이디*/
                , %s    /*쿠키 토큰*/
                )
       """
