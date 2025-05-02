create table search_ranking_weekly
(
    week_start   date         not null,
    keyword      varchar(255) not null,
    current_rank int          null,
    count        int          null,
    diff_rank    int          null,
    primary key (week_start, keyword)
)
    collate = utf8mb4_0900_ai_ci;

