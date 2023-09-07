from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

# Initialize SQLAlchemy
db = SQLAlchemy()

# Define User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # ID field
    email = db.Column(db.String(120), unique=True, nullable=False)  # Email field
    password_hash = db.Column(db.String(128), nullable=False)  # Password hash field
    is_active = db.Column(db.Boolean(), unique=False, nullable=False, default=True)  # Active status field
    # Add any additional fields if needed, such as authentication tokens

    # Object representation of a User
    def __repr__(self):
        return f'<User {self.email}>'

    # Serialize user data into a dictionary
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # Do not serialize the password hash for security reasons
        }

    # Set hashed password
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    # Check hashed password
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
