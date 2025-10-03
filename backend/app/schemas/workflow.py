from pydantic import BaseModel
from typing import Optional, List

class StepBase(BaseModel):
    name: str
    description: Optional[str]= None
    
class StepCreate(StepBase):
    pass

class Step(StepBase):
    id: int
    
    class Config:
        orm_mode= True
    
class WorkflowBase(BaseModel):
    name: str
    description: Optional[str]= None
    

class WorkflowCreate(WorkflowBase):
    steps: Optional[List[StepCreate]]=[]
    
class WorkflowUpdate(WorkflowBase):
    pass
    
class Workflow(WorkflowBase):
    id: int
    owner_id:int
    steps: List[Step]=[]
    
    class Config:
        orm_mode= True
    