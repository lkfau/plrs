from flask import Blueprint, jsonify
from flask_cors import cross_origin


app_test = Blueprint('app_test', __name__)
@app_test.route('/test', methods=['POST'])
@cross_origin()




def test():
    try:


        return jsonify('Test connection working'), 200
    
    except Exception as error:
        print('ERROR', error)
        return 'Server error', 500