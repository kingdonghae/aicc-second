from flask import jsonify
from app import app, db

@app.route("/", methods=["GET"])
def get_friends():
    friends = db.query.get(1)
    result = [friend.to_json() for friend in friends]  # friend 하나씩 순회해야 해
    return jsonify(result)
