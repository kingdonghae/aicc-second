create table zippt.search_ranking_monthly
(
    id               bigint auto_increment
        primary key,
    keyword          varchar(255)                       not null,
    count            int      default 1                 not null,
    previous_ranking int                                not null,
    ranking_month    char(7)                            not null,
    created_at       datetime default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP,
    constraint unique_monthly
        unique (keyword, ranking_month)
);

