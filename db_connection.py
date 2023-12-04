from configparser import ConfigParser
import psycopg2

def config(filename='database.ini', section='postgresql'):
    parser = ConfigParser()
    parser.read(filename)

    db = {}
    if parser.has_section(section):
        params = parser.items(section)
        for param in params:
            db[param[0]] = param[1]
    else:
        raise Exception('Section ' + section + 'not found.')
    return db

def run_query(query, query_params, fetch_all):
    conn = None
    result = None
    try:
        connection_params = config()
        conn = psycopg2.connect(**connection_params) #init the database connection
        cur = conn.cursor()
        cur.execute(open(query, 'r').read(), query_params) #pass query & parameters
        if fetch_all:
            result = cur.fetchall()
        else:
            result = cur.fetchone()

    except (Exception, psycopg2.DatabaseError) as error:
        print('PostgreSQL Error:', error) 
    finally:
        if conn is not None:
            conn.close()
        return result # return query results