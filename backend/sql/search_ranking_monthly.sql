create table search_ranking_monthly
(
    year      int          not null,
    month     int          not null,
    keyword   varchar(255) not null,
    `rank`    int          null,
    count     int          null,
    diff_rank int          null,
    primary key (year, month, keyword)
)
    collate = utf8mb4_uca1400_ai_ci;

