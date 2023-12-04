from configparser import ConfigParser
import psycopg2

# config(): grab database connection configuration
#           looks for params in filename at .ini section
def config(filename='database.ini', section='postgresql'):
    parser = ConfigParser()
    parser.read(filename)

    db = {}
    if parser.has_section(section):
        params = parser.items(section)
        # grab each parameter and store in db object
        for param in params:
            db[param[0]] = param[1]
    else:
        raise Exception('Section ' + section + 'not found.')
    return db

# run_query(): runs locally stored SQL query on database, 
#              replaces query parameters with query_params, 
#              returns output
def run_query(query_name, query_params, fetch_all):
    conn = None
    result = None
    try:
        #pull connection parameters from config
        connection_params = config()

        # initialize database connection
        conn = psycopg2.connect(**connection_params) 
        cur = conn.cursor()

        # execute query, pass in parameters
        cur.execute(open(query_name, 'r').read(), query_params)

        # return one or all rows based on fetch_all
        if fetch_all:
            result = cur.fetchall()
        else:
            result = cur.fetchone()

    except (Exception, psycopg2.DatabaseError) as error:
        # log error to console
        print('PostgreSQL Error:', error) 
    finally:
        # close connection if it was created
        if conn is not None:
            conn.close()

        # return query results
        return result 