from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from typing import List

from app.database import get_db
from app.models.admin import Admin
from app.schemas.admin import (
    AdminLogin, 
    AdminCreate, 
    AdminResponse, 
    Token
)
from app.utils.security import (
    verify_password,
    get_password_hash,
    create_access_token,
    get_current_active_admin,
    ACCESS_TOKEN_EXPIRE_MINUTES
)

router = APIRouter(prefix="/api/admin", tags=["Admin Authentication"])

@router.post("/login", response_model=Token)
def login(
    credentials: AdminLogin,
    db: Session = Depends(get_db)
):
    """
    Admin login endpoint
    
    - **email**: Admin email address
    - **password**: Admin password
    
    Returns JWT access token if credentials are valid
    """
    admin = db.query(Admin).filter(Admin.email == credentials.email).first()
    
    if not admin:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not verify_password(credentials.password, admin.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not admin.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin account is inactive"
        )
    
    admin.last_login = datetime.utcnow()
    db.commit()
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": admin.email},
        expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "admin": admin
    }

@router.post("/register", response_model=AdminResponse, status_code=201)
def register_admin(
    admin_data: AdminCreate,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_active_admin)
):
    """
    Register a new admin (requires authentication)
    Only existing admins can create new admin accounts
    """
    existing_admin = db.query(Admin).filter(Admin.email == admin_data.email).first()
    if existing_admin:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    existing_username = db.query(Admin).filter(Admin.username == admin_data.username).first()
    if existing_username:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already taken"
        )
    
    hashed_password = get_password_hash(admin_data.password)
    new_admin = Admin(
        email=admin_data.email,
        username=admin_data.username,
        full_name=admin_data.full_name,
        hashed_password=hashed_password,
        role=admin_data.role
    )
    
    db.add(new_admin)
    db.commit()
    db.refresh(new_admin)
    
    return new_admin

@router.get("/me", response_model=AdminResponse)
def get_current_admin_info(
    current_admin: Admin = Depends(get_current_active_admin)
):
    """
    Get current authenticated admin's information
    """
    return current_admin

@router.get("/list", response_model=List[AdminResponse])
def list_admins(
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_active_admin)
):
    """
    List all admin users (requires authentication)
    """
    admins = db.query(Admin).all()
    return admins

@router.post("/setup-first-admin", response_model=AdminResponse, status_code=201)
def setup_first_admin(
    admin_data: AdminCreate,
    db: Session = Depends(get_db)
):
    """
    Create the first admin account (only works if no admins exist)
    This is a one-time setup endpoint
    """
    admin_count = db.query(Admin).count()
    if admin_count > 0:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin accounts already exist. Use /register to create new admins."
        )
    
    hashed_password = get_password_hash(admin_data.password)
    first_admin = Admin(
        email=admin_data.email,
        username=admin_data.username,
        full_name=admin_data.full_name,
        hashed_password=hashed_password,
        role="super_admin"
    )
    
    db.add(first_admin)
    db.commit()
    db.refresh(first_admin)
    
    return first_admin
