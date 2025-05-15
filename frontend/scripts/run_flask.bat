@echo off
set PYTHONIOENCODING=utf-8

REM 현재 위치: frontend/scripts/run_backend.bat → backend 디렉토리로 이동
cd /d %~dp0
cd ../../backend

REM 가상환경 체크 및 생성
if not exist venv\Scripts\activate (
    echo [INFO] 가상환경이 없습니다. 새로 생성합니다...
    python -m venv venv
)

REM 가상환경 활성화
call venv\Scripts\activate.bat

REM 의존성 설치
if exist requirements.txt (
    echo [INFO] requirements.txt 설치 중...
    pip install -r requirements.txt
) else (
    echo [WARN] requirements.txt 파일이 없습니다. 스킵합니다.
)

REM Flask 앱 실행
echo [INFO] Flask 서버를 실행합니다...
python app.py
