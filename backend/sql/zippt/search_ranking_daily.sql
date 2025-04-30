create table zippt.search_ranking_daily
(
    id               bigint auto_increment
        primary key,
    keyword          varchar(255)                       not null,
    count            int      default 1                 not null,
    previous_ranking int                                not null,
    created_at       datetime default CURRENT_TIMESTAMP null,
    updated_at       datetime default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP
);

