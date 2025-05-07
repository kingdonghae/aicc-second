create table search_ranking_live
(
    keyword    varchar(255)                         not null
        primary key,
    live_count int      default 0                   not null,
    updated_at datetime default current_timestamp() not null on update current_timestamp()
)

collate = utf8mb4_0900_ai_ci;