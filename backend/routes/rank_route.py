"""
====================================================================
파일명   : rank_route.py
작성자   : jungeun
작성일자 : 2025-04-30
설명     : 주소 검색 순위 조회 API (오늘, 이번주, 이번달)
====================================================================
"""
from flask import Blueprint, jsonify, request
from services.rank_service import (fetch_all_rankings,
                                   fetch_keyword_ranking,
                                   fetch_week_ranking, fetch_month_ranking, fetch_today_ranking)

rank_bp = Blueprint('rank', __name__)

# 일자 별 랭킹 테이블 데이터 조회
@rank_bp.route('/search-rankings', methods=['GET'])
def get_search_rankings():
    """
    [GET] /rank/search-rankings
    일간/주간/월간 별 주소 검색 순위 테이블 데이터 조회

    Returns:
        Response: JSON
        example:
        {
            "rankings": [
                {
                    "keyword": "서울특별시 송파구 잠실동",
                    "count": 20,
                    "rank": 1,
                    "diffRank": 2,
                    "period_type": "daily"      //daily or weekly or monthly
                },
                ...
            ]
        }
    """
    result = fetch_all_rankings()
    return jsonify({"rankings": result})

# 검색 키워드 입력 시 해당 랭킹 조회
@rank_bp.route('/search-ranking', methods=['POST'])
def get_search_ranking():
    """
    [POST] /search-ranking
    특정 주소 키워드의 일간 랭킹 데이터 조회

    Query Parameters:
        keyword (str): 검색 주소 키워드

    Returns:
        Response: JSON
        예시:
        {
            "rankings": [
                {
                    "keyword": "서울특별시 송파구 잠실동",
                    "count": 30,
                    "rank": 3
                }
            ]
        }
    """
    data = request.get_json()
    keyword = data.get('keyword', '')
    result = fetch_keyword_ranking(keyword)
    return jsonify({"rankings": result})

# 오늘자 검색 데이터 순위 조회
@rank_bp.route('/today-ranking', methods=['GET'])
def get_today_ranking():
    """
    [GET] /week-ranking
    오늘자 검색 데이터 순위 조회

   Returns:
        Response: JSON
        example:
        {
            "rankings": [
                {
                    "keyword": "서울특별시 송파구 잠실동",
                    "count": 20,
                    "rank": 1,
                    "diffRank": 2,
                },
                ...
            ]
        }
    """
    result = fetch_today_ranking()
    return jsonify({"rankings": result})

# 주별 기간 검색 옵션에 따른 데이터 조회
@rank_bp.route('/week-ranking', methods=['GET'])
def get_week_ranking():
    """
    [GET] /week-ranking
    주별 기간 검색 옵션에 따른 데이터 조회

    Query Parameters:
        year (str): 선택된 연도 (예: "2025")
        week (str): 선택된 주차 (예: "18")

    Returns:
        Response: JSON
        example:
        {
            "rankings": [
                {
                    "keyword": "서울특별시 송파구 잠실동",
                    "count": 20,
                    "rank": 1,
                    "diffRank": 2,
                },
                ...
            ]
        }
    """
    year = request.args.get('year', '')
    week = request.args.get('week', '')
    result = fetch_week_ranking(year, week)
    return jsonify({"rankings": result})


# 월별 기간 검색 옵션에 따른 데이터 조회
@rank_bp.route('/month-ranking', methods=['GET'])
def get_month_ranking():
    """
    [GET] /month-ranking
    월별 기간 검색 옵션에 따른 데이터 조회

    Query Parameters:
        year (str): 선택된 연도 (예: "2025")
        month (str): 선택된 월 (예: "05")

    Returns:
        Response: JSON
        example:
        {
            "rankings": [
                {
                    "keyword": "서울특별시 송파구 잠실동",
                    "count": 20,
                    "rank": 1,
                    "diffRank": 2,
                },
                ...
            ]
        }
    """
    year = request.args.get('year', '')
    month = request.args.get('month', '')
    result = fetch_month_ranking(year, month)
    return jsonify({"rankings": result})
