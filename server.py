from flask import Flask
from recommend import app_recommend

# create flask app
app = Flask(__name__)

# register /recommend blueprint route
app.register_blueprint(app_recommend)