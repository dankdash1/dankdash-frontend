#!/usr/bin/env python3

import os
import sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'dankdash-backend'))

from flask import Flask
from src.models.models import db
from src.seed_data import seed_database

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(os.path.dirname(__file__), 'dankdash-backend', 'src', 'database', 'app.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    # Drop all tables and recreate
    db.drop_all()
    db.create_all()
    
    # Seed the database
    seed_database()
    
    print("Database recreated successfully with new schema!")

