"""
====================================================================
파일명   : comment_route.py
작성자   : jungeun
작성일자 : 2025-05-16
설명     : 게시글에 대한 댓글 생성 라우팅 처리
====================================================================
"""
from flask import Blueprint, request, jsonify
from services.comments_service import save_comment, fetch_comments_by_post, delete_comment_by_id

comment_bp = Blueprint('comment', __name__)

@comment_bp.route('/save-comments', methods=['POST'])
def create_comment():
    """
    [POST] /api/comments
     - 게시글에 댓글을 저장하는 라우트
     - 요청 본문으로부터 post_id, content, writer를 받아 처리

    Request JSON:
        post_id (int): 댓글이 달릴 게시글의 ID
        content (str): 댓글 내용
        writer (str): 댓글 작성자

    Returns:
        JSON: 성공 메시지 또는 오류 응답
    """
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
    """
   [GET] /api/comments?post_id=...
    - 게시글 ID(post_id)를 기준으로 댓글 목록을 조회
    - 작성 시간(created_at) 기준 오름차순 정렬하여 반환

   Query Parameters:
       post_id (int): 댓글을 조회할 대상 게시글의 ID

   Returns:
       200 OK:
           [
               {
                   "id": 1,
                   "post_id": 5,
                   "content": "댓글 내용",
                   "writer": "사용자1",
                   "created_at": "2025-05-16T10:00:00"
               },
               ...
           ]
       400 Bad Request:
           {"error": "게시물 정보가 없습니다."}
       500 Internal Server Error:
           {"error": "서버 처리 중 오류 메시지"}
   """
    try:
        post_id = request.args.get('post_id')
        return fetch_comments_by_post(post_id)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@comment_bp.route('/delete-comments/<int:comment_id>', methods=['DELETE'])
def delete_comment(comment_id):
    """
    ====================================================================
    API 명   : 댓글 삭제
    엔드포인트 : [DELETE] /api/comments/<comment_id>
    설명     : 특정 ID의 댓글을 삭제
    요청 URL Path:
        - comment_id (int): 삭제할 댓글 ID

    응답 형식:
        200 OK:
        {
            "message": "댓글이 삭제되었습니다."
        }

        500 Internal Server Error:
        {
            "error": "에러 메시지"
        }
    ====================================================================
    """
    try:
        return delete_comment_by_id(comment_id)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
