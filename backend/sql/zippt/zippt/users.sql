create table users
(
    id            int auto_increment
        primary key,
    userid        varchar(50)                            not null,
    username      varchar(50)                            not null,
    password      varchar(100)                           not null,
    email         varchar(100)                           null,
    phone_number  varchar(20)                            null,
    address       varchar(255)                           null,
    birthdate     date                                   null,
    agree_privacy tinyint(1) default 0                   null,
    created_at    timestamp  default current_timestamp() null,
    constraint userid
        unique (userid)
);

