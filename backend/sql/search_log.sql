create table search_log
(
    id          bigint auto_increment
        primary key,
    keyword     varchar(255)                         not null,
    searched_at datetime default current_timestamp() not null,
    search_date date as (cast(`searched_at` as date)) stored,
    user_id     varchar(100)                         null,
    ip_address  varchar(45)                          null,
    constraint uniq_ip
        unique (search_date, keyword, ip_address),
    constraint uniq_user
        unique (search_date, keyword, user_id)
)
    collate = utf8mb4_0900_ai_ci;

create index idx_keyword
    on search_log (keyword);

create index idx_searched_at
    on search_log (searched_at);

