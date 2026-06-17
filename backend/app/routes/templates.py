from fastapi import (
    APIRouter,
    HTTPException,
    status
)

from app.services.template_service import (
    TemplateService
)

router = APIRouter(
    prefix="/templates",
    tags=["Templates"]
)

template_service = TemplateService()


@router.get(
    "/",
    summary="List available templates"
)
def get_templates():
    """
    Returns all available templates.
    Used by frontend template selection page.
    """

    try:
        return template_service.list_templates()

    except Exception as e:

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@router.get(
    "/{template_id}",
    summary="Get template schema"
)
def get_template(
    template_id: str
):
    """
    Returns complete template schema.
    Used by frontend to dynamically build forms.
    """

    try:

        return (
            template_service
            .get_template_metadata(
                template_id
            )
        )

    except FileNotFoundError:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=(
                f"Template '{template_id}' not found"
            )
        )

    except Exception as e:

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )