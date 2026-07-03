from pathlib import Path
import json

from app.schemas.template import TemplateSchema


class TemplateService:

    def __init__(self):

        self.templates_dir = (
            Path(__file__).resolve().parents[2]
            / "templates"
        )

    def get_template_path(
        self,
        template_id: str,
    ) -> Path:

        path = (
            self.templates_dir
            / f"{template_id}.docx"
        )

        if not path.exists():
            raise FileNotFoundError(
                f"Template DOCX not found: '{template_id}'"
            )

        return path

    def get_schema_path(
        self,
        template_id: str,
    ) -> Path:

        path = (
            self.templates_dir
            / f"{template_id}.schema.json"
        )

        if not path.exists():
            raise FileNotFoundError(
                f"Template schema not found: '{template_id}'"
            )

        return path

    def load_schema(
        self,
        template_id: str,
    ) -> TemplateSchema:

        schema_path = self.get_schema_path(
            template_id
        )

        with open(
            schema_path,
            "r",
            encoding="utf-8",
        ) as file:

            data = json.load(file)

        return TemplateSchema.model_validate(
            data
        )

    def list_templates(
        self,
    ) -> list[dict]:

        templates = []

        for schema_file in self.templates_dir.glob(
            "*.schema.json"
        ):

            template_id = (
                schema_file.stem
                .replace(".schema", "")
            )

            try:

                schema = self.load_schema(
                    template_id
                )

                templates.append(
                    {
                        "template_id": schema.template_id,
                        "template_name": schema.template_name,
                        "field_count": len(
                            schema.fields
                        ),
                        "docx_exists": self.get_template_path(
                            template_id
                        ).exists(),
                    }
                )

            except Exception as exc:

                templates.append(
                    {
                        "template_id": template_id,
                        "error": str(exc),
                    }
                )

        return templates

    def get_template_metadata(
        self,
        template_id: str,
    ) -> dict:

        schema = self.load_schema(
            template_id
        )

        return schema.model_dump()