"""
====================================================================
파일명   : rank.py
작성자   : jungeun
작성일자 : 2025-04-28
설명     : 검색어 랭킹 조회 API (오늘, 이번주, 이번달)
====================================================================
"""
from flask import Blueprint, jsonify
from backend.config import get_connection

rank_bp = Blueprint('rank', __name__)

@rank_bp.route('/search-rankings', methods=['GET'])
def get_search_rankings():
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            sql = """
                (
                    SELECT
                        keyword,
                        count,
                        ROW_NUMBER() OVER (ORDER BY count DESC) AS rank,
                        snapshot_rank - ROW_NUMBER() OVER (ORDER BY count DESC) AS rankChange,
                        'daily' AS period_type
                    FROM search_ranking_daily
                    WHERE DATE(created_at) = CURDATE()
                    ORDER BY count DESC
                    LIMIT 5
                )
                
                UNION ALL
                
                (
                    SELECT
                        keyword,
                        count,
                        ROW_NUMBER() OVER (ORDER BY count DESC) AS current_rank,
                        NULL AS rank_change,
                        'weekly' AS period_type
                    FROM search_ranking_weekly
                    WHERE ranking_week = YEARWEEK(NOW())
                    ORDER BY count DESC
                    LIMIT 5
                )
                
                UNION ALL
                
                (
                    SELECT
                        keyword,
                        count,
                        ROW_NUMBER() OVER (ORDER BY count DESC) AS current_rank,
                        NULL AS rank_change,
                        'monthly' AS period_type
                    FROM search_ranking_monthly
                    WHERE DATE_FORMAT(created_at, '%Y-%m') = DATE_FORMAT(CURDATE(), '%Y-%m')
                    ORDER BY count DESC
                    LIMIT 5
                );
            """
            cursor.execute(sql)
            result = cursor.fetchall()
            return jsonify({"rankings": result})
    finally:
        connection.close()
