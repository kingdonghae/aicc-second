create table zippt.search_ranking_weekly
(
    id               bigint auto_increment
        primary key,
    keyword          varchar(255)                       not null,
    count            int      default 1                 not null,
    previous_ranking int                                not null,
    ranking_week     int                                not null,
    created_at       datetime default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP,
    constraint unique_weekly
        unique (keyword, ranking_week)
);

