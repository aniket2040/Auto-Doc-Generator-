import { useEffect, useState } from "react";

import { getTemplate } from "../api/templates";

import type{ TemplateSchema } from "../types/schema";

export function useTemplate(

    templateId: string

) {

    const [template, setTemplate] =
        useState<TemplateSchema | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);

    useEffect(() => {

        if (!templateId)
            return;

        async function loadTemplate() {

            try {

                const data =
                    await getTemplate(
                        templateId
                    );

                setTemplate(data);

            } catch (err) {

                console.error(err);

                setError(
                    "Unable to load template."
                );

            } finally {

                setLoading(false);

            }

        }

        loadTemplate();

    }, [templateId]);

    return {

        template,

        loading,

        error

    };

}