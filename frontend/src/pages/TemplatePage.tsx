import { useParams } from "react-router-dom";

import DynamicForm from "../components/DynamicForm";

import { useTemplate } from "../hooks/useTemplate";
import { useDocumentGeneration } from "../hooks/useDocumentGeneration";

import type { FormEngine } from "../types/formEngine";

export default function TemplatePage() {

    const { templateId = "" } = useParams();

    const {
        template,
        loading,
        error,
    } = useTemplate(templateId);

    const document = useDocumentGeneration();

    if (loading)
        return <h2>Loading...</h2>;

    if (error)
        return <h2>{error}</h2>;

    if (!template)
        return <h2>No template found.</h2>;

    const handleGenerateDocument = async (
        form: FormEngine
    ) => {

        form.setSubmitting(true);

        try {

            await document.generate(
                template.template_id,
                form
            );

            form.reset();

        } catch (error) {

            console.error(error);

        } finally {

            form.setSubmitting(false);

        }

    };

    return (

        <div
            style={{
                maxWidth: 1000,
                margin: "40px auto",
            }}
        >

            <h1>{template.template_name}</h1>

            <hr />

            <DynamicForm
                template={template}
                onSubmit={handleGenerateDocument}
            />

        </div>

    );

}