from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
import secrets

app = Flask(__name__)
CORS(app)

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///groups.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Group(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    size = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    code = db.Column(db.String(8), unique=True, nullable=False)
    members = db.Column(db.Integer, default=0)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if not self.code:
            self.code = secrets.token_hex(4)

@app.route('/api/groups', methods=['POST'])
def create_group():
    try:
        data = request.json
        new_group = Group(
            name=data['name'],
            size=int(data['size']),
            email=data['email'],
            description=data['description']
        )
        db.session.add(new_group)
        db.session.commit()
        return jsonify({"message": "Group created successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/api/groups', methods=['GET'])
def get_groups():
    try:
        groups = Group.query.all()
        result = []
        for group in groups:
            result.append({
                'id': group.id,
                'name': group.name,
                'size': group.size,
                'email': group.email,
                'description': group.description,
                'created_at': group.created_at.isoformat() if group.created_at else None
            })
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/groups/search', methods=['GET'])
def search_groups():
    try:
        query = request.args.get('q', '')
        groups = Group.query.filter(Group.name.ilike(f'%{query}%')).all()
        result = []
        for group in groups:
            result.append({
                'id': group.id,
                'name': group.name,
                'size': group.size,
                'members': group.members,
                'description': group.description,
                'created_at': group.created_at.isoformat() if group.created_at else None
            })
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/groups/join', methods=['POST'])
def join_group():
    try:
        data = request.json
        code = data.get('code')
        group = Group.query.filter_by(code=code).first()
        
        if not group:
            return jsonify({"error": "Group not found"}), 404
            
        if group.members >= group.size:
            return jsonify({"error": "Group is full"}), 400
            
        group.members += 1
        db.session.commit()
        
        return jsonify({
            "message": "Successfully joined the group",
            "group": {
                "name": group.name,
                "description": group.description
            }
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=9180)
