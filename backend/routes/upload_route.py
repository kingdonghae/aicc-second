from flask import Blueprint, request, jsonify
from services.upload_service import save_uploaded_file, save_post_service, update_post_service

upload_bp = Blueprint('upload', __name__)

@upload_bp.route('/upload-image', methods=['POST'])
def upload_image():
    file = request.files.get('image')
    if not file:
        return jsonify({'error': 'No file uploaded'}), 400

    try:
        file_url = save_uploaded_file(file)
        return jsonify({'url': file_url})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@upload_bp.route('/save-post', methods=['POST'])
def save_post():
    data = request.get_json()
    title = data.get('title')
    content = data.get('content')
    writer = data.get('writer')
    attachments = data.get('attachments', [])

    try:
        return save_post_service(title, content, writer, attachments)
    except Exception as e:
        return jsonify({ 'error': str(e) }), 500

@upload_bp.route('/update-post/<int:post_id>', methods=['PUT'])
def update_post(post_id):
    data = request.get_json()
    title = data.get('title')
    content = data.get('content')
    new_attachments = data.get('attachments', [])

    try:
        return update_post_service(title, content, post_id, new_attachments)
    except Exception as e:
        return jsonify({ 'error': str(e) }), 500

