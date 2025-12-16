from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class VoteCreate(BaseModel):
    contest_id: int
    contestant_id: int
    voter_identifier: str = Field(..., min_length=5, max_length=200)
    vote_method: str = Field(default="web")
    ip_address: Optional[str] = None

class VoteResponse(BaseModel):
    id: int
    contest_id: int
    contestant_id: int
    vote_hash: str
    timestamp: datetime
    message: str = "Vote recorded successfully!"
    
    class Config:
        from_attributes = True

class VoteResultItem(BaseModel):
    contestant_id: int
    contestant_name: str
    vote_count: int
    percentage: float

class VoteResults(BaseModel):
    contest_id: int
    contest_name: str
    total_votes: int
    results: list[VoteResultItem]
