
def get_daily_rank_query():
    return """
                SELECT
                      KEYWORD                             AS keyword        
                    , COUNT                               AS count           
                    , CURRENT_RANKING                     AS currentRank     
                    , DIFF_RANK                           AS diffRank        
                    , 'daily'                             AS periodType      
                FROM SEARCH_RANKING_DAILY
                WHERE DATE(START_DATE) = DATE(now())
                ORDER BY COUNT DESC
                LIMIT 5
           """

def get_weekly_rank_query():
    return """
                SELECT
                    KEYWORD                 AS keyword,        
                    COUNT                   AS count,           
                    CURRENT_RANK            AS currentRank,     
                    DIFF_RANK               AS diffRank,        
                    'weekly'                AS periodType       
                FROM search_ranking_weekly
                WHERE WEEK_START = DATE_ADD(
                    STR_TO_DATE(CONCAT(%s, '-01-04'), '%%Y-%%m-%%d')
                        - INTERVAL WEEKDAY(STR_TO_DATE(CONCAT(%s, '-01-04'), '%%Y-%%m-%%d')) DAY,
                    INTERVAL (%s - 1) WEEK
                )
                ORDER BY COUNT DESC
                LIMIT 5;
    """

def get_monthly_rank_query():
    return """
                SELECT
                      KEYWORD                                    AS keyword            
                    , COUNT                                      AS count               
                    , ROW_NUMBER() OVER (ORDER BY COUNT DESC)    AS currentRank         
                    , DIFF_RANK                                  AS diffRank             
                    , 'monthly'                                  AS periodType          
                FROM SEARCH_RANKING_MONTHLY
                WHERE YEAR = %s AND MONTH = %s
                ORDER BY COUNT DESC
                LIMIT 5
    """

def get_keyword_rank_query():
    return """
                SELECT
                      KEYWORD                   AS keyword         
                    , COUNT                     AS count           
                    , CURRENT_RANKING           AS currentRank     
                FROM SEARCH_RANKING_DAILY
                WHERE KEYWORD = %s 
                and start_date = current_date
    """

def check_search_keyword_duplicate():
    return """
               SELECT 
                     COUNT(1)
               FROM 
                     SEARCH_LOG
               WHERE 
                      (
                        (USER_ID = %s AND KEYWORD = %s)
                         OR (IP_ADDRESS = %s AND KEYWORD = %s)
                      )
                     AND DATE(SEARCHED_AT)   = DATE(NOW());
           """

def insert_search_keyword_query():
    return """
                INSERT INTO SEARCH_RANKING_LIVE (
                    KEYWORD,
                    LIVE_COUNT
                ) VALUES (
                    %s,
                    1
                )
                ON DUPLICATE KEY UPDATE 
                    LIVE_COUNT = LIVE_COUNT + 1;
    """



