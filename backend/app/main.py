from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, workflows, payments  # import payment router

app = FastAPI(title="Flowtype Backend")

# CORS setup
origins = [
    "http://localhost:3000",  # Next.js frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(workflows.router, prefix="/workflows", tags=["workflows"])
app.include_router(payments.router, prefix="/payments", tags=["payments"])

# Root & health check
@app.get("/")
def read_root():
    return {"message": "Hello from backend"}

@app.get("/health")
def health_check():
    return {"status": "ok"}
