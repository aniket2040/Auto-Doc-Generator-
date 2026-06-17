from typing import List, Optional, Literal

from pydantic import BaseModel, Field

class TableColumnSchema(BaseModel):
    name: str
    label: str
    type: str


class FieldSchema(BaseModel):
    name: str
    label: str
    type: Optional[
        Literal[
            "text",
            "textarea",
            "date",
            "number",
            "currency",
            "dynamic_list",
            "nested_service_list",
            "table"
        ]
    ] = None

    required: bool = False

    # Dynamic List Options
    item_type: Optional[str] = None

    # Nested Service Options
    parent_label: Optional[str] = None
    child_label: Optional[str] = None

    # Table Options
    columns: Optional[List[TableColumnSchema]] = None
    min_rows: Optional[int] = None

    # Computed Fields
    readonly: bool = False
    auto_calculated: bool = False






class TemplateSchema(BaseModel):
    template_id: str
    template_name: str
    fields: List[FieldSchema]


