import pandas as pd
import pymysql

# DB 연결
conn = pymysql.connect(
    host="192.168.10.14",
    user="root",
    password="0000",
    database="data_load",
    charset="utf8mb4"
)

# population 테이블 읽기
df = pd.read_sql("SELECT * FROM population", conn)

# popuDen을 숫자로 변환
df["popuDen"] = pd.to_numeric(df["popuDen"], errors="coerce")

# 분위 점수 계산 (낮을수록 점수 높음)
df["score"] = pd.qcut(df["popuDen"], 10, labels=False, duplicates="drop")
df["score"] = 10 - df["score"]

# 기존 테이블 삭제 후 새로 생성
with conn.cursor() as cursor:
    cursor.execute("DROP TABLE IF EXISTS population_score")
    cursor.execute("""
        CREATE TABLE population_score (
            ID INT PRIMARY KEY,
            region TEXT,
            district1 TEXT,
            district2 TEXT,
            district3 TEXT,
            numOfHouse DECIMAL(20,10),
            popuDen DECIMAL(20,10),
            numOfHuman INT,
            numOfHouseshold INT,
            avrAge DECIMAL(20,10),
            avgHouseholdSize DECIMAL(20,10),
            fullAdrs TEXT,
            lat DOUBLE,
            lng DOUBLE,
            score INT
        )
    """)

    insert_sql = """
        INSERT INTO population_score (
            ID, region, district1, district2, district3,
            numOfHouse, popuDen, numOfHuman, numOfHouseshold,
            avrAge, avgHouseholdSize, fullAdrs, lat, lng, score
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """

    for _, row in df.iterrows():
        safe = row.where(pd.notnull(row), None)
        cursor.execute(insert_sql, (
            int(safe["ID"]),
            safe["region"],
            safe["district1"],
            safe["district2"],
            safe["district3"],
            safe["numOfHouse"],
            safe["popuDen"],
            safe["numOfHuman"],
            safe["numOfHouseshold"],
            safe["avrAge"],
            safe["avgHouseholdSize"],
            safe["fullAdrs"],
            safe["lat"],
            safe["lng"],
            int(safe["score"]) if safe["score"] is not None else 0
        ))

    conn.commit()

print("✅ population_score 테이블 생성 및 저장 완료!")
