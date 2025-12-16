from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime
import hashlib

from app.database import get_db
from app.models import Vote, Contest, Contestant
from app.schemas import VoteCreate, VoteResponse, VoteResults, VoteResultItem

router = APIRouter(prefix="/api/votes", tags=["Votes"])

@router.post("/", response_model=VoteResponse, status_code=201)
def cast_vote(vote: VoteCreate, db: Session = Depends(get_db)):
    """Cast a vote for a contestant"""
    
    contest = db.query(Contest).filter(Contest.id == vote.contest_id).first()
    if not contest:
        raise HTTPException(status_code=404, detail="Contest not found")
    
    now = datetime.utcnow()
    if now < contest.start_date:
        raise HTTPException(status_code=400, detail="Contest has not started yet")
    if now > contest.end_date:
        raise HTTPException(status_code=400, detail="Contest has ended")
    if contest.status != "active":
        raise HTTPException(status_code=400, detail="Contest is not active")
    
    contestant = db.query(Contestant).filter(
        Contestant.id == vote.contestant_id,
        Contestant.contest_id == vote.contest_id
    ).first()
    if not contestant:
        raise HTTPException(status_code=404, detail="Contestant not found")
    
    existing_vote = db.query(Vote).filter(
        Vote.contest_id == vote.contest_id,
        Vote.voter_identifier == vote.voter_identifier
    ).first()
    if existing_vote:
        raise HTTPException(status_code=400, detail="You have already voted in this contest")
    
    hash_string = f"{vote.contest_id}{vote.contestant_id}{vote.voter_identifier}{datetime.utcnow()}"
    vote_hash = hashlib.sha256(hash_string.encode()).hexdigest()
    
    db_vote = Vote(
        contest_id=vote.contest_id,
        contestant_id=vote.contestant_id,
        voter_identifier=vote.voter_identifier,
        vote_method=vote.vote_method,
        vote_hash=vote_hash,
        ip_address=vote.ip_address
    )
    
    db.add(db_vote)
    db.commit()
    db.refresh(db_vote)
    
    return {
        "id": db_vote.id,
        "contest_id": db_vote.contest_id,
        "contestant_id": db_vote.contestant_id,
        "vote_hash": db_vote.vote_hash,
        "timestamp": db_vote.timestamp,
        "message": "Vote recorded successfully!"
    }

@router.get("/results/{contest_id}", response_model=VoteResults)
def get_vote_results(contest_id: int, db: Session = Depends(get_db)):
    """Get voting results for a contest"""
    
    contest = db.query(Contest).filter(Contest.id == contest_id).first()
    if not contest:
        raise HTTPException(status_code=404, detail="Contest not found")
    
    results = db.query(
        Contestant.id,
        Contestant.name,
        func.count(Vote.id).label("vote_count")
    ).outerjoin(
        Vote, Vote.contestant_id == Contestant.id
    ).filter(
        Contestant.contest_id == contest_id
    ).group_by(Contestant.id, Contestant.name).all()
    
    total_votes = sum(result.vote_count for result in results)
    
    result_items = []
    for result in results:
        percentage = (result.vote_count / total_votes * 100) if total_votes > 0 else 0
        result_items.append({
            "contestant_id": result.id,
            "contestant_name": result.name,
            "vote_count": result.vote_count,
            "percentage": round(percentage, 2)
        })
    
    result_items.sort(key=lambda x: x["vote_count"], reverse=True)
    
    return {
        "contest_id": contest_id,
        "contest_name": contest.name,
        "total_votes": total_votes,
        "results": result_items
    }
