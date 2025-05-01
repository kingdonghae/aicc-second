create table search_ranking_monthly
(
    id               bigint auto_increment
        primary key,
    keyword          varchar(255)                         not null,
    count            int      default 1                   not null,
    previous_ranking int                                  not null,
    ranking_month    char(7)                              not null,
    created_at       datetime default current_timestamp() null on update current_timestamp(),
    constraint unique_monthly
        unique (keyword, ranking_month)
)
    collate = utf8mb4_uca1400_ai_ci;

