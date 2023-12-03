import psycopg2
from configparser import ConfigParser
import math



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


def get_center(x1, y1, x2, y2):
    xf = (x1 + x2) / 2
    yf = (y1 + y2) / 2
    return xf, yf

def distance(x1, y1, x2, y2):
    distance = math.sqrt(((x2-x1)**2)+ ((y2-y1)**2))
    return distance

def sort_lots(destination_result, lots_result):
    n = len(lots_result)
    for i in range(n):  
        for j in range(0, n - i - 1):
            x1, y1 = get_center(lots_result[j][1], lots_result[j][2], lots_result[j][3], lots_result[j][4])
            x2, y2 = get_center(lots_result[j+1][1], lots_result[j+1][2], lots_result[j+1][3], lots_result[j+1][4])
            if distance(destination_result[1], destination_result[2], x1, y1) > distance(destination_result[1], destination_result[2], x2, y2):
                lots_result[j], lots_result[j + 1] = lots_result[j + 1], lots_result[j]

    x1, y1 = get_center(lots_result[0][1], lots_result[0][2], lots_result[0][3], lots_result[0][4])
    print("Distance from closest lot the destination: ", distance(destination_result[1], destination_result[2], x1, y1))
    x2, y2 = get_center(lots_result[1][1], lots_result[1][2], lots_result[1][3], lots_result[1][4])
    print("Distance from second closest lot the destination: ", distance(destination_result[1], destination_result[2], x2, y2))
    return lots_result


def connect(destination):
    conn = None
    try:
        con_params = config()
        print('Connecting to the PostgreSQL database...')
        conn = psycopg2.connect(**con_params)
        cur = conn.cursor()
        query_params = [destination]
        cur.execute(open("get_destination.sql", "r").read(), query_params)
        destination_result = cur.fetchone()

        print("Building", destination_result[0], "found at ", destination_result[1], ",", destination_result[2])


        cur.execute(open("get_parking_lots.sql", "r").read())
        lots_result = cur.fetchall()
        
        

        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
        return lots_result, destination_result



if __name__ == '__main__':
    destination = input("Input destination building ID: ")
    lots_result, destination_result = connect(destination)
    lots_result = sort_lots(destination_result, lots_result)
    print("The closest three lots to your destination are lots", lots_result[0][0], ",", lots_result[1][0], ", and ", lots_result[2][0])
