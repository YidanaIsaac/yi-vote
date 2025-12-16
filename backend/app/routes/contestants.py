from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List

from app.database import get_db
from app.models import Contestant, Contest, Vote
from app.schemas import ContestantCreate, ContestantResponse

router = APIRouter(prefix="/api/contestants", tags=["Contestants"])

@router.get("/contest/{contest_id}", response_model=List[ContestantResponse])
def get_contestants_by_contest(contest_id: int, db: Session = Depends(get_db)):
    """Get all contestants for a specific contest with vote counts"""
    
    contest = db.query(Contest).filter(Contest.id == contest_id).first()
    if not contest:
        raise HTTPException(status_code=404, detail="Contest not found")
    
    contestants = db.query(
        Contestant,
        func.count(Vote.id).label("vote_count")
    ).outerjoin(
        Vote, Vote.contestant_id == Contestant.id
    ).filter(
        Contestant.contest_id == contest_id
    ).group_by(Contestant.id).all()
    
    result = []
    for contestant, vote_count in contestants:
        contestant_dict = {
            "id": contestant.id,
            "name": contestant.name,
            "bio": contestant.bio,
            "photo_url": contestant.photo_url,
            "region": contestant.region,
            "contest_id": contestant.contest_id,
            "created_at": contestant.created_at,
            "vote_count": vote_count
        }
        result.append(contestant_dict)
    
    return result

@router.post("/", response_model=ContestantResponse, status_code=201)
def create_contestant(contestant: ContestantCreate, db: Session = Depends(get_db)):
    """Add a new contestant to a contest"""
    
    contest = db.query(Contest).filter(Contest.id == contestant.contest_id).first()
    if not contest:
        raise HTTPException(status_code=404, detail="Contest not found")
    
    db_contestant = Contestant(**contestant.model_dump())
    db.add(db_contestant)
    db.commit()
    db.refresh(db_contestant)
    
    return {**db_contestant.__dict__, "vote_count": 0}
