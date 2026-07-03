import DynamicField from "./DynamicField";
import FormSection from "./layout/FormSection";
import { Button } from "@mui/material";
import { groupFieldsBySection } from "../utils/groupFields";
import { useFormEngine } from "../hooks/useFormEngine";

import type { TemplateSchema } from "../types/schema";

import type { FormEngine } from "../types/formEngine";

interface DynamicFormProps {
    template: TemplateSchema;

    onSubmit: (
        form: FormEngine
    ) => void | Promise<void>;
}

export default function DynamicForm({
    template,
    onSubmit,
}: DynamicFormProps) {

    const form = useFormEngine(template);

    const groupedFields = groupFieldsBySection(
        template.fields
    );

    return (

        <div>

            {Object.entries(groupedFields).map(
                ([section, fields]) => (

                    <FormSection
                        key={section}
                        title={section}
                    >

                        {fields.map((field) => (

                            <DynamicField
                                
                                field={field}
                                value={form.values[field.name]}
                                error={form.errors[field.name]}
                                onChange={form.updateField}
                            />

                        ))}

                    </FormSection>

                )
            )}

            <hr />

            <h3>Current Form Data</h3>

            <pre
                style={{
                    background: "#f5f5f5",
                    padding: 16,
                    borderRadius: 8,
                    overflowX: "auto",
                }}
            >
                {JSON.stringify(
                    form.values,
                    null,
                    2
                )}
            </pre>
            <Button
    variant="contained"
    size="large"
    sx={{ mt: 3 }}
    disabled={form.submitting}
    onClick={() => {

        if (!form.validate()) {
            return;
        }

        onSubmit(form);

    }}
>
    {form.submitting
        ? "Generating..."
        : "Generate Document"}
</Button>

        </div>

    );

}