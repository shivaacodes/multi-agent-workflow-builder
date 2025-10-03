from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List

from app.schemas.workflow import WorkflowCreate,Workflow,WorkflowUpdate,StepCreate,Step
from app.models.models import Workflow as WorkflowModel, WorkflowStep
from app.routes.auth import get_current_user
from app.db.deps import get_db

router=APIRouter(
    prefix="/workflows",
    tags=["workflows"]
)

# Create workflow
@router.post("/", response_model=Workflow)
def create_workflow(workflow: WorkflowCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    db_workflow = WorkflowModel(name=workflow.name, description=workflow.description, owner_id=user.id)
    db.add(db_workflow)
    db.commit()
    db.refresh(db_workflow)
    
    # Optional: add steps
    if workflow.steps:
        for step in workflow.steps:
            db_step = WorkflowStep(name=step.name, description=step.description, workflow_id=db_workflow.id)
            db.add(db_step)
        db.commit()
    
    db.refresh(db_workflow)
    return db_workflow

# Get workflow
@router.get("/{workflow_id}", response_model=Workflow)
def get_workflow(workflow_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    workflow = db.query(WorkflowModel).filter(WorkflowModel.id == workflow_id, WorkflowModel.owner_id == user.id).first()
    if not workflow:
        raise HTTPException(status_code=404, detail="Workflow not found")
    return workflow

# Update workflow
@router.put("/{workflow_id}", response_model=Workflow)
def update_workflow(workflow_id: int, workflow_data: WorkflowUpdate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    workflow = db.query(WorkflowModel).filter(WorkflowModel.id == workflow_id, WorkflowModel.owner_id == user.id).first()
    if not workflow:
        raise HTTPException(status_code=404, detail="Workflow not found")
    
    for field, value in workflow_data.dict(exclude_unset=True).items():
        setattr(workflow, field, value)

    db.commit()
    db.refresh(workflow)
    return workflow

# Delete workflow
@router.delete("/{workflow_id}")
def delete_workflow(workflow_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    workflow = db.query(WorkflowModel).filter(WorkflowModel.id == workflow_id, WorkflowModel.owner_id == user.id).first()
    if not workflow:
        raise HTTPException(status_code=404, detail="Workflow not found")
    db.delete(workflow)
    db.commit()
    return {"detail": "Workflow deleted"}

# Add step
@router.post("/{workflow_id}/steps", response_model=Step)
def add_step(workflow_id: int, step: StepCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    workflow = db.query(WorkflowModel).filter(WorkflowModel.id == workflow_id, WorkflowModel.owner_id == user.id).first()
    if not workflow:
        raise HTTPException(status_code=404, detail="Workflow not found")
    db_step = WorkflowStep(name=step.name, description=step.description, workflow_id=workflow_id)
    db.add(db_step)
    db.commit()
    db.refresh(db_step)
    return db_step

# Update step
@router.put("/steps/{step_id}", response_model=Step)
def update_step(step_id: int, step_data: StepCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    step = db.query(WorkflowStep).join(WorkflowModel).filter(
        WorkflowStep.id == step_id,
        WorkflowModel.owner_id == user.id
    ).first()
    if not step:
        raise HTTPException(status_code=404, detail="Step not found")
    
    for field, value in step_data.dict(exclude_unset=True).items():
        setattr(step, field, value)

    db.commit()
    db.refresh(step)
    return step

# Delete step
@router.delete("/steps/{step_id}")
def delete_step(step_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    step = db.query(WorkflowStep).join(WorkflowModel).filter(
        WorkflowStep.id == step_id,
        WorkflowModel.owner_id == user.id
    ).first()
    if not step:
        raise HTTPException(status_code=404, detail="Step not found")
    db.delete(step)
    db.commit()
    return {"detail": "Step deleted"}

