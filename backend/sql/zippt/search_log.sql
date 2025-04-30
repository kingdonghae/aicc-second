create table zippt.search_log
(
    id          bigint auto_increment
        primary key,
    keyword     varchar(255) not null,
    searched_at datetime     not null,
    user_id     varchar(100) null,
    ip_address  varchar(45)  null
);

create index keyword
    on zippt.search_log (keyword);

create index searched_at
    on zippt.search_log (searched_at);

