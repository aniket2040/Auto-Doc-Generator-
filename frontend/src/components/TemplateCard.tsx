import { useNavigate } from "react-router-dom";

import type { TemplateSummary } from "../types/schema";

interface TemplateCardProps {
    template: TemplateSummary;
}

export default function TemplateCard({
    template,
}: TemplateCardProps) {

    const navigate = useNavigate();

    return (
        <div
            onClick={() =>
                navigate(`/templates/${template.template_id}`)
            }
            style={{
                cursor: "pointer",

                border: "1px solid #444",

                borderRadius: 12,

                padding: "24px",

                marginBottom: "20px",

                transition: "0.2s",

                backgroundColor: "#1e1e1e",

                color: "white",
            }}
        >
            <h2>{template.template_name}</h2>

            <p>
                <strong>ID:</strong>{" "}
                {template.template_id}
            </p>

            <p>
                <strong>Fields:</strong>{" "}
                {template.field_count}
            </p>
        </div>
    );
}