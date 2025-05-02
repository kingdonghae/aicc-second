"""
====================================================================
파일명   : rank_route.py
작성자   : jungeun
작성일자 : 2025-04-30
설명     : 주소 검색 순위 조회 API (오늘, 이번주, 이번달)
====================================================================
"""
from flask import Blueprint, jsonify, request
from services.rank_service import fetch_all_rankings, fetch_keyword_ranking

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
