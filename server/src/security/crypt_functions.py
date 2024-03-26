import hashlib
import configparser
import secrets
import string
from datetime import datetime
from datetime import timedelta
from ..database.db_connection import run_query as query

class session_ids:
    def __init__(self, session_id_value=None):
        if session_id_value is None:
            self.session_id_value, self.session_id_bday = self.generate_session_id()
        else:
            self.session_id_value = session_id_value
            self.session_id_bday = self.get_session_id_bday_from_db()

    def generate_session_id(self):
        alphabet = string.ascii_letters + string.digits
        session_id = ''.join(secrets.choice(alphabet) for i in range(16))
        session_id_bday = datetime.now()
        return session_id, session_id_bday
    
    def get_session_id_bday_from_db(self):
        query_result = query('get_session_age.sql', [self.session_id_value], "one")
        if query_result:
            return query_result[0]
        else:
            return datetime(1, 1, 1)
    
    def too_old(self):
        currttime = datetime.now()
        # Calculate the difference between current time and session_id_bday
        diff = currttime - self.session_id_bday

        # Check if the difference is more than 3 days
        return abs(diff.total_seconds()) > 259200
        
    def save_session(self, pwd):
        query('save_session_id.sql', [self.session_id_value, self.session_id_bday, pwd])


def read_seed(file_path):
    config = configparser.ConfigParser()
    config.read(file_path)
    seed = config['SEED']['value']
    return seed

def custom_hash(input_data):
    SEED = read_seed("src/security/seed.ini")
    data = input_data.encode('utf-8') + SEED.encode('utf-8')
    return hashlib.sha256(data).hexdigest()





