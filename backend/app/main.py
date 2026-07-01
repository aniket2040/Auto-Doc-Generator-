from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.templates import (
    router as template_router
)

from app.routes.documents import (
    router as document_router
)

app = FastAPI(
    title="Auto DOC Completer",
    version="1.0.0"
)

# -------------------------
# CORS Configuration
# -------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# Routers
# -------------------------
app.include_router(template_router)
app.include_router(document_router)


@app.get("/")
def root():
    return {
        "status": "running",
        "service": "Auto DOC Completer"
    }