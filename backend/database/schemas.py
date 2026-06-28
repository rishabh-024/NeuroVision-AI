from pydantic import BaseModel
from datetime import datetime


class PredictionResponse(BaseModel):
    id: int
    filename: str
    prediction: str
    confidence: float
    heatmap_url: str | None
    created_at: datetime

    class Config:
        from_attributes = True