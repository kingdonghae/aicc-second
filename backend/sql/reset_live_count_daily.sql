create definer = root@`desktop-q3nq1o3` event reset_live_count_daily on schedule
    every '1' DAY
        starts '2025-05-03 00:00:00'
    enable
    do
    BEGIN
        UPDATE search_ranking_live
        SET live_count = 0;
    END;

