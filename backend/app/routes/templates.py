from fastapi import (
    APIRouter,
    HTTPException,
    status,
)

from app.services.template_service import (
    TemplateService,
)

router = APIRouter(
    prefix="/templates",
    tags=["Templates"],
)

template_service = TemplateService()


@router.get(
    "/",
    summary="List available templates",
)
def get_templates():
    """
    Return all available templates.
    Used by the frontend home page.
    """

    try:
        return template_service.list_templates()

    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to load templates: {exc}",
        )


@router.get(
    "/{template_id}",
    summary="Get template schema",
)
def get_template(template_id: str):
    """
    Return the complete schema for a template.
    Used by the frontend to dynamically build forms.
    """

    try:
        return template_service.get_template_metadata(
            template_id
        )

    except FileNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Template '{template_id}' not found.",
        )

    except Exception as exc:
        import traceback

        traceback.print_exc()

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to load template: {exc}",
        )