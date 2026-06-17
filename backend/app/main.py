from fastapi import FastAPI

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

app.include_router(
    template_router
)

app.include_router(
    document_router
)


@app.get("/")
def root():

    return {
        "status": "running",
        "service": "Auto DOC Completer"
    }