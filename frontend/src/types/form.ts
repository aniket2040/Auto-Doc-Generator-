import type{ FieldSchema } from "./schema";

export interface BaseFieldProps {

    field: FieldSchema;

    value: unknown;

    error?: string;

    onChange: (
        fieldName: string,
        value: unknown
    ) => void;

}