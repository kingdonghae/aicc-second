create table facility
(
    id            bigint unsigned auto_increment
        primary key,
    facility_type varchar(50)                           not null comment '시설 종류 (예: 초등학교, 경찰서 등)',
    name          varchar(100)                          not null comment '시설명',
    address       varchar(255)                          not null comment '지번 또는 도로명 주소',
    lat           decimal(10, 7)                        not null comment '위도',
    lng           decimal(10, 7)                        not null comment '경도',
    location      point                                 not null comment '공간 검색용 좌표 (lng lat)',
    created_at    timestamp default current_timestamp() null,
    updated_at    timestamp default current_timestamp() null on update current_timestamp()
)
    collate = utf8mb4_unicode_ci;

create spatial index idx_location
    on facility (location);

