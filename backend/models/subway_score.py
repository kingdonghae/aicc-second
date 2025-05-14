# import pandas as pd
# from sqlalchemy import create_engine, text

# # MySQL 연결 설정
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

# # 1. ONLY_FULL_GROUP_BY 모드 해제 (필요한 경우)
# with engine.connect() as conn:
#     conn.execute(text("SET SESSION sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))"))
#     conn.commit()

# # 2. subway_dong 테이블에서 행정동별 지하철 시설 개수 계산
# query = """
# SELECT fcilNm, lat, lng, geometry, full_adrs_admin, dong_admin, COUNT(*) AS count
# FROM subway_dong
# GROUP BY full_adrs_admin
# ORDER BY count DESC
# """
# count_df = pd.read_sql(query, engine)

# # 3. count를 그대로 점수로 사용 (count = score)
# count_df['subway_score'] = count_df['count']
# print(f"총 {len(count_df)}개 행정동 데이터 수집 완료")

# # 4. 결과 확인
# print("\n상위 5개 행정동 (시설 많은 순):")
# print(count_df.head(5))

# # 5. 테이블 저장
# count_df.to_sql("subway_score", con=engine, index=False, if_exists="replace")
# print("\n✅ subway_score 테이블 생성 완료")


# print("✅ subway_score 테이블 생성 완료 (원본 데이터 + 점수)")
import pandas as pd
from sqlalchemy import create_engine, text

# MySQL 연결 설정
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

# 1. ONLY_FULL_GROUP_BY 모드 해제
with engine.connect() as conn:
    conn.execute(text("SET SESSION sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))"))
    conn.commit()

# 2. subway_dong 테이블에서 행정동별 지하철 시설 개수 계산
query = """
SELECT fcilNm,fcilAdrs, lat, lng, geometry, full_adrs_admin, dong_admin, COUNT(*) AS count
FROM subway_dong
GROUP BY full_adrs_admin
ORDER BY count DESC
"""
count_df = pd.read_sql(query, engine)

# 3. count 값에 따른 점수 구간 직접 지정 함수
def custom_score(count):
    if count == 1:
        return 1
    elif count == 2:
        return 2
    elif count == 3:
        return 3
    elif count in [4, 5]:
        return 4
    elif count in [6, 7]:
        return 5
    else:
        return 5  # 8 이상은 5점으로 처리

# 4. 점수 계산 적용
count_df['score'] = count_df['count'].apply(custom_score)

# 5. 점수를 2배로 변환
count_df['subway_score'] = count_df['score'] * 2

# 6. 데이터 수집 결과 출력
print(f"총 {len(count_df)}개 행정동 데이터 수집 완료")

# 7. 결과 확인
print("\n상위 5개 행정동 (시설 많은 순):")
print(count_df.head(5))

# 8. 점수별 행정동 수 확인
score_dist = count_df['subway_score'].value_counts().sort_index()
print("\n점수별 행정동 수:")
for score, count in score_dist.items():
    print(f"- {score}점: {count}개 행정동")

# 9. 테이블 저장
count_df.to_sql("subway_score", con=engine, index=False, if_exists="replace")
print("\n✅ subway_score 테이블 생성 완료")

print("✅ subway_score 테이블 생성 완료 (원본 데이터 + 점수)")
