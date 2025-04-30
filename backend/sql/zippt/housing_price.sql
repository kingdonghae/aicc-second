create table zippt.housing_price
(
    id            bigint unsigned auto_increment
        primary key,
    house_nm      varchar(100)                        null comment '건물/단지명',
    house_type    varchar(50)                         null comment '건물 유형 (아파트, 다세대 등)',
    deposit       bigint unsigned                     null comment '보증금 (단위: 원)',
    monthly_rent  bigint unsigned                     null comment '월세 (단위: 원)',
    contract_type varchar(20)                         null comment '계약 유형 (전세, 월세, 매매)',
    contract_term varchar(20)                         null comment '계약 기간 (예: 2년)',
    build_year    year                                null comment '건축년도',
    deal_year     year                                null comment '거래 연도',
    deal_month    tinyint                             null comment '거래 월',
    deal_day      tinyint                             null comment '거래 일',
    exclu_use_ar  float                               null comment '전용면적(m²)',
    floor         varchar(10)                         null comment '층수',
    jibun         varchar(100)                        null comment '지번주소',
    umd_nm        varchar(50)                         null comment '읍면동 이름',
    sgg_cd        varchar(10)                         null comment '시군구 코드',
    region        varchar(50)                         null comment '시군구명',
    lawd_cd       varchar(10)                         null comment '법정동 코드',
    full_adrs     varchar(255)                        null comment '전체 주소',
    lat           decimal(10, 7)                      null comment '위도',
    lng           decimal(10, 7)                      null comment '경도',
    location      point                               not null comment '공간좌표 (lng lat)',
    created_at    timestamp default CURRENT_TIMESTAMP null,
    updated_at    timestamp default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP
)
    collate = utf8mb4_unicode_ci;

create spatial index idx_location
    on zippt.housing_price (location);

