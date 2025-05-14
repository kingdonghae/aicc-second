@echo off
set PYTHONIOENCODING=utf-8
REM 스크립트 위치: frontend/scripts/run_backend.bat 기준
cd ../../backend

REM 가상환경 체크
if not exist venv\Scripts\activate (
    call venv\Scripts\activate
)


REM 의존성 설치 (선택: 최초 실행 시만 해도 충분, 필요 시 주석 풀기)
@REM if exist ../backend/requirements.txt (
@REM     echo Installing dependencies...
@REM     pip install -r ../backend/requirements.txt
@REM ) else (
@REM     echo [WARN] requirements.txt 파일이 없습니다. 스킵합니다.
@REM )

REM Flask 실행
python ../backend/app.py
