from flask import Flask
from flask_cors import CORS
from src.endpoints.buildings import app_buildings
from src.endpoints.feedback import app_feedback
from src.endpoints.recommend import app_recommend
from src.endpoints.schedules import app_schedules
from src.endpoints.settings import app_settings
from src.endpoints.test import app_test


# create flask app
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# register /recommend blueprint route
app.register_blueprint(app_buildings)
app.register_blueprint(app_feedback)
app.register_blueprint(app_recommend)
app.register_blueprint(app_schedules)
app.register_blueprint(app_settings)
app.register_blueprint(app_test)

if __name__ == "__main__":
    app.run()