
from flask import Blueprint, jsonify, request
from services.rank_service import (fetch_keyword_ranking,
                                   fetch_week_ranking,
                                   fetch_month_ranking,
                                   fetch_today_ranking)

rank_bp = Blueprint('rank', __name__)

@rank_bp.route('/search-ranking', methods=['POST'])
def get_search_ranking():

    data = request.get_json()
    keyword = data.get('keyword', '')
    result = fetch_keyword_ranking(keyword)
    return jsonify({"rankings": result})

@rank_bp.route('/today-ranking', methods=['GET'])
def get_today_ranking():

    result = fetch_today_ranking()
    return jsonify({"rankings": result})

@rank_bp.route('/week-ranking', methods=['GET'])
def get_week_ranking():
    year = request.args.get('year', '')
    week = request.args.get('week', '')
    result = fetch_week_ranking(year, week)
    return jsonify({"rankings": result})

@rank_bp.route('/month-ranking', methods=['GET'])
def get_month_ranking():
    year = request.args.get('year', '')
    month = request.args.get('month', '')
    result = fetch_month_ranking(year, month)
    return jsonify({"rankings": result})
