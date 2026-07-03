import type { FieldSchema } from "../types/schema";

export interface FieldGroup {
    [section: string]: FieldSchema[];
}

export function groupFieldsBySection(
    fields: FieldSchema[]
): FieldGroup {

    const groups: FieldGroup = {};

    fields.forEach((field) => {

        const section = field.section ?? "General";

        if (!groups[section]) {
            groups[section] = [];
        }

        groups[section].push(field);

    });

    return groups;
}