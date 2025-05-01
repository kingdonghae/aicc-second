create table district_stats
(
    id                 bigint unsigned auto_increment
        primary key,
    top_region         varchar(50)                           not null comment '최상위 행정구역 (시/도)',
    mid_region         varchar(50)                           not null comment '상위 행정구역 (시/군/구)',
    sub_region         varchar(50)                           null comment '하위 행정구역 2단계 (읍/면)',
    region_name        varchar(100)                          not null comment '행정구역명 (동, 리 등)',
    total_housing      int unsigned                          not null comment '총 주택 수',
    population_density float                                 not null comment '인구 밀도 (명/㎢)',
    total_population   int unsigned                          not null comment '총 인구 수',
    total_households   int unsigned                          not null comment '총 가구 수',
    average_age        float                                 not null comment '평균 나이 (세)',
    avg_household_size float                                 not null comment '평균 가구원 수',
    created_at         timestamp default current_timestamp() null,
    updated_at         timestamp default current_timestamp() null on update current_timestamp()
)
    collate = utf8mb4_unicode_ci;

