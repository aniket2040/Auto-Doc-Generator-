from app.services.template_service import (
    TemplateService
)

service = TemplateService()

print(
    service.list_templates()
)

print()

metadata = (
    service.get_template_metadata(
        "toyota_sow"
    )
)

print(
    metadata["template_name"]
)

print()

for field in metadata["fields"]:

    print(
        field.name,
        "->",
        field.type
    )