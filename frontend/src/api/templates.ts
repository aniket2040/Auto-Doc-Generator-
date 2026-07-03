import api from "./axios";

import type {
    TemplateSchema,
    TemplateSummary,
} from "../types/schema";

export const getTemplates =
    async (): Promise<
        TemplateSummary[]
    > => {

        const response =
            await api.get("/templates");

        return response.data;
    };

export const getTemplate =
    async (
        templateId: string
    ): Promise<TemplateSchema> => {

        const response =
            await api.get(
                `/templates/${templateId}`
            );

        return response.data;
    };