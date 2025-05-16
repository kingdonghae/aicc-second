import pandas as pd
import geopandas as gpd
from shapely.geometry import Point
from sqlalchemy import create_engine

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
df = pd.read_sql("SELECT * FROM facility", engine)
df = df.dropna(subset=["lat", "lng"])

# ▶ 2. geometry 생성
df["geometry"] = df.apply(lambda row: Point(row["lng"], row["lat"]), axis=1)
points_gdf = gpd.GeoDataFrame(df, geometry="geometry", crs="EPSG:4326")

# ▶ 3. GeoJSON 로드 + 공간 조인
dong_gdf = gpd.read_file("./HangJeongDong_ver20250401.geojson")
joined = gpd.sjoin(points_gdf, dong_gdf, how="left", predicate="within")
joined["full_adrs_admin"] = joined["adm_nm"]
joined["dong_admin"] = joined["adm_nm"].apply(lambda x: x.split()[-1] if pd.notnull(x) else None)

# ▶ 4. 행정동별 + 대분류별 count 집계
pivot = pd.pivot_table(
    joined,
    index="full_adrs_admin",
    columns="대분류",
    values="ID",
    aggfunc="count",
    fill_value=0
).reset_index()

# ▶ 5. 점수 필드 계산
pivot["safe_score"] = pivot.get("교육시설", 0) + pivot.get("치안시설", 0)

# ▶ 6. 10분위 점수화
pivot["safe_score"] = pd.qcut(pivot["safe_score"], 10, labels=False, duplicates="drop") + 1

# ▶ 7. 병합 부분 제거 - 대신 safe_score 매핑 방식으로 변경
# safe_score를 joined에 추가하기 위해 full_adrs_admin 기준으로 매핑
safe_score_map = pivot.set_index("full_adrs_admin")["safe_score"].to_dict()
joined["safe_score"] = joined["full_adrs_admin"].map(safe_score_map)

# ▶ 8. 저장할 컬럼 구성
save_cols = list(df.columns) + ["full_adrs_admin", "dong_admin", "safe_score"]
result = joined[save_cols]

# ▶ 9. 테이블 저장
result.to_sql("facility_score", con=engine, index=False, if_exists="replace")

print("✅ facility_score 테이블 생성 완료 (행정동별 시설 점수 포함)")
