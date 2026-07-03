# Auto-Doc-Generator-

 # 📄 Auto DOC Completer

<div align="center">

### Schema-Driven Document Generation Platform

Generate professional Microsoft Word documents dynamically using **JSON Schemas**, **Jinja2 Templates**, **FastAPI**, and **React**.

---

Built with ❤️ using

FastAPI • React • TypeScript • Material UI • DocxTPL • Python

</div>

---

# 📖 Overview

Auto DOC Completer is a schema-driven document generation platform that allows organizations to automate the creation of Microsoft Word (.docx) documents without writing custom forms or modifying backend code.

Instead of hardcoding forms, users define a **JSON Schema** that describes the document fields. The frontend automatically builds the corresponding form, while the backend injects the submitted data into a Microsoft Word template using **Jinja2** placeholders.

This architecture enables developers and businesses to create completely new document workflows simply by adding:

- a `.docx` template
- a `.schema.json` configuration

without modifying the application's source code.

---

# 🚀 Features

## Dynamic Template Loading

Automatically discovers available templates.

```
Toyota Statement Of Work
Employment Agreement
Purchase Order
Invoice
Service Contract
```

---

## Schema Driven Forms

No React code needs to be written for new templates.

The frontend automatically generates forms based on the schema.

Supported field types include:

- Text
- Text Area
- Date
- Currency
- Number
- Dynamic List
- Nested Service List
- Dynamic Tables
- Auto Calculated Fields

---

## Dynamic Word Generation

Uses **docxtpl** and **Jinja2** to generate Microsoft Word documents.

Supports:

- Paragraph placeholders
- Dynamic bullet lists
- Dynamic numbered lists
- Nested loops
- Dynamic tables
- Conditional rendering

---

## Completely Reusable

Adding a new document requires only two files.

```
contract.docx

contract.schema.json
```

No frontend changes.

No backend changes.

---

## Clean Architecture

```
Frontend

React
    ↓
Hooks
    ↓
API Layer
    ↓

----------------------

Backend

FastAPI
    ↓
Services
    ↓
Schema Engine
    ↓
DocxTPL
```

---

# 🏗 Architecture

```
                         User

                          │

                          ▼

                React Frontend

                          │

                Dynamic Form Engine

                          │

                JSON Schema Parser

                          │

                     Axios API

                          │

────────────────────────────────────────────

                     FastAPI

                          │

                 Template Service

                          │

                 Document Service

                          │

                     DocxTPL

                          │

                Microsoft Word

                          │

                 Generated DOCX
```

---

# 📂 Project Structure

```
Auto DOC Completer/

│

├── backend/

│   ├── app/

│   │   ├── routes/

│   │   ├── services/

│   │   ├── schemas/

│   │   └── templates/

│

├── frontend/

│   ├── src/

│   │   ├── api/

│   │   ├── components/

│   │   ├── hooks/

│   │   ├── pages/

│   │   ├── types/

│   │   └── utils/

│

├── generated/

│

└── README.md
```

---

# ⚙ Technology Stack

## Backend

- Python 3.12
- FastAPI
- Pydantic v2
- DocxTPL
- Jinja2

---

## Frontend

- React 19
- TypeScript
- Material UI
- Axios
- React Router

---

## Document Engine

- Microsoft Word (.docx)
- Jinja2
- DocxTPL

---

# 💻 Installation

## Clone Repository

```bash
git clone https://github.com/your-username/auto-doc-completer.git

cd auto-doc-completer
```

---

# Backend Setup

```bash
cd backend

python -m venv .venv
```

Activate environment

### Windows

```bash
.venv\Scripts\activate
```

### Linux / Mac

```bash
source .venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run FastAPI

```bash
uvicorn app.main:app --reload
```

Backend

```
http://127.0.0.1:8000
```

Swagger

```
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

```bash
cd frontend

npm install
```

Run React

```bash
npm run dev
```

Frontend

```
http://localhost:5173
```

---

# Running the Application

Start the backend first.

```
uvicorn app.main:app --reload
```

Then start React.

```
npm run dev
```

Open

```
http://localhost:5173
```

Choose a template.

Fill the form.

Click

```
Generate Document
```

The generated Word document will automatically download.

---

# ✨ How It Works

```
JSON Schema

↓

Dynamic React Form

↓

User Input

↓

FastAPI

↓

DocxTPL

↓

Microsoft Word

↓

Generated Document
```

The frontend never knows anything about Microsoft Word.

The backend never knows anything about React.

The JSON Schema acts as the contract between both systems.

---

# 🎯 Why Schema Driven?

Traditional applications require developers to modify both frontend and backend whenever a new document is introduced.

With Auto DOC Completer:

```
New Template

↓

Add DOCX

↓

Add JSON Schema

↓

Done
```

No React development.

No FastAPI development.

No database migration.

No code duplication.




# 📄 Creating a New Template

One of the primary goals of Auto DOC Completer is to allow developers to introduce new document types **without modifying application code**.

To create a new document template, only **two files** are required:

```
templates/

│

├── invoice.docx

└── invoice.schema.json
```

No frontend changes.

No backend changes.

Once these files are added to the `templates/` directory, the application automatically detects the new template and makes it available in the frontend.

---

# Template Naming Convention

The DOCX file and JSON Schema **must** share the same filename.

Example

```
templates/

toyota_sow.docx

toyota_sow.schema.json
```

If the filenames do not match, the application will not be able to locate the correct schema or Word template.

---

# Folder Structure

```
backend/

└── templates/

    ├── toyota_sow.docx

    ├── toyota_sow.schema.json

    ├── invoice.docx

    ├── invoice.schema.json

    ├── contract.docx

    └── contract.schema.json
```

---

# Writing the Word Template

Templates are standard Microsoft Word documents (.docx).

Open the document using Microsoft Word and place **Jinja2 placeholders** wherever dynamic content should appear.

Example

```
Statement Of Work Number

{{ statement_of_work_no }}

Project Name

{{ project_name }}

Project Manager

{{ project_manager }}

Purchase Order

{{ purchase_order_amount }}
```

When the document is generated, these placeholders are replaced with the values entered in the React form.

---

# Basic Placeholder Syntax

Single value

```
{{ project_name }}
```

Output

```
DD365 Platform
```

---

Date

```
{{ commencement_date }}
```

Output

```
2026-01-01
```

---

Currency

```
{{ purchase_order_amount }}
```

Output

```
Five Million Dollars ($500,000)
```

---

# Dynamic Lists

Dynamic lists are generated using Jinja2 loops.

Example

```
Scope Of Services

{% for item in SCOPE_OF_SERVICES %}

• {{ item }}

{% endfor %}
```

If the user enters

```
API Development

Infrastructure

Security Testing
```

The generated document becomes

```
Scope Of Services

• API Development

• Infrastructure

• Security Testing
```

There is no limit to the number of list items.

---

# Nested Lists

Nested structures can also be rendered.

Word Template

```
{% for service in SERVICES_TO_BE_PERFORMED %}

{{ service.description }}

{% for sub in service.subservices %}

- {{ sub }}

{% endfor %}

{% endfor %}
```

Example Input

```
Platform Development

    UI Screens

    API Layer

    Terraform

Security

    IAM

    Auditing
```

Generated Output

```
Platform Development

- UI Screens

- API Layer

- Terraform

Security

- IAM

- Auditing
```

---

# Dynamic Tables

Tables are supported using standard Jinja2 loops.

Inside Word

```
| Consultant | Role | Hours |

{% for consultant in consultants %}

| {{ consultant.consultant_name }}

| {{ consultant.role }}

| {{ consultant.hours }}

{% endfor %}
```

Generated Table

| Consultant | Role | Hours |
|------------|------|-------|
| John | Architect | 120 |
| Susan | UX Designer | 80 |

The number of rows is completely dynamic.

---

# Nested Tables

Complex objects are also supported.

Example

```
{% for person in key_personnel %}

{{ person.role }}

{{ person.name }}

{{ person.phone }}

{% endfor %}
```

---

# Jinja2 Cheat Sheet

Variable

```
{{ variable }}
```

Loop

```
{% for item in items %}

{{ item }}

{% endfor %}
```

Condition

```
{% if value %}

{{ value }}

{% endif %}
```

Nested Loop

```
{% for service in services %}

{% for task in service.tasks %}

{{ task }}

{% endfor %}

{% endfor %}
```

---

# JSON Schema

Each template requires a schema describing the fields to render.

Example

```json
{
  "template_id": "toyota_sow",

  "template_name": "Toyota Statement Of Work",

  "fields": [

    {

      "name": "project_name",

      "label": "Project Name",

      "type": "text",

      "section": "Project Information",

      "required": true

    }

  ]
}
```

The schema is automatically consumed by the frontend to build the form.

---

# Supported Field Types

| Type | Description |
|------|-------------|
| text | Single line input |
| textarea | Multi-line input |
| date | Date Picker |
| number | Numeric input |
| currency | Currency input |
| dynamic_list | Unlimited list items |
| nested_service_list | Parent-child list |
| table | Dynamic table |

---

# Field Properties

Every field supports the following properties.

| Property | Required | Description |
|----------|----------|-------------|
| name | ✅ | Variable name used in DOCX |
| label | ✅ | Display name shown in UI |
| type | ✅ | Field type |
| section | ✅ | Form section |
| required | ❌ | Validation |
| readonly | ❌ | Read-only field |
| auto_calculated | ❌ | Computed field |

---

# Example Field

```json
{
    "name": "project_name",

    "label": "Project Name",

    "type": "text",

    "section": "Project Information",

    "required": true
}
```

---

# How the System Works

```
DOCX Template

↓

Jinja Placeholders

↓

JSON Schema

↓

React Dynamic Form

↓

User Input

↓

FastAPI

↓

DocxTPL Rendering

↓

Generated Word Document
```

---

# Best Practices

✔ Keep variable names descriptive.

```
project_manager
```

Instead of

```
pm
```

---

✔ Group related fields into sections.

```
Project Information

Consultants

Scope Of Services
```

---

✔ Always use lowercase snake_case variable names.

Good

```
project_name
```

Bad

```
ProjectName

Project Name

projectName
```

---

✔ Keep DOCX formatting inside Microsoft Word.

Avoid embedding formatting logic in Jinja templates.

---

✔ Test every template using Swagger before deploying.

This ensures the schema matches the placeholders and prevents runtime errors.

---

# Common Mistakes

❌ Placeholder does not match schema

Wrong

```
{{ ProjectName }}
```

Schema

```
project_name
```

Correct

```
{{ project_name }}
```

---

❌ Missing schema field

The frontend only renders fields defined in the JSON schema.

If a placeholder exists in the DOCX but is absent from the schema, no value will be collected.

---

❌ Filename mismatch

Wrong

```
contract.docx

agreement.schema.json
```

Correct

```
contract.docx

contract.schema.json
```

Both filenames must match.
