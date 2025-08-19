# Entry point

from fastapi import FastAPI
from app.routes import auth
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins= [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # or ["*"] to allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registered Routes
app.include_router(auth.router)

@app.get("/")
def read_root():
    return{"message":"Hello from backend"}

@app.get("/health")
def health_check():
    return {"status":"ok"}
    