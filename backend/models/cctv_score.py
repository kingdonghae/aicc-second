import pandas as pd
import pymysql

# MySQL 연결 설정
conn = pymysql.connect(
    host="192.168.10.14",
    user="root",
    password="0000",
    database="data_load",
    charset="utf8mb4"
)

# cctv 테이블에서 데이터 읽기
df = pd.read_sql("SELECT * FROM cctv", conn)

# numOfCam 필드를 정수형으로 변환
df["numOfCam"] = pd.to_numeric(df["numOfCam"], errors="coerce")

# 결측값 처리: numOfCam이 NaN인 경우 0으로 대체
df["numOfCam"] = df["numOfCam"].fillna(0)

# 십분위수 계산: 가장 낮은 값은 1, 가장 높은 값은 10
df["score"] = pd.qcut(df["numOfCam"], 10, labels=False, duplicates="drop") + 1

# cctv_score 테이블 생성
with conn.cursor() as cursor:
    cursor.execute("DROP TABLE IF EXISTS cctv_score")
    cursor.execute("""
        CREATE TABLE cctv_score (
            ID INT PRIMARY KEY,
            parcAdrs TEXT,
            lnAdrs TEXT,
            lat DECIMAL(20,10),
            lon DECIMAL(20,10),
            instPur TEXT,
            numOfCam INT,
            score INT
        )
    """)

    # 데이터 삽입
    insert_sql = """
        INSERT INTO cctv_score (
            ID, parcAdrs, lnAdrs, lat, lon, instPur, numOfCam, score
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """

    for _, row in df.iterrows():
        safe_row = row.where(pd.notnull(row), None)
        cursor.execute(insert_sql, (
            int(safe_row["ID"]),
            safe_row["parcAdrs"],
            safe_row["lnAdrs"],
            safe_row["lat"],
            safe_row["lon"],
            safe_row["instPur"],
            int(safe_row["numOfCam"]),
            int(safe_row["score"])
        ))

    conn.commit()

# 상위 10개 출력
top10 = df.sort_values("score", ascending=False).head(10)
print(top10[["ID", "parcAdrs", "lnAdrs", "numOfCam", "score"]])
