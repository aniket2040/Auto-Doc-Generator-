import { useEffect, useState } from "react";

import { getTemplates } from "../api/templates";

import type{ TemplateSummary } from "../types/schema";

export function useTemplates() {

    const [templates, setTemplates] =
        useState<TemplateSummary[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);

    useEffect(() => {

        async function loadTemplates() {

            try {

                const data =
                    await getTemplates();

                setTemplates(data);

            } catch (err) {

                console.error(err);

                setError(
                    "Unable to load templates."
                );

            } finally {

                setLoading(false);

            }

        }

        loadTemplates();

    }, []);

    return {

        templates,

        loading,

        error

    };

}