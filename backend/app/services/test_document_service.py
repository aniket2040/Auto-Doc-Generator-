from app.services.document_service import (
    DocumentService
)

service = DocumentService()

payload = {
    "statement_of_work_no": "16",
    "department_id": "D001",
    "serial_id": "S001",
    "project_id": "P001",
    "project_name": "DD365 Platform",
    "purpose_sow": "Build and enhance DD365 platform.",
    "commencement_date": "2026-01-01",
    "termination_date": "2026-12-31",
    "project_manager": "Aniket Kumar",
    "purchase_order_amount": "$500,000",

    "SCOPE_OF_SERVICES": [
        "Implement API monetization",
        "Marketplace integration",
        "Performance testing"
    ],

    "SERVICES_TO_BE_PERFORMED": [
        {
            "description":
                "Extend DD365 platform",

            "subservices": [
                "UI Screens",
                "Infrastructure Services",
                "Terraform Scripts"
            ]
        }
    ],

    "key_personnel": [
        {
            "role": "Architect",
            "name": "Jens Kaemmerer",
            "phone": "1234567890"
        }
    ],

    "tms_staffing": [
        {
            "role": "Project Manager",
            "name": "Raghav Komboor",
            "phone": "9876543210"
        }
    ],

    "consultants": [
        {
            "consultant_name": "Jens Kaemmerer",
            "role": "Architect",
            "hourly_rate": 160,
            "hours": 100,
            "fee": 16000
        },
        {
            "consultant_name": "Susanthi",
            "role": "UX Developer",
            "hourly_rate": 80,
            "hours": 100,
            "fee": 8000
        }
    ]
}

output = service.generate_document(
    template_id="toyota_sow",
    payload=payload
)

print(output)