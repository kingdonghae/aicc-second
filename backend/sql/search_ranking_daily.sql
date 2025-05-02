create table search_ranking_daily
(
    start_date      date         not null,
    keyword         varchar(255) not null,
    current_ranking int          null,
    count           int          null,
    diff_rank       int          null,
    primary key (start_date, keyword)
)
    collate = utf8mb4_uca1400_ai_ci;

