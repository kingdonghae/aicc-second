create table search_log
(
    id          bigint auto_increment
        primary key,
    keyword     varchar(255) not null,
    searched_at datetime     not null,
    user_id     varchar(100) null,
    ip_address  varchar(45)  null
);

create index keyword
    on search_log (keyword);

create index searched_at
    on search_log (searched_at);

create table search_ranking_daily
(
    id            bigint auto_increment
        primary key,
    keyword       varchar(255)                         not null,
    count         int      default 1                   not null,
    snapshot_rank int                                  not null,
    created_at    datetime default current_timestamp() null,
    updated_at    datetime default current_timestamp() null on update current_timestamp()
)
    collate = utf8mb4_uca1400_ai_ci;

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

create table search_ranking_weekly
(
    id                  bigint auto_increment
        primary key,
    keyword             varchar(255)                         not null,
    count               int      default 1                   not null,
    `previous _ranking` int                                  not null,
    ranking_week        int                                  not null,
    created_at          datetime default current_timestamp() null on update current_timestamp(),
    constraint unique_weekly
        unique (keyword, ranking_week)
)
    collate = utf8mb4_uca1400_ai_ci;

