from typing import List, Optional, Literal

from pydantic import BaseModel


class TableColumnSchema(BaseModel):
    name: str
    label: str
    type: str


class FieldSchema(BaseModel):
    name: str
    label: str

    # Form Section
    section: str = "General"

    # Field Type
    type: Optional[
        Literal[
            "text",
            "textarea",
            "date",
            "number",
            "currency",
            "dynamic_list",
            "nested_service_list",
            "table",
        ]
    ] = None

    # Validation
    required: bool = False

    # Dynamic List
    item_type: Optional[str] = None

    # Nested Service List
    parent_label: Optional[str] = None
    child_label: Optional[str] = None

    # Dynamic Table
    columns: Optional[List[TableColumnSchema]] = None
    min_rows: Optional[int] = None

    # Read-only / Computed Fields
    readonly: bool = False
    auto_calculated: bool = False


class TemplateSchema(BaseModel):
    template_id: str
    template_name: str
    fields: List[FieldSchema]