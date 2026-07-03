export interface TableColumn {
    name: string;
    label: string;
    type: string;
}

export interface FieldSchema {
    name: string;
    label: string;

    type:
        | "text"
        | "textarea"
        | "date"
        | "number"
        | "currency"
        | "dynamic_list"
        | "nested_service_list"
        | "table";

    required: boolean;

    section: string;

    item_type?: string;

    parent_label?: string;
    child_label?: string;

    columns?: TableColumn[];

    min_rows?: number;

    readonly?: boolean;
    auto_calculated?: boolean;
}

export interface TemplateSchema {
    template_id: string;
    template_name: string;

    fields: FieldSchema[];
}

export interface TemplateSummary {
    template_id: string;
    template_name: string;

    field_count: number;

    docx_exists: boolean;
}