"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException, es_correo_valido
from flask_cors import CORS
import os
from base64 import b64encode
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route("/health-check", methods=["GET"])
def health_check():
    return jsonify({"status": "OK"}), 200

 

@api.route("/register", methods=["POST"])
def register_user():
    data = request.get_json()
    data = {
        "email": data.get("email"),
        "password": data.get("password"),
        "username": data.get("username"),
        "name": data.get("name"),
        "is_active": True,
        "salt": 1
    }

    if not data["email"] or not data["name"] or not data["password"] or not data["username"]:
        return jsonify({"message": "Email, name, username and password are required"}), 400
    if not es_correo_valido(data["email"]):
        return jsonify({"message": "Emails is invalid, example@email.com"}), 400
    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"message": "User already exists"}), 409
    if User.query.filter_by(username=data["username"]).first():
        return jsonify({"message": "User already exists"}), 409

    salt = b64encode(os.urandom(32)).decode("utf-8")
    password = generate_password_hash(f"{data['password']}{salt}")
    avatar_value = data.get("avatar") 
    new_user = User(
        email=data["email"],
        password=password,
        name=data["name"],
        username=data["username"],
        is_active=data["is_active"],
        salt=salt,
        avatar= avatar_value
    )

    db.session.add(new_user)

    try:
        db.session.commit()
        return jsonify({"message": "user created succesfuly"}), 201
    except Exception as error:
        db.session.rollback()
        return jsonify({"message": "Error creating user", "Error": f"{error.args}"}), 500

 

@api.route("/login", methods=["POST"])
def login_user():
    data = request.get_json()
    username = data.get("username").strip()
    password = data.get("password").strip()

    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400
    user = User.query.filter_by(username=username).one_or_none()
    if user is None:
        return jsonify({"message": "Ivalid username"}), 400
    if not check_password_hash(user.password, f"{password}{user.salt}"):
        return jsonify({"message": "Ivalid credentials"}), 400
    else:
        return jsonify({"token": create_access_token(identity=str(user.id), expires_delta=timedelta(days=(1)))}), 200


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    id = get_jwt_identity()
    return jsonify({"message": f"This is a protected route. Currente user ID : {id}"})



@api.route("/me", methods=["GET"])
@jwt_required()
def me():
    id = get_jwt_identity()
    user = User.query.get(id)

    return jsonify({"user": user.serialize()}), 200
