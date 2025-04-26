import random
import asyncio  
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from app.model import process_video  # Your video processing logic
from app.services import get_real_time_data  # Your helper functions (optional)

app = FastAPI()

origins = [
    "http://127.0.0.1:3000",  # Optional: Include both
]

real_time_data = {
    "people_entering": 0,
    "people_exiting": 0
}

# Counters
enter_counter = 0
exit_counter = 0

@app.get("/real-time-data")
async def get_real_time_data():
    global people_entering, people_exiting

    # Simulate real-time updates
    people_entering = random.randint(0, 14)
    await asyncio.sleep(0.5)  # simulate slight delay
    people_exiting = random.randint(0, 3)

    return {
        "people_entering": people_entering,
        "people_exiting": people_exiting
    }
