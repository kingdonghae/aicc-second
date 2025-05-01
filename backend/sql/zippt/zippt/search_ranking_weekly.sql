create table search_ranking_weekly
(
    id               bigint auto_increment
        primary key,
    keyword          varchar(255)                         not null,
    count            int      default 1                   not null,
    previous_ranking int                                  not null,
    ranking_week     int                                  not null,
    created_at       datetime default current_timestamp() null on update current_timestamp(),
    constraint unique_weekly
        unique (keyword, ranking_week)
)
    collate = utf8mb4_uca1400_ai_ci;

