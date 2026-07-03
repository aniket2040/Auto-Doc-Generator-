import type { TemplateSchema } from "../types/schema";

export function initializeForm(
    template: TemplateSchema
): Record<string, any> {

    const values: Record<string, any> = {};

    template.fields.forEach((field) => {

        switch (field.type) {

            case "text":
            case "textarea":
            case "date":
            case "currency":
            case "number":

                values[field.name] = "";
                break;

            case "dynamic_list":

                values[field.name] = [""];
                break;

            case "nested_service_list":

                values[field.name] = [];
                break;

            case "table":

                values[field.name] = [];
                break;

            default:

                values[field.name] = "";

        }

    });

    return values;
}