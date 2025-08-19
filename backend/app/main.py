# Entry point

from fastapi import FastAPI
from app.routes import auth

app = FastAPI()

# Registered Routes
app.include_router(auth.router)

@app.get("/")
def read_root():
    return{"message":"Hello from backend"}

@app.get("/health")
def health_check():
    return {"status":"ok"}
    