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

def get_best_distance(dest_x, dest_y, lot):
    distances = [] #
    #find distance from destination to all four corners of the parking lot and return the closest distance found to give each lot the best chance
    distances.append(distance(lot[1], lot[2],dest_x, dest_y))
    distances.append(distance(lot[3], lot[4],dest_x, dest_y))
    distances.append(distance(lot[1], lot[4],dest_x, dest_y))
    distances.append(distance(lot[3], lot[2],dest_x, dest_y))
    return min(distances)

def sort_lots(destination_result, lots_result):
    n = len(lots_result) 
    #standard bubble sort but using the best distance function for the comparisons
    for i in range(n):  
        for j in range(0, n - i - 1):
            if get_best_distance(destination_result[1], destination_result[2], lots_result[j]) > get_best_distance(destination_result[1], destination_result[2], lots_result[j+1]):
                lots_result[j], lots_result[j + 1] = lots_result[j + 1], lots_result[j]
    #sorts all the lots from closest to furthest            
    return lots_result


def connect(destination):
    conn = None
    try:
        con_params = config() #
        print('Connecting to the PostgreSQL database...')
        conn = psycopg2.connect(**con_params) #init the database connection
        cur = conn.cursor()
        query_params = [destination] #set the destination into an array for use as query parameters
        cur.execute(open("get_destination.sql", "r").read(), query_params) #pass destination query
        destination_result = cur.fetchone() #grab the row for that destination id with the info from the query

        cur.execute(open("get_parking_lots.sql", "r").read()) #pass parking lot query
        lots_result = cur.fetchall() #grab a 2d array of all the lots
        
        

        cur.close() #close the cursor session
    except (Exception, psycopg2.DatabaseError) as error:
        print(error) 
    finally:
        if conn is not None:
            conn.close()
        return lots_result, destination_result #return query results



if __name__ == '__main__':
    destination = input("Input destination building ID: ") 
    lots_result, destination_result = connect(destination) #get data from DB
    lots_result = sort_lots(destination_result, lots_result) # sort data
    print("The closest three lots to your destination are lots", lots_result[0][0], ",", lots_result[1][0], ", and ", lots_result[2][0]) #display the closest three lots to the user
