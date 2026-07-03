import type { TemplateSchema } from "../types/schema";

export interface ValidationErrors {
    [fieldName: string]: string;
}

export function validateForm(
    template: TemplateSchema,
    values: Record<string, unknown>
): ValidationErrors {

    const errors: ValidationErrors = {};

    template.fields.forEach((field) => {

        const value = values[field.name];

        /*
        ------------------------
        Required Validation
        ------------------------
        */

        if (field.required) {

            switch (field.type) {

                case "text":
                case "textarea":
                case "date":
                case "currency":
                case "number":

                    if (
                        value === "" ||
                        value === null ||
                        value === undefined
                    ) {

                        errors[field.name] =
                            `${field.label} is required`;

                    }

                    break;

                case "dynamic_list":

                    if (
                        !Array.isArray(value) ||
                        value.length === 0 ||
                        value.every(
                            item =>
                                String(item).trim() === ""
                        )
                    ) {

                        errors[field.name] =
                            `${field.label} is required`;

                    }

                    break;

                case "table":

                    if (
                        !Array.isArray(value) ||
                        value.length === 0
                    ) {

                        errors[field.name] =
                            `${field.label} is required`;

                    }

                    break;

                case "nested_service_list":

                    if (
                        !Array.isArray(value) ||
                        value.length === 0
                    ) {

                        errors[field.name] =
                            `${field.label} is required`;

                    }

                    break;

            }

        }

    });

    return errors;

}