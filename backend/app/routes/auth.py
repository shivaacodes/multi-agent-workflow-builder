from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from app.db.deps import get_db
from app.models.models import User
from app.schemas.auth import UserCreate, UserOut, Token
from app.core.security import hash_password, verify_password, decode_access_token, create_access_token

router= APIRouter(prefix="/auth", tags=["auth"])

oauth2_scheme= OAuth2PasswordBearer(tokenUrl="/auth/login")


# Signup route
@router.post("/signup", response_model=UserOut)
def signup(user_in: UserCreate, db: Session =Depends(get_db)):
    existing_user=db.query(User).filter(User.email==user_in.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user =User(
        email=user_in.email,
        hashed_password= hash_password(user_in.password)
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


# Login
@router.post("/login", response_model=Token)
def login(form_data:OAuth2PasswordRequestForm= Depends(),db: Session= Depends(get_db)):
    user= db.query(User).filter(User.email== form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token({"sub":str(user.id)})
    return {"access_token": token, "token_type": "bearer"}
    


# protected route: get current user
def get_current_user(token:str= Depends(oauth2_scheme), db:Session= Depends(get_db))->User:
    payload=decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid Token")
    user_id = payload.get("sub")
    
    user = db.query(User).get(int(user_id))
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user

