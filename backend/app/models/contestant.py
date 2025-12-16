from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database import Base

class Contestant(Base):
    __tablename__ = "contestants"
    
    id = Column(Integer, primary_key=True, index=True)
    contest_id = Column(Integer, ForeignKey("contests.id"), nullable=False)
    name = Column(String(200), nullable=False)
    bio = Column(Text)
    photo_url = Column(String(500))
    region = Column(String(100))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    contest = relationship("Contest", back_populates="contestants")
    votes = relationship("Vote", back_populates="contestant", cascade="all, delete-orphan")
