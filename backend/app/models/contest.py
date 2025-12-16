from sqlalchemy import Column, Integer, String, Text, DateTime, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum

from app.database import Base

class ContestStatus(str, enum.Enum):
    DRAFT = "draft"
    ACTIVE = "active"
    CLOSED = "closed"

class Contest(Base):
    __tablename__ = "contests"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    description = Column(Text)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    client_name = Column(String(100))
    status = Column(Enum(ContestStatus), default=ContestStatus.DRAFT)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    contestants = relationship("Contestant", back_populates="contest", cascade="all, delete-orphan")
    votes = relationship("Vote", back_populates="contest", cascade="all, delete-orphan")
