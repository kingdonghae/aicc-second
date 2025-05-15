import pandas as pd
import geopandas as gpd
from shapely.geometry import Point
from sqlalchemy import create_engine

# ▶ MySQL 연결 설정
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

# ▶ 1. noise 테이블 불러오기 + lat/lon NULL 제거
df = pd.read_sql("SELECT * FROM noise", engine)
df = df.dropna(subset=["lat", "lon"])

# ▶ 2. geometry 생성
df["geometry"] = df.apply(lambda row: Point(row["lon"], row["lat"]), axis=1)
points_gdf = gpd.GeoDataFrame(df, geometry="geometry", crs="EPSG:4326")

# ▶ 3. 행정동 GeoJSON 파일 로드
dong_gdf = gpd.read_file("./../HangJeongDong_ver20250401.geojson")

# ▶ 4. 공간 조인 (좌표 → 행정동)
joined = gpd.sjoin(points_gdf, dong_gdf, how="left", predicate="within")
joined["full_adrs_admin"] = joined["adm_nm"]
joined["dong_admin"] = joined["adm_nm"].apply(lambda x: x.split()[-1] if pd.notnull(x) else None)

# ▶ 5. 행정동별 nighttime_avg 평균 계산
avg_df = joined.groupby("full_adrs_admin", as_index=False)["nighttime_avg"].mean()
avg_df.rename(columns={"nighttime_avg": "dong_avg"}, inplace=True)

# ▶ 6. 십분위 score 계산
avg_df["score"] = pd.qcut(avg_df["dong_avg"], 10, labels=False, duplicates="drop") + 1

# ▶ 7. score 병합
final_df = joined.merge(avg_df[["full_adrs_admin", "score"]], on="full_adrs_admin", how="left")

# ▶ 8. 최종 저장 테이블 구성
output_cols = list(df.columns) + ["full_adrs_admin", "dong_admin", "score"]
result = final_df[output_cols]

# ▶ 9. noise_score 테이블로 저장
result.to_sql("noise_score", con=engine, index=False, if_exists="replace")

print("✅ 'noise_score' 테이블 생성 완료 (NULL 제거 + 행정동 + 소음 score 포함)")
