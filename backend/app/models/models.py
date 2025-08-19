# ORM

from sqlalchemy import Column, Integer,String, ForeignKey, Text, DateTime, func
from sqlalchemy.orm import relationship
from app.db.base import Base

# Users → Store user accounts
class User(Base):
    __tablename__= "users"
    
    id=Column(Integer, primary_key=True,index=True)
    email=Column(String(120), unique=True, nullable=False)
    hashed_password=Column(String(100),nullable=False)
    created_at=Column(DateTime(timezone=True), server_default=func.now())
    
    workflows= relationship("Workflow", back_populates="owner")

# Workflows → Each workflow belongs to one user
class Workflow(Base):
    __tablename__="workflows"
    
    id=Column(Integer,primary_key=True, index=True)
    name=Column(String(100), nullable=False)
    description=Column(Text, nullable=True)
    created_at=Column(DateTime(timezone=True),server_default=func.now())
    owner_id=Column(Integer, ForeignKey("users.id"), nullable=False)
    
    owner=relationship("User",back_populates="workflows")
    steps=relationship("WorkflowStep", back_populates="workflow")

# WorkflowSteps → Each workflow has multiple steps (e.g., LLM call, API fetch, etc.)
class WorkflowStep(Base):
    __tablename__="workflow_steps"
    
    id=Column(Integer, primary_key=True, index=True)
    workflow_id=Column(Integer,ForeignKey("workflows.id"), nullable=False)
    step_name=Column(String(200), nullable=False)
    step_type=Column(String(50), nullable=False) # eg: API, LLM
    config=Column(Text, nullable=True) # store JSON config as text
    created_at= Column(DateTime(timezone=True),server_default=func.now())
    
    workflow= relationship("Workflow", back_populates="steps")