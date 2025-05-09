import json
import asyncio
import logging
from typing import AsyncGenerator

from fastapi.requests import Request

from app.ml_model.model import pentering, pexiting

async def get_real_time_data(request: Request) -> AsyncGenerator[str, None]:
    while True:
        print(pentering)
        print(pexiting)

        # Dynamically fetch the current counts and send them
        json_data = json.dumps({
            "people_entering": pentering,
            "people_exiting": pexiting
        })

        yield json_data    
        await asyncio.sleep(2)