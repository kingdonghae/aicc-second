import pandas as pd
import pymysql

# MySQL 연결
conn = pymysql.connect(
    host="192.168.10.14",
    user="root",
    password="0000",
    database="data_load",
    charset="utf8mb4"
)

# 데이터 불러오기
df = pd.read_sql("SELECT * FROM rent", conn)

# 쉼표 제거 및 숫자형 컬럼 변환
df["deposit"] = df["deposit"].astype(str).str.replace(",", "").str.strip()
df["monthlyRent"] = df["monthlyRent"].astype(str).str.replace(",", "").str.strip()

numeric_cols = ["floor", "excluUseAr", "deposit", "monthlyRent", "buildYear",
                "dealYear", "dealMonth", "dealDay", "sggCd", "lawd_cd", "lat", "lon"]
for col in numeric_cols:
    df[col] = pd.to_numeric(df[col], errors="coerce")

# 결측값 처리
df["deposit"] = df["deposit"].fillna(0)
df["monthlyRent"] = df["monthlyRent"].fillna(0)

# 점수 계산
df["floor_score"] = df["floor"] / df["floor"].max()
df["floor_score"] = df["floor_score"].fillna(0)

df["converted_deposit"] = df["deposit"] * 0.015
df["total_monthly_cost"] = df["monthlyRent"] + df["converted_deposit"]
df["monthly_per_m2"] = df["total_monthly_cost"] / df["excluUseAr"]
df["monthly_per_m2"] = df["monthly_per_m2"].fillna(0)

current_year = 2025
df["building_score"] = 1 - ((current_year - df["buildYear"]) / (current_year - df["buildYear"].min()))
df["building_score"] = df["building_score"].fillna(0)

df["monthly_score"] = 1 - (df["monthly_per_m2"] / df["monthly_per_m2"].max())
df["monthly_score"] = df["monthly_score"].fillna(0)

df["raw_score"] = (
    0.3 * df["floor_score"] +
    0.3 * df["monthly_score"] +
    0.2 * df["building_score"] +
    0.2 * (1 - df["total_monthly_cost"] / df["total_monthly_cost"].max())
)
df["raw_score"] = df["raw_score"].fillna(0)

# 십분위수로 점수 변환: 가장 낮은 점수는 1, 가장 높은 점수는 10
df["score"] = pd.qcut(df["raw_score"], 10, labels=False, duplicates="drop") + 1
df["score"] = df["score"].fillna(0).astype(int)

# 테이블 생성
with conn.cursor() as cursor:
    cursor.execute("DROP TABLE IF EXISTS rent_score")
    cursor.execute("""
        CREATE TABLE rent_score (
            id INT PRIMARY KEY,
            houseNm TEXT,
            houseType TEXT,
            deposit INT,
            monthlyRent INT,
            contractType TEXT,
            contractTerm TEXT,
            buildYear INT,
            dealYear INT,
            dealMonth INT,
            dealDay INT,
            excluUseAr DECIMAL(20,10),
            floor INT,
            jibun TEXT,
            umdNm TEXT,
            sggCd INT,
            region TEXT,
            lawd_cd INT,
            fullAdrs TEXT,
            lat DECIMAL(20,10),
            lon DECIMAL(20,10),
            converted_deposit FLOAT,
            floor_score FLOAT,
            total_monthly_cost FLOAT,
            monthly_per_m2 FLOAT,
            building_score FLOAT,
            monthly_score FLOAT,
            raw_score FLOAT,
            score INT
        )
    """)

    insert_sql = """
        INSERT INTO rent_score (
            id, houseNm, houseType, deposit, monthlyRent, contractType, contractTerm,
            buildYear, dealYear, dealMonth, dealDay, excluUseAr, floor, jibun, umdNm,
            sggCd, region, lawd_cd, fullAdrs, lat, lon, converted_deposit,
            floor_score, total_monthly_cost, monthly_per_m2, building_score,
            monthly_score, raw_score, score
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """

    for _, row in df.iterrows():
        safe_row = row.where(pd.notnull(row), None)
        cursor.execute(insert_sql, (
            int(safe_row["id"]),
            safe_row["houseNm"],
            safe_row["houseType"],
            int(safe_row["deposit"]) if safe_row["deposit"] is not None else 0,
            int(safe_row["monthlyRent"]) if safe_row["monthlyRent"] is not None else 0,
            safe_row["contractType"],
            safe_row["contractTerm"],
            int(safe_row["buildYear"]) if safe_row["buildYear"] is not None else None,
            int(safe_row["dealYear"]) if safe_row["dealYear"] is not None else None,
            int(safe_row["dealMonth"]) if safe_row["dealMonth"] is not None else None,
            int(safe_row["dealDay"]) if safe_row["dealDay"] is not None else None,
            float(safe_row["excluUseAr"]) if safe_row["excluUseAr"] is not None else None,
            int(safe_row["floor"]) if safe_row["floor"] is not None else None,
            safe_row["jibun"],
            safe_row["umdNm"],
            int(safe_row["sggCd"]) if safe_row["sggCd"] is not None else None,
            safe_row["region"],
            int(safe_row["lawd_cd"]) if safe_row["lawd_cd"] is not None else None,
            safe_row["fullAdrs"],
            float(safe_row["lat"]) if safe_row["lat"] is not None else None,
            float(safe_row["lon"]) if safe_row["lon"] is not None else None,
            float(safe_row["converted_deposit"]) if safe_row["converted_deposit"] is not None else 0.0,
            float(safe_row["floor_score"]) if safe_row["floor_score"] is not None else 0.0,
            float(safe_row["total_monthly_cost"]) if safe_row["total_monthly_cost"] is not None else 0.0,
            float(safe_row["monthly_per_m2"]) if safe_row["monthly_per_m2"] is not None else 0.0,
            float(safe_row["building_score"]) if safe_row["building_score"] is not None else 0.0,
            float(safe_row["monthly_score"]) if safe_row["monthly_score"] is not None else 0.0,
            float(safe_row["raw_score"]) if safe_row["raw_score"] is not None else 0.0,
            int(safe_row["score"]) if safe_row["score"] is not None else 0
        ))

    conn.commit()

# 상위 10개 출력
top10 = df.sort_values("score", ascending=False).head(10)
print(top10[["id", "houseNm", "region", "fullAdrs", "score"]])
