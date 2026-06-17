from pathlib import Path
from uuid import uuid4

from docxtpl import DocxTemplate

from app.services.template_service import (
    TemplateService
)


class DocumentService:

    def __init__(self):

        self.template_service = (
            TemplateService()
        )

        self.generated_dir = (
            Path(__file__).resolve().parents[2]
            / "generated"
        )

        self.generated_dir.mkdir(
            exist_ok=True
        )

    # --------------------------------------------------
    # Scope Of Services
    # --------------------------------------------------

    def build_scope_of_services(self, items: list[str]) -> str:

        lines = []

        for idx, item in enumerate(items, start=1):

            lines.append(f"4.1.{idx} {item}")

        return "\n".join(lines)

    # --------------------------------------------------
    # Services To Be Performed
    # --------------------------------------------------

    def build_services_to_be_performed(self, services: list[dict]) -> str:

        lines = []

        for parent_idx, service in enumerate(services, start=1):

            parent_number = (
                f"5.1.{parent_idx}"
            )

            lines.append(
                f"{parent_number} "
                f"{service['description']}"
            )

            for child_idx, child in enumerate(service.get("subservices",[]), start=1):

                child_number = (
                    f"{parent_number}"
                    f".{child_idx}"
                )

                lines.append(
                    f"{child_number} "
                    f"{child}"
                )

            lines.append("")

        return "\n".join(lines)

    # --------------------------------------------------
    # Calculated Fields
    # --------------------------------------------------

    def calculate_total_fee(self, consultants: list[dict]) -> float:

        return sum(
            consultant.get(
                "fee",
                0
            )
            for consultant in consultants
        )

    # --------------------------------------------------
    # Context Builder
    # --------------------------------------------------

    def build_context(self, payload: dict) -> dict:

        context = payload.copy()

        if (
            "SCOPE_OF_SERVICES"
            in payload
        ):

            context[
                "SCOPE_OF_SERVICES"
            ] = (
                self.build_scope_of_services(
                    payload[
                        "SCOPE_OF_SERVICES"
                    ]
                )
            )

        if (
            "SERVICES_TO_BE_PERFORMED"
            in payload
        ):

            context[
                "SERVICES_TO_BE_PERFORMED"
            ] = (
                self.build_services_to_be_performed(
                    payload[
                        "SERVICES_TO_BE_PERFORMED"
                    ]
                )
            )

        context["total_fee"] = (
            self.calculate_total_fee(
                payload.get(
                    "consultants",
                    []
                )
            )
        )

        return context

    # --------------------------------------------------
    # Document Generator
    # --------------------------------------------------

    def generate_document(self, template_id: str, payload: dict) -> Path:

        template_path = (
            self.template_service
            .get_template_path(
                template_id
            )
        )

        context = (
            self.build_context(payload)
        )

        doc = DocxTemplate(template_path)

        doc.render(context)

        output_path = (
            self.generated_dir
            / f"{uuid4()}.docx"
        )

        doc.save(output_path)

        return output_path