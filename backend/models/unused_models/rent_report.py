# pip install pandas pymysql sqlalchemy matplotlib seaborn folium streamlit streamlit-folium
# pip uninstall streamlit tornado typing_extensions -y
# pip install streamlit==1.30.0 tornado==6.1 typing_extensions
# pip install streamlit-folium==0.8.0

# 실행 방법 streamlit run rent_report.py

import streamlit as st
import pandas as pd
import pymysql
from sqlalchemy import create_engine
import matplotlib.pyplot as plt
import seaborn as sns
import folium
from streamlit_folium import folium_static

# ✅ 한글 폰트 설정
plt.rcParams['font.family'] = 'Malgun Gothic'  # 윈도우
plt.rcParams['axes.unicode_minus'] = False

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

# ✅ 데이터 로드
@st.cache_data
def load_data():
    query = "SELECT * FROM rent_score where  region ='서울특별시 용산구'"
    df = pd.read_sql(query, engine)

    # object 타입 컬럼을 모두 str로 강제 변환 (Arrow 변환 에러 방지)
    for col in df.select_dtypes(include='object').columns:
        df[col] = df[col].fillna('').astype(str)

    # 숫자형 컬럼 오류 방지 처리
    for col in df.select_dtypes(include='number').columns:
        df[col] = pd.to_numeric(df[col], errors='coerce')

    # 계약구분 컬럼 추가 (전세/월세 판단)
    df['계약구분'] = df['monthlyRent'].apply(lambda x: '전세' if x == 0 else '월세')

    # NaN 좌표 제거 (Folium 에러 방지)
    df = df.dropna(subset=['lat', 'lng'])

    return df

df = load_data()

# ✅ 제목
st.title("\U0001F3E0 전월세 분석 리포트")

# ✅ 계약 유형별 건수 시각화
st.subheader(" 계약 유형별 건수")
contract_counts = df['contractType'].value_counts()
fig1, ax1 = plt.subplots()
contract_counts.plot(kind='bar', ax=ax1, color='skyblue')
ax1.set_title("계약 유형별 건수")
st.pyplot(fig1)

# ✅ 평당 월세(=monthly_per_m2) 상위 Top 10
st.subheader(" 평당 월세 상위 Top 10")
top10 = df.sort_values(by="monthly_per_m2", ascending=False).head(10)
st.dataframe(top10[['houseNm', 'excluUseAr', 'monthlyRent', 'monthly_per_m2']])

# ✅ 건축년도별 평균 월세
st.subheader(" 건축년도별 평균 월세")
avg_rent_by_year = df.groupby('buildYear')['monthlyRent'].mean()
fig2, ax2 = plt.subplots(figsize=(10, 4))
avg_rent_by_year.plot(kind='line', ax=ax2, marker='o')
ax2.set_title("건축년도별 평균 월세")
ax2.set_xlabel("건축년도")
ax2.set_ylabel("평균 월세")
st.pyplot(fig2)

# ✅ 전세/월세 분포
st.subheader(" 보증금/월세 산점도")
fig3, ax3 = plt.subplots()
sns.scatterplot(data=df, x="deposit", y="monthlyRent", hue="contractType", ax=ax3)
ax3.set_title("보증금 vs. 월세")
ax3.legend(loc="upper right")
st.pyplot(fig3)

# ✅ Folium 지도 시각화
st.subheader("전월세 지도 시각화")
m = folium.Map(location=[df['lat'].mean(), df['lng'].mean()], zoom_start=14)

for idx, row in df.iterrows():
    tooltip = f"{row['houseNm']} ({row['계약구분']})\\n월세: {row['monthlyRent']}만원\\n보증금: {row['deposit']}만원"
    folium.CircleMarker(
        location=[row['lat'], row['lng']],
        radius=6,
        popup=tooltip,
        color='blue' if row['계약구분'] == '전세' else 'red',
        fill=True,
        fill_color='blue' if row['계약구분'] == '전세' else 'red',
        fill_opacity=0.6
    ).add_to(m)

folium_static(m)

# ✅ 점수 분포 히스토그램
st.subheader(" 점수 분포 히스토그램")
fig4, ax4 = plt.subplots()
ax4.hist(df['score'].dropna(), bins=10, color='orange')
ax4.set_title("종합 점수 분포")
ax4.set_xlabel("Score")
ax4.set_ylabel("Count")
st.pyplot(fig4)


# ✅ 상관관계 히트맵
st.subheader(" 주요 수치 상관관계")
numerics = ['converted_deposit', 'total_monthly_cost', 'monthly_per_m2', 'floor_score', 'building_score', 'score']
fig5, ax5 = plt.subplots(figsize=(10, 6))
sns.heatmap(df[numerics].corr(), annot=True, cmap='coolwarm', ax=ax5)
st.pyplot(fig5)
