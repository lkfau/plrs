from flask import Flask
from server.endpoints.buildings import app_buildings
from server.endpoints.recommend import app_recommend
from server.endpoints.schedules import app_schedules
from server.endpoints.settings import app_settings


# create flask app
app = Flask(__name__)

# register /recommend blueprint route
app.register_blueprint(app_buildings)
app.register_blueprint(app_recommend)
app.register_blueprint(app_schedules)
app.register_blueprint(app_settings)
