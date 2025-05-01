create table search_log
(
    id          bigint auto_increment
        primary key,
    keyword     varchar(255)                         not null,
    searched_at datetime default current_timestamp() not null,
    user_id     varchar(100)                         null,
    ip_address  varchar(45)                          null
);

create index keyword
    on search_log (keyword);

create index searched_at
    on search_log (searched_at);

