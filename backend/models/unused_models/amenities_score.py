# # import pandas as pd
# # import geopandas as gpd
# # from shapely.geometry import Point
# # from sqlalchemy import create_engine

# # # ▶ MySQL 연결
# # db_config = {
# #     "user": "root",
# #     "password": "0000",
# #     "host": "192.168.10.14",
# #     "port": 3306,
# #     "database": "data_load",
# # }
# # engine = create_engine(
# #     f"mysql+pymysql://{db_config['user']}:{db_config['password']}@{db_config['host']}:{db_config['port']}/{db_config['database']}?charset=utf8mb4"
# # )

# # # ▶ 1. 데이터 불러오기 + null 제거
# # df = pd.read_sql("SELECT * FROM amenities_dong", engine)
# # df = df.dropna(subset=["lat", "lng"])  # 이미지에서는 lng로 표시됨

# # # ▶ 2. geometry 생성 (필요한 경우, 이미 있을 수 있음)
# # df["geometry"] = df.apply(lambda row: Point(row["lng"], row["lat"]), axis=1)
# # points_gdf = gpd.GeoDataFrame(df, geometry="geometry", crs="EPSG:4326")

# # # ▶ 3. GeoJSON 로드 + 공간 조인
# # dong_gdf = gpd.read_file("./HangJeongDong_ver20250401.geojson")
# # joined = gpd.sjoin(points_gdf, dong_gdf, how="left", predicate="within")
# # joined["full_adrs_admin"] = joined["full_adrs_admin"].fillna(joined["adm_nm"])
# # joined["dong_admin"] = joined["dong_admin"].fillna(joined["adm_nm"].apply(
# #     lambda x: x.split()[-1] if pd.notnull(x) else None
# # ))

# # # ▶ 4. 행정동별 + fcilType별 count 집계
# # pivot = pd.pivot_table(
# #     joined,
# #     index="full_adrs_admin",
# #     columns="fcilType",  # fcilType 기준으로 집계
# #     values="ID",
# #     aggfunc="count",
# #     fill_value=0
# # ).reset_index()

# # # ▶ 5. 점수 필드 계산
# # pivot["conv_score"] = pivot.get("다이소", 0)  # 편의 점수
# # pivot["safe_score"] = pivot.get("병원", 0) + pivot.get("약국", 0)  # 안전 점수
# # # 전체 편의시설 총합 점수 계산
# # amenity_columns = [col for col in pivot.columns if col != "full_adrs_admin" and col not in ["conv_score", "safe_score"]]
# # pivot["amenity_score"] = pivot[amenity_columns].sum(axis=1)

# # # ▶ 6. 10분위 점수화 (예외처리 포함)
# # try:
# #     pivot["safe_score"] = pd.qcut(pivot["safe_score"], 10, labels=False, duplicates="drop") + 1
# # except ValueError:
# #     # 데이터가 부족할 경우 순위 기반 점수화
# #     pivot["safe_score"] = pivot["safe_score"].rank(method='dense', ascending=True)
# #     if pivot["safe_score"].max() > 0:
# #         pivot["safe_score"] = ((pivot["safe_score"] - 1) / (pivot["safe_score"].max() - 1) * 9 + 1).astype(int)

# # try:
# #     pivot["conv_score"] = pd.qcut(pivot["conv_score"], 10, labels=False, duplicates="drop") + 1
# # except ValueError:
# #     pivot["conv_score"] = pivot["conv_score"].rank(method='dense', ascending=True)
# #     if pivot["conv_score"].max() > 0:
# #         pivot["conv_score"] = ((pivot["conv_score"] - 1) / (pivot["conv_score"].max() - 1) * 9 + 1).astype(int)

# # try:
# #     pivot["amenity_score"] = pd.qcut(pivot["amenity_score"], 10, labels=False, duplicates="drop") + 1
# # except ValueError:
# #     pivot["amenity_score"] = pivot["amenity_score"].rank(method='dense', ascending=True)
# #     if pivot["amenity_score"].max() > 0:
# #         pivot["amenity_score"] = ((pivot["amenity_score"] - 1) / (pivot["amenity_score"].max() - 1) * 9 + 1).astype(int)

# # # ▶ 7. 점수 병합
# # final_df = joined.merge(
# #     pivot[["full_adrs_admin", "safe_score", "conv_score", "amenity_score"]], 
# #     on="full_adrs_admin", 
# #     how="left"
# # )

# # # ▶ 8. 저장할 컬럼 구성
# # save_cols = list(df.columns) + ["safe_score", "conv_score", "amenity_score"]
# # # 중복 컬럼 제거
# # save_cols = list(dict.fromkeys(save_cols))
# # result = final_df[save_cols]

# # # ▶ 9. 테이블 저장
# # result.to_sql("amenites_score", con=engine, index=False, if_exists="replace")

# # print("✅ amenites_score 테이블 생성 완료 (행정동별 시설 점수 포함)")


# import pandas as pd
# from sqlalchemy import create_engine, text

# # MySQL 연결
# db_config = {
#     "user": "root",
#     "password": "0000",
#     "host": "192.168.10.14",
#     "port": 3306,
#     "database": "data_load",
# }
# engine = create_engine(
#     f"mysql+pymysql://{db_config['user']}:{db_config['password']}@{db_config['host']}:{db_config['port']}/{db_config['database']}?charset=utf8mb4"
# )

# # 1. 행정동별(full_adrs_admin), 시설 유형별 개수 직접 SQL로 조회
# query = """
# SELECT 
#     full_adrs_admin,
#     fcilType, 
#     COUNT(*) as count 
# FROM amenites_score 
# GROUP BY full_adrs_admin, fcilType
# """

# count_df = pd.read_sql(query, engine)

# # 2. 피벗 테이블로 변환 (행정동별 시설 유형 개수)
# pivot_df = count_df.pivot(index='full_adrs_admin', columns='fcilType', values='count').fillna(0)

# # 3. 10분위 점수 계산 함수
# def quantile_score(series):
#     try:
#         return pd.qcut(series, 10, labels=False, duplicates='drop') + 1
#     except ValueError:
#         # 데이터가 부족할 경우 순위 기반 점수화
#         rank = series.rank(method='dense', ascending=True)
#         if rank.max() > 0:
#             return ((rank - 1) / (rank.max() - 1) * 9 + 1).astype(int)
#         else:
#             return pd.Series(1, index=series.index)

# # 4. 각 시설 유형별 10분위 점수 계산
# score_df = pivot_df.copy()

# # 다이소, 병원, 약국 컬럼에 대해 점수 계산
# for facility in ['다이소', '병원', '약국']:
#     if facility in pivot_df.columns:
#         score_df[f'{facility}_score'] = quantile_score(pivot_df[facility])

# # 5. 종합 점수 계산
# if '다이소' in pivot_df.columns:
#     score_df['conv_score'] = quantile_score(pivot_df['다이소'])

# # 안전 시설 점수 (병원+약국)
# safe_cols = []
# if '병원' in pivot_df.columns:
#     safe_cols.append('병원')
# if '약국' in pivot_df.columns:
#     safe_cols.append('약국')

# if safe_cols:
#     score_df['safe_score'] = quantile_score(pivot_df[safe_cols].sum(axis=1))

# # 6. 결과 테이블 저장
# score_df.reset_index(inplace=True)
# score_df.to_sql('full_adrs_admin_facility_score', con=engine, index=False, if_exists='replace')

# print("✅ 행정동별(full_adrs_admin) 시설 유형 점수 테이블 생성 완료")


import pandas as pd
import geopandas as gpd
from shapely.geometry import Point
from sqlalchemy import create_engine
import numpy as np

# ▶ MySQL 연결
db_config = {
    "user": "root",
    "password": "0000",
    "host": "192.168.10.14",
    "port": 3306,
    "database": "data_load",
}
engine = create_engine(
    f"mysql+pymysql://{db_config['user']}:{db_config['password']}@{db_config['host']}:{db_config['port']}/{db_config['database']}?charset=utf8mb4"
)

# ▶ 1. 데이터 불러오기 + null 제거
df = pd.read_sql("SELECT * FROM amenities_dong", engine)
df = df.dropna(subset=["lat", "lng"])

# ▶ 2. geometry 생성
df["geometry"] = df.apply(lambda row: Point(row["lng"], row["lat"]), axis=1)
points_gdf = gpd.GeoDataFrame(df, geometry="geometry", crs="EPSG:4326")

# ▶ 3. GeoJSON 로드 + 공간 조인
dong_gdf = gpd.read_file("./HangJeongDong_ver20250401.geojson")
joined = gpd.sjoin(points_gdf, dong_gdf, how="left", predicate="within")
joined["full_adrs_admin"] = joined["adm_nm"]
joined["dong_admin"] = joined["adm_nm"].apply(lambda x: x.split()[-1] if pd.notnull(x) else None)

# ▶ 4. 행정동별 시설 총 개수 집계 (시설 유형 구분 없이)
count_df = joined.groupby("full_adrs_admin").size().reset_index(name="amenities_count")

# ▶ 5. 10분위 점수 계산 함수 정의
def quantile_score(series):
    try:
        result = pd.qcut(series, 10, labels=False, duplicates="drop") + 1
        if result.isnull().any():
            raise ValueError
        return result.astype(int)
    except ValueError:
        # 데이터가 부족할 경우 순위 기반 점수화
        rank = series.rank(method='dense', ascending=True)
        if rank.max() > 0:
            scaled = ((rank - 1) / (rank.max() - 1) * 9 + 1)
            scaled = scaled.replace([np.inf, -np.inf], np.nan).fillna(1)
            return scaled.astype(int)
        else:
            return pd.Series(1, index=series.index)

# ▶ 6. 10분위 점수 계산
count_df["amenities_score"] = quantile_score(count_df["amenities_count"])

# ▶ 7. 점수를 원본 데이터와 병합
final_df = joined.merge(count_df[["full_adrs_admin", "amenities_score"]], on="full_adrs_admin", how="left")

# ▶ 8. 저장할 컬럼 구성
save_cols = list(df.columns) + ["full_adrs_admin", "dong_admin", "amenities_score"]
save_cols = list(dict.fromkeys(save_cols))  # 중복 제거
result = final_df[save_cols]

# ▶ 9. 테이블 저장
result.to_sql("amenities_score", con=engine, index=False, if_exists="replace")

print("✅ amenities_score 테이블 생성 완료 (행정동별 통합 시설 점수 포함)")
