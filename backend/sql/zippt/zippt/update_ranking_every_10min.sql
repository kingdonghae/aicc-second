create definer = root@`desktop-q3nq1o3` event update_ranking_every_10min on schedule
    every '10' MINUTE
        starts '2025-05-01 17:25:13'
    enable
    do
    BEGIN
        -- 1. 이전 순위로 current_ranking 값을 저장
        UPDATE search_ranking_daily
        SET previous_ranking = current_ranking;

        -- 2. count 기준으로 current_ranking 다시 계산
        SET @rank := 0;
        UPDATE search_ranking_daily
        SET current_ranking = (@rank := @rank + 1)
        ORDER BY count DESC;
    END;

