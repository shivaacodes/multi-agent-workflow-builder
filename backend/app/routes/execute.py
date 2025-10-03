from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.models import Workflow as WorkflowModel, WorkflowStep
from app.routes.auth import get_current_user
from app.db.deps import get_db

router = APIRouter(
    prefix="/execute",
    tags=["execution"]
)

@router.post("/workflow/{workflow_id}")
def execute_workflow(workflow_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    workflow = db.query(WorkflowModel).filter(
        WorkflowModel.id == workflow_id,
        WorkflowModel.owner_id == user.id
    ).first()
    if not workflow:
        raise HTTPException(status_code=404, detail="Workflow not found")

    steps = db.query(WorkflowStep).filter(WorkflowStep.workflow_id == workflow_id).all()
    if not steps:
        return {"workflow_id": workflow_id, "status": "no steps to execute"}

    results = []
    for step in steps:
        # 🔹 Dummy execution (later: plug in real AI/vector logic)
        result = {
            "step_id": step.id,
            "step_name": step.name,
            "output": f"Executed step '{step.name}'"
        }
        results.append(result)

    return {
        "workflow_id": workflow.id,
        "workflow_name": workflow.name,
        "results": results
    }
