from pathlib import Path
import json

from app.schemas.template import TemplateSchema

BASE_DIR = Path(__file__).resolve().parents[2]

schema_path = (
    BASE_DIR
    / "templates"
    / "toyota_sow.schema.json"
)


with open(schema_path, "r", encoding="utf-8") as f:
    schema = TemplateSchema.model_validate(
        json.load(f)
    )

print(schema.template_name)
print(schema)
print(type(schema))
print(schema.model_dump())
print(schema.fields[0])
print(schema.fields[10])
print(schema.fields[14])

# with open(schema_path, "r", encoding="utf-8") as f:
#     text = f.read()
#
# print(text)