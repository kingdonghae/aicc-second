create table zippt.crime_station
(
    id             bigint unsigned auto_increment
        primary key,
    sido           varchar(50)                         not null comment '시도',
    sigungu        varchar(50)                         not null comment '시군구',
    police_station varchar(100)                        not null comment '관할 경찰서명',
    post_name      varchar(100)                        not null comment '파출소 이름',
    lng            decimal(10, 7)                      not null comment '경도',
    lat            decimal(10, 7)                      not null comment '위도',
    crime_index    float     default 0                 not null comment '범죄지수',
    location       point                               not null comment '공간 좌표 (lng lat)',
    created_at     timestamp default CURRENT_TIMESTAMP null,
    updated_at     timestamp default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP
)
    collate = utf8mb4_unicode_ci;

create spatial index idx_location
    on zippt.crime_station (location);

