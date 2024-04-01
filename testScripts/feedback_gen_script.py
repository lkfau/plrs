import random
from datetime import datetime

# Set start and end date
start_datetime = datetime(2024, 2, 18, 11, 0, 0)
end_datetime = datetime(2024, 2, 18, 11, 45, 0)
# Starts user id at this value
USER_ID = 9999
# Set the lot id to use
LOT_IDs = [1,12,10]
# Percentage of true 
TRUE_PERCENTAGE = 0.8
# Number of "users" feedback
USERS = 10
value_sets = []
# Generate random true and false
num_true = int(USERS * TRUE_PERCENTAGE)
num_false = USERS - num_true
values = [True] * num_true + [False] * num_false
random.shuffle(values)



# Generate the value sets for SQL
for user in range(USERS):
    # Generate random date and time between start and end date
    random_time = random.uniform(0, 1)
    random_datetime = start_datetime + random_time * (end_datetime - start_datetime)
    formatted_datetime = random_datetime.strftime('%Y-%m-%d %H:%M:%S.%f')[:-3]
    lot_is_full = values.pop()
    lot_id = random.choice(LOT_IDs)
    value_sets.append(f"{lot_id}, {USER_ID}, {lot_is_full}, '{formatted_datetime}')")
values = ",\n".join(value_sets)

# SQL insert
sql = f"""
INSERT INTO "public"."user_feedback" (lot_id, user_id, lot_is_full, date_created)
VALUES
{values};
"""

print(sql)


