import type { FieldSchema } from "../types/schema";

import TextFieldInput from "./fields/TextFieldInput";
import DateFieldInput from "./fields/DateFieldInput";
import CurrencyFieldInput from "./fields/CurrencyFieldInput";
import DynamicListInput from "./fields/DynamicListInput";
import NestedServiceInput from "./fields/NestedServiceInput";
import DynamicTableInput from "./fields/DynamicTableInput";

interface DynamicFieldProps {
    field: FieldSchema;
    value: unknown;
    error?: string;
    onChange: (
        fieldName: string,
        value: unknown
    ) => void;
}

export default function DynamicField({
    field,
    value,
    error,
    onChange,
}: DynamicFieldProps) {

    switch (field.type) {

        case "text":
        case "textarea":
            return (
                <TextFieldInput
                    field={field}
                    value={value}
                    error={error}
                    onChange={onChange}
                />
            );

        case "date":
            return (
                <DateFieldInput
                    field={field}
                    value={value}
                    error={error}
                    onChange={onChange}
                />
            );

        case "currency":
        case "number":
            return (
                <CurrencyFieldInput
                    field={field}
                    value={value}
                    error={error}
                    onChange={onChange}
                />
            );

        case "dynamic_list":
            return (
                <DynamicListInput
                    field={field}
                    value={value}
                    error={error}
                    onChange={onChange}
                />
            );

        case "nested_service_list":
            return (
                <NestedServiceInput
                    field={field}
                    value={value}
                    error={error}
                    onChange={onChange}
                />
            );

        case "table":
            return (
                <DynamicTableInput
                    field={field}
                    value={value}
                    error={error}
                    onChange={onChange}
                />
            );

        default:
            return (
                <div
                    style={{
                        padding: "16px",
                        marginBottom: "16px",
                        border: "1px solid #f44336",
                        borderRadius: "8px",
                        backgroundColor: "#ffebee",
                        color: "#b71c1c",
                    }}
                >
                    <strong>Unsupported field type:</strong> {field.type}
                </div>
            );
    }

}