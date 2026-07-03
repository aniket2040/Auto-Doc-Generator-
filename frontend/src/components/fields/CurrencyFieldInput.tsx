import TextField from "@mui/material/TextField";

import type{ BaseFieldProps } from "../../types/form";
import { useFieldBinding } from "../../hooks/useFieldBinding";

export default function CurrencyFieldInput({
    field,
    value,
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
            required={field.required}
            fullWidth
            margin="normal"
            type="number"
            onChange={(event) =>
                setValue(event.target.value)
            }
        />
    );
}