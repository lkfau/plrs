from flask import Flask
from recommend import app_recommend



app = Flask(__name__)

app.register_blueprint(app_recommend) # /recommend route