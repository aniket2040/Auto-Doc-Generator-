from pathlib import Path

from fastapi import (
    APIRouter,
    HTTPException,
    Body,
    status
)

from fastapi.responses import FileResponse

from app.services.document_service import (
    DocumentService
)

from app.services.template_service import (
    TemplateService
)

router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)

document_service = DocumentService()
template_service = TemplateService()


@router.post(
    "/generate/{template_id}",
    summary="Generate document from template",
    response_class=FileResponse,
    responses={
        200: {
            "content": {
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {}
            },
            "description": "Generated DOCX file"
        }
    }
)
def generate_document(
    template_id: str,
    payload: dict = Body(...)
):

    try:

        template_service.load_schema(
            template_id
        )

    except FileNotFoundError:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=(
                f"Template "
                f"'{template_id}' "
                f"not found"
            )
        )

    try:

        output_path = (
            document_service
            .generate_document(
                template_id=template_id,
                payload=payload
            )
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    if not Path(
        output_path
    ).exists():

        raise HTTPException(
            status_code=500,
            detail=(
                "Document generation failed"
            )
        )
    print(f"Generated document: {output_path}")
    return FileResponse(
        path=output_path,

        filename=(
            f"{template_id}.docx"
        ),

        media_type=(
            "application/vnd.openxmlformats-"
            "officedocument.wordprocessingml.document"
        )
    )