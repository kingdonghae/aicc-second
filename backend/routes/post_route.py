"""
====================================================================
파일명   : post_route.py
작성자   : jungeun
작성일자 : 2025-05-01
설명     : 게시글 리스트, 상세 조회, 게시글 수 관련 API
====================================================================
"""
from flask import Blueprint, request, jsonify
from services.post_service import get_post_list_service, get_post_detail_service, get_count_posts

post_bp = Blueprint('post', __name__)

@post_bp.route('/posts', methods=['GET'])
def get_post_list():
    """
    [GET] /posts
     - 게시글 리스트를 페이징 및 검색 조건에 따라 조회

    Query Parameters:
        limit (int): 페이지당 게시글 수 (기본값: 10)
        page (int): 현재 페이지 번호 (기본값: 1)
        search (str): 검색어 (기본값: '')

    Returns:
        Response: JSON
        example:
            [
                { "id": 1, "title": "...", "content": "...", ... },
                ...
            ]
    """
    limit = int(request.args.get('limit', 10))
    page = int(request.args.get('page', 1))
    search = request.args.get('search', '')

    try:
        posts = get_post_list_service(limit, page, search)
        return jsonify(posts)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@post_bp.route('/posts/<int:post_id>', methods=['GET'])
def get_post_detail(post_id):
    """
    [GET] /posts/<post_id>
     - 특정 게시글의 상세 내용을 조회

    Path Parameters:
        post_id (int): 게시글 ID

    Returns:
        Response: JSON
        example:
            {
                "id": 1,
                "title": "예시 제목",
                "content": "예시 내용",
                ...
            }
    """
    try:
        post = get_post_detail_service(post_id)
        if not post:
            return jsonify({'error': 'Post not found'}), 404
        return jsonify(post)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@post_bp.route('/posts/count', methods=['GET'])
def get_post_count():
    """
    [GET] /posts/count
     - 현재 게시글의 전체 개수(검색 포함)를 조회

    Query Parameters:
        search (str): 검색어 (기본값: '')

    Returns:
        Response: JSON
        example:
            {
                "count": 52
            }
    """
    search = request.args.get('search', '')

    try:
        return get_count_posts(search)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
