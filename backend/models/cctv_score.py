import pandas as pd
import pymysql
from sqlalchemy import create_engine

# ▶ SQLAlchemy 엔진 (read_sql 경고 방지)
engine = create_engine("mysql+pymysql://root:0000@192.168.10.14:3306/data_load?charset=utf8mb4")

# ▶ pymysql 커넥션 (데이터 쓰기용)
conn = pymysql.connect(
    host="192.168.10.14",
    user="root",
    password="0000",
    database="data_load",
    charset="utf8mb4"
)

# ▶ 1. 데이터 불러오기
df = pd.read_sql("SELECT * FROM cctv_dong", engine)

# ▶ 2. numOfCam 정수형 변환 + 결측 처리
df["numOfCam"] = pd.to_numeric(df["numOfCam"], errors="coerce").fillna(0)

# ▶ 3. 행정동별 총 카메라 수 집계
agg = df.groupby("full_adrs_admin", as_index=False)["numOfCam"].sum()
agg.rename(columns={"numOfCam": "total_cam"}, inplace=True)

# ▶ 4. 십분위 점수 계산 (1~10)
agg["score"] = pd.qcut(agg["total_cam"], 10, labels=False, duplicates="drop") + 1

# ▶ 5. 원본 df에 score 병합
df = df.merge(agg[["full_adrs_admin", "score"]], on="full_adrs_admin", how="left")

# ▶ 6. 테이블 생성 및 데이터 저장
with conn.cursor() as cursor:
    cursor.execute("DROP TABLE IF EXISTS cctv_score")
    cursor.execute("""
        CREATE TABLE cctv_score (
            ID INT PRIMARY KEY,
            parcAdrs TEXT,
            rnAdrs TEXT,
            lat DECIMAL(20,10),
            lon DECIMAL(20,10),
            instPur TEXT,
            numOfCam INT,
            full_adrs_admin TEXT,
            dong_admin TEXT,
            score INT
        )
    """)

    insert_sql = """
        INSERT INTO cctv_score (
            ID, parcAdrs, rnAdrs, lat, lon, instPur, numOfCam,
            full_adrs_admin, dong_admin, score
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """

    for _, row in df.iterrows():
        safe_row = row.where(pd.notnull(row), None)
        score_value = int(safe_row["score"]) if safe_row["score"] is not None else None
        cursor.execute(insert_sql, (
            int(safe_row["ID"]),
            safe_row["parcAdrs"],
            safe_row["rnAdrs"],
            safe_row["lat"],
            safe_row["lon"],
            safe_row["instPur"],
            int(safe_row["numOfCam"]),
            safe_row["full_adrs_admin"],
            safe_row["dong_admin"],
            score_value
        ))

    conn.commit()

# ▶ 7. 결과 출력
top10 = df.sort_values("score", ascending=False).head(10)
print("✅ 상위 10개 결과:")
print(top10[["ID", "full_adrs_admin", "numOfCam", "score"]])
