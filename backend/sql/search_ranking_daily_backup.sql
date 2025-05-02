create table search_ranking_daily_backup
(
    id               bigint auto_increment
        primary key,
    keyword          varchar(255)                         not null,
    count            int      default 1                   not null,
    previous_ranking int                                  null,
    current_ranking  int                                  null,
    created_at       datetime default current_timestamp() null,
    updated_at       datetime default current_timestamp() null on update current_timestamp()
)
    collate = utf8mb4_uca1400_ai_ci;

