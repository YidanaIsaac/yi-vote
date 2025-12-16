from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.models import Contest, Contestant, Vote, Admin
from app.routes import contests, contestants, votes, admin

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Yi-Vote API",
    description="Professional E-Voting System with Admin Portal",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(contests.router)
app.include_router(contestants.router)
app.include_router(votes.router)
app.include_router(admin.router)

@app.get("/")
def read_root():
    return {
        "message": "Yi-Vote API is running!",
        "version": "1.0.0",
        "status": "healthy",
        "database": "connected",
        "docs": "/docs",
        "admin_portal": "/api/admin/login"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "database": "connected"}
