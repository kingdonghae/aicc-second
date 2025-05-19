from flask import Blueprint, request, jsonify, send_from_directory
from services.file_service import save_uploaded_file, get_file_path, UPLOAD_FOLDER

file_bp = Blueprint("file", __name__)

@file_bp.route("/upload-file", methods=["POST"])
def upload_file():
    file = request.files.get("file")
    post_id = request.form.get("post_id")
    uploader = request.form.get("uploader", "anonymous")

    try:
        return save_uploaded_file(file, post_id, uploader)
    except ValueError as ve:
        return jsonify({"success": False, "error": str(ve)}), 400
    except Exception as e:
        return jsonify({"success": False, "error": "서버 오류"}), 500

@file_bp.route("/files/<filename>")
def serve_file(filename):
    file_info = get_file_path(filename)
    if not file_info:
        return jsonify({"error": "파일을 찾을 수 없습니다."}), 404
    return send_from_directory(UPLOAD_FOLDER, filename)
