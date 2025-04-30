create table zippt.noise
(
    id           bigint unsigned auto_increment
        primary key,
    network_type varchar(50)                         not null comment '측정망 유형',
    city         varchar(50)                         not null comment '도시명',
    station_name varchar(100)                        not null comment '측정지점 이름',
    region       varchar(100)                        not null comment '행정 지역명',
    year         year                                not null comment '측정 연도',
    quarter      tinyint                             not null comment '측정 분기 (1~4)',
    day_09       float                               not null comment '주간 09시 소음(dB)',
    day_12       float                               not null comment '주간 12시 소음(dB)',
    day_16       float                               not null comment '주간 16시 소음(dB)',
    day_20       float                               not null comment '주간 20시 소음(dB)',
    day_avg      float                               not null comment '주간 평균 소음(dB)',
    night_23     float                               not null comment '야간 23시 소음(dB)',
    night_01     float                               not null comment '야간 01시 소음(dB)',
    night_avg    float                               not null comment '야간 평균 소음(dB)',
    created_at   timestamp default CURRENT_TIMESTAMP null,
    updated_at   timestamp default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP,
    check (`quarter` between 1 and 4)
)
    collate = utf8mb4_unicode_ci;

