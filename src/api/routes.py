from flask import Flask, request, jsonify, url_for, Blueprint, session, redirect
from api.models import db, User
from api.utils import APIException
from werkzeug.security import check_password_hash

api = Blueprint('api', __name__)

@api.route('/signup', methods=['POST'])
def handle_signup():
    # Retrieve the request data
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # Validate the data
    if email is None or password is None:
        return jsonify({"msg": "Email and password are required"}), 400

    # Create new User instance and set password
    user = User(email=email)
    user.set_password(password)

    # Add the new user to the database
    db.session.add(user)
    db.session.commit()

    # Redirect to login page
    return jsonify({"msg": "User created successfully"}), 201

@api.route('/login', methods=['POST'])
def handle_login():
    # Retrieve the request data
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # Validate the data
    if email is None or password is None:
        return jsonify({"msg": "Email and password are required"}), 400

    # Fetch the user from the database
    user = User.query.filter_by(email=email).first()

    # Check password and activate session
    if user and user.check_password(password):
        session['user_id'] = user.id
        return jsonify({"msg": "Login successful"}), 200
    else:
        return jsonify({"msg": "Invalid email or password"}), 401

@api.route('/private', methods=['GET'])
def handle_private():
    # Validate if user is logged in
    if 'user_id' not in session:
        return redirect(url_for('api.handle_login'))

    # Render private dashboard
    return jsonify({"msg": "This is a private dashboard"}), 200

@api.route('/logout', methods=['GET'])
def handle_logout():
    # Remove user from session
    session.pop('user_id', None)
    return jsonify({"msg": "Logged out"}), 200

