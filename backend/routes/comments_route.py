from flask import Blueprint, request, jsonify
from services.comments_service import save_comment, fetch_comments_by_post, delete_comment_by_id

comment_bp = Blueprint('comment', __name__)

@comment_bp.route('/save-comments', methods=['POST'])
def create_comment():
    try:
        data = request.json
        post_id = data.get('post_id')
        content = data.get('content')
        writer = data.get('writer')

        return save_comment(post_id, content, writer)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@comment_bp.route('/comments', methods=['GET'])
def get_comments_by_post():
    try:
        post_id = request.args.get('post_id')
        return fetch_comments_by_post(post_id)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@comment_bp.route('/delete-comments/<int:comment_id>', methods=['DELETE'])
def delete_comment(comment_id):
    try:
        return delete_comment_by_id(comment_id)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
