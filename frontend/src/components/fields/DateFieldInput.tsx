import dayjs from "dayjs";

import { DatePicker } from "@mui/x-date-pickers";

import type { BaseFieldProps } from "../../types/form";

export default function DateFieldInput({

    field,

    value,

    error,

    onChange,

}: BaseFieldProps) {

    return (

        <DatePicker

            label={field.label}

            value={
                value
                    ? dayjs(String(value))
                    : null
            }

            onChange={(date) =>

                onChange(

                    field.name,

                    date
                        ? date.format("YYYY-MM-DD")
                        : ""

                )

            }

            slotProps={{

                textField: {

                    required: field.required,

                    fullWidth: true,

                    margin: "normal",

                    error: Boolean(error),

                    helperText: error,

                }

            }}

        />

    );

}