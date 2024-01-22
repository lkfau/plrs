from flask import Flask
from server.endpoints.recommend import app_recommend
from server.endpoints.settings import app_settings
from server.endpoints.schedules import app_schedules

# create flask app
app = Flask(__name__)

# register /recommend blueprint route
app.register_blueprint(app_recommend)
app.register_blueprint(app_settings)
app.register_blueprint(app_schedules)