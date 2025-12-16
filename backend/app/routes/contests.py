from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models import Contest
from app.schemas import ContestCreate, ContestResponse, ContestUpdate

router = APIRouter(prefix="/api/contests", tags=["Contests"])

@router.get("/", response_model=List[ContestResponse])
def get_all_contests(db: Session = Depends(get_db)):
    """Get all contests"""
    contests = db.query(Contest).all()
    return contests

@router.get("/{contest_id}", response_model=ContestResponse)
def get_contest(contest_id: int, db: Session = Depends(get_db)):
    """Get a specific contest"""
    contest = db.query(Contest).filter(Contest.id == contest_id).first()
    if not contest:
        raise HTTPException(status_code=404, detail="Contest not found")
    return contest

@router.post("/", response_model=ContestResponse, status_code=201)
def create_contest(contest: ContestCreate, db: Session = Depends(get_db)):
    """Create a new contest"""
    db_contest = Contest(**contest.model_dump())
    db.add(db_contest)
    db.commit()
    db.refresh(db_contest)
    return db_contest

@router.put("/{contest_id}", response_model=ContestResponse)
def update_contest(contest_id: int, contest: ContestUpdate, db: Session = Depends(get_db)):
    """Update a contest - change status, dates, etc"""
    db_contest = db.query(Contest).filter(Contest.id == contest_id).first()
    if not db_contest:
        raise HTTPException(status_code=404, detail="Contest not found")
    
    update_data = contest.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_contest, field, value)
    
    db.commit()
    db.refresh(db_contest)
    return db_contest

@router.get("/active/list", response_model=List[ContestResponse])
def get_active_contests(db: Session = Depends(get_db)):
    """Get all active contests"""
    from datetime import datetime
    now = datetime.utcnow()
    contests = db.query(Contest).filter(
        Contest.status == "active",
        Contest.start_date <= now,
        Contest.end_date >= now
    ).all()
    return contests
