import TextField from "@mui/material/TextField";

import type { BaseFieldProps } from "../../types/form";
import { useFieldBinding } from "../../hooks/useFieldBinding";

export default function TextFieldInput({
    field,
    value,
    error,
    onChange,
}: BaseFieldProps) {

    const {
        value: fieldValue,
        setValue,
    } = useFieldBinding(
        field.name,
        value,
        onChange
    );

    return (

        <TextField
            label={field.label}
            value={fieldValue ?? ""}
            onChange={(event) =>
                setValue(event.target.value)
            }
            required={field.required}
            error={Boolean(error)}
            helperText={error}
            fullWidth
            margin="normal"
            multiline={field.type === "textarea"}
            minRows={
                field.type === "textarea"
                    ? 4
                    : undefined
            }
        />

    );

}