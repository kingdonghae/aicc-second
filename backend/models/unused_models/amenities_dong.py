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

# ▶ 1. 원본 amenity 테이블 전체 로드
df = pd.read_sql("SELECT * FROM amenities", engine)

# ▶ 2. geometry 생성
df["geometry"] = df.apply(lambda row: Point(row["lng"], row["lat"]), axis=1)
points_gdf = gpd.GeoDataFrame(df, geometry="geometry", crs="EPSG:4326")

# ▶ 3. 행정동 GeoJSON 파일 로드
dong_gdf = gpd.read_file("./HangJeongDong_ver20250401.geojson")

# ▶ 4. 공간 조인 (좌표 기반으로 행정동 찾기)
joined = gpd.sjoin(points_gdf, dong_gdf, how="left", predicate="within")

# ▶ 5. 행정동 관련 필드 생성
joined["full_adrs_admin"] = joined["adm_nm"]
joined["dong_admin"] = joined["adm_nm"].apply(lambda x: x.split()[-1] if pd.notnull(x) else None)

# ▶ 6. 기존 컬럼 + 행정동 정보만 포함
final_cols = list(df.columns) + ["full_adrs_admin", "dong_admin"]
result = joined[final_cols]

# ▶ 7. 새 테이블로 저장
result.to_sql("amenities_dong", con=engine, index=False, if_exists="replace")

print("✅ 'amenities_dong' 테이블 생성 완료 (행정동 전체주소 및 동명만 포함)")
