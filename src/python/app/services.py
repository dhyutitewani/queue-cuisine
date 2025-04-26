# Placeholder in-memory data
real_time_data = {
    "people_entering": 0,
    "people_exiting": 0
}

# Function to simulate people entering
def update_entering(person_id: int):
    real_time_data["people_entering"] += 1  # Increment people entering count

# Function to simulate people exiting
def update_exiting(person_id: int):
    real_time_data["people_exiting"] += 1  # Increment people exiting count

# Function to get real-time data
def get_real_time_data():
    return real_time_data  # Return current entering and exiting data
