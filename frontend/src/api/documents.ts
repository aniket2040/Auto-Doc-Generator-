import api from "./axios";

export async function generateDocument(

    templateId: string,

    payload: Record<string, unknown>

): Promise<Blob> {

    const response = await api.post(

        `/documents/generate/${templateId}`,

        payload,

        {

            responseType: "blob",

        }

    );

    return response.data;

}