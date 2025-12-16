from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database import Base

class Vote(Base):
    __tablename__ = "votes"
    
    id = Column(Integer, primary_key=True, index=True)
    contest_id = Column(Integer, ForeignKey("contests.id"), nullable=False)
    contestant_id = Column(Integer, ForeignKey("contestants.id"), nullable=False)
    voter_identifier = Column(String(200), nullable=False)
    vote_method = Column(String(20))
    vote_hash = Column(String(64), unique=True, nullable=False)
    ip_address = Column(String(45))
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)
    
    contest = relationship("Contest", back_populates="votes")
    contestant = relationship("Contestant", back_populates="votes")
