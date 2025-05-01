create table safety_score
(
    station_id   bigint                                not null
        primary key,
    cctv_count   int                                   null,
    crime_index  float                                 null,
    safety_score float                                 null,
    updated_at   timestamp default current_timestamp() null
);

