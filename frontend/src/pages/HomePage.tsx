import TemplateCard from "../components/TemplateCard";

import { useTemplates } from "../hooks/useTemplates";

export default function HomePage() {

    const {

        templates,

        loading,

        error

    } = useTemplates();

    if (loading)
        return <h2>Loading...</h2>;

    if (error)
        return <h2>{error}</h2>;

    return (

        <div
            style={{
                maxWidth: 1000,
                margin: "40px auto",
            }}
        >

            <h1>
                Auto DOC Completer
            </h1>

            <h2>
                Available Templates
            </h2>

            {

                templates.map(template => (

                    <TemplateCard

                        key={template.template_id}

                        template={template}

                    />

                ))

            }

        </div>

    );

}