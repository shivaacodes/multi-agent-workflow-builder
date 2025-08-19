# The schemas folder contains your Pydantic models. 
# These models define the data structure for API requests and responses. 
# They are used for data validation, serialization, and documentation. 

from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    email: EmailStr
    password:str
    
class UserOut(BaseModel):
    id: int
    email: EmailStr
    
    class Config:
        from_attributes = True # replaces orm_mode in Pydantic v2
    
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"