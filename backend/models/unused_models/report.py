import pandas as pd
import pymysql
from sqlalchemy import create_engine
import matplotlib.pyplot as plt
import seaborn as sns

# pip install pymysql sqlalchemy pandas matplotlib seaborn

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


# rent_score 테이블에서 데이터 불러오기
query = "SELECT * FROM rent_score"
df = pd.read_sql(query, engine)

# 1. 기초 통계 요약
print("기초 통계 요약:\n", df.describe(include='all'))

# 2. 건축년도별 평균 월세 분석
avg_monthly_rent_by_year = df.groupby('buildYear')['monthlyRent'].mean()
print("\n건축년도별 평균 월세:\n", avg_monthly_rent_by_year)

# 시각화
plt.figure(figsize=(10,5))
avg_monthly_rent_by_year.plot(kind='bar', color='skyblue')
plt.title("건축년도별 평균 월세")
plt.ylabel("평균 월세 (만원)")
plt.xlabel("건축년도")
plt.tight_layout()
plt.show()

# 3. m²당 월세비용 분포
plt.figure(figsize=(8,5))
sns.histplot(df['monthly_per_m2'], kde=True, bins=10, color='coral')
plt.title("m²당 월세 비용 분포")
plt.xlabel("월세 / m²")
plt.tight_layout()
plt.show()

# 4. 스코어 상위 아파트
top_scores = df[['houseNm', 'score']].sort_values(by='score', ascending=False)
print("\n스코어 기준 상위 아파트:\n", top_scores.head(5))

# 5. 지역(동)별 계약 건수
contracts_per_area = df['umdNm'].value_counts()
print("\n동(지역)별 계약 수:\n", contracts_per_area)

plt.figure(figsize=(8,4))
contracts_per_area.plot(kind='bar', color='green')
plt.title("동(지역)별 계약 건수")
plt.ylabel("건수")
plt.tight_layout()
plt.show()

# 6. 상관관계 분석
numeric_cols = ['deposit', 'monthlyRent', 'excluUseAr', 'converted_deposit',
                'total_monthly_cost', 'monthly_per_m2', 'building_score',
                'monthly_score', 'raw_score', 'score']
corr = df[numeric_cols].corr()

plt.figure(figsize=(10,8))
sns.heatmap(corr, annot=True, cmap='coolwarm', fmt=".2f")
plt.title("수치형 변수 간 상관관계")
plt.tight_layout()
plt.show()
