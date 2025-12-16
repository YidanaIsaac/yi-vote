from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class AdminLogin(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)

class AdminCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)
    full_name: str = Field(..., min_length=2, max_length=200)
    username: str = Field(..., min_length=3, max_length=100)
    role: Optional[str] = "admin"

class AdminResponse(BaseModel):
    id: int
    email: str
    username: str
    full_name: Optional[str]
    role: str
    is_active: bool
    created_at: datetime
    last_login: Optional[datetime]
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    admin: AdminResponse

class TokenData(BaseModel):
    email: Optional[str] = None
