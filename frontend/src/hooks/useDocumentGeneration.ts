import { useState } from "react";

import { generateDocument } from "../api/documents";

import type { FormEngine } from "../types/formEngine";

export function useDocumentGeneration() {

    const [

        loading,

        setLoading,

    ] = useState(false);

    const [

        error,

        setError,

    ] = useState<string | null>(null);

    const generate = async (

        templateId: string,

        form: FormEngine

    ) => {

        try {

            form.setSubmitting(true);

            setLoading(true);

            setError(null);

            const blob = await generateDocument(

                templateId,

                form.values

            );

            const url =

                window.URL.createObjectURL(blob);

            const link =

                document.createElement("a");

            link.href = url;

            link.download =
                `${templateId}.docx`;

            link.click();

            window.URL.revokeObjectURL(url);

            form.reset();

        }

        catch (err) {

            console.error(err);

            setError(

                "Document generation failed."

            );

        }

        finally {

            form.setSubmitting(false);

            setLoading(false);

        }

    };

    return {

        loading,

        error,

        generate,

    };

}