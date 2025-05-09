import threading

from fastapi import FastAPI
from fastapi.requests import Request
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware

from app.ml_model.model import process_video  
from app.routes.services import get_real_time_data  

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def start_model_thread():
    thread = threading.Thread(target=process_video, daemon=True)
    thread.start()

@app.get("/")
async def read_root():
    return {"message": "Welcome to Queue Cuisine API"}

@app.get("/real-data")
async def read_real_time_data(request: Request) -> StreamingResponse:
    response = StreamingResponse(get_real_time_data(request), media_type="application/json")
    return response
