from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class ContestantBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=200)
    bio: Optional[str] = None
    photo_url: Optional[str] = None
    region: Optional[str] = None

class ContestantCreate(ContestantBase):
    contest_id: int

class ContestantResponse(ContestantBase):
    id: int
    contest_id: int
    created_at: datetime
    vote_count: Optional[int] = 0
    
    class Config:
        from_attributes = True
