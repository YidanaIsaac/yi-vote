from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class ContestBase(BaseModel):
    name: str = Field(..., min_length=3, max_length=200)
    description: Optional[str] = None
    start_date: datetime
    end_date: datetime
    client_name: Optional[str] = None

class ContestCreate(ContestBase):
    pass

class ContestUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    status: Optional[str] = None

class ContestResponse(ContestBase):
    id: int
    status: str
    created_at: datetime
    
    class Config:
        from_attributes = True
