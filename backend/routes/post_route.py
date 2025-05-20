
from flask import Blueprint, request, jsonify
from services.post_service import get_post_list_service, get_post_detail_service, get_count_posts

post_bp = Blueprint('post', __name__)

@post_bp.route('/posts', methods=['GET'])
def get_post_list():
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
    try:
        post = get_post_detail_service(post_id)
        if not post:
            return jsonify({'error': 'Post not found'}), 404
        return jsonify(post)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@post_bp.route('/posts/count', methods=['GET'])
def get_post_count():
    search = request.args.get('search', '')

    try:
        return get_count_posts(search)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
