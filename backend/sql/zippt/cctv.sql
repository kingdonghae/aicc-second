create table zippt.cctv
(
    id           bigint unsigned auto_increment
        primary key,
    road_address varchar(255)                           not null comment '도로명 주소',
    lot_address  varchar(255)                           not null comment '지번 주소',
    usage_type   varchar(100)                           not null comment '용도 (예: 방범, 어린이보호구역 등)',
    camera_count int unsigned default '1'               not null comment '해당 위치의 카메라 대수',
    lat          decimal(10, 7)                         not null comment '위도',
    lng          decimal(10, 7)                         not null comment '경도',
    location     point                                  not null comment '공간 검색용 위치 좌표 (lat, lng)',
    created_at   timestamp    default CURRENT_TIMESTAMP null,
    updated_at   timestamp    default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP
)
    collate = utf8mb4_unicode_ci;

create spatial index idx_location
    on zippt.cctv (location);

