# Project Introduction
It's a low-code platform for users to create MES systems. Our target user is like **product manager** who is not strong in tech but has good understanding of the product that he/she wants to build. We will generate the backend and frontend for his specific MES system for different industries and allow him/her to **edit the UI or code in the embedded code editor**. The flow is firstlly user put in their requirements in a chat message, then we a form with the application name, industry and application type. User can edit the form or accept. After user accepted the form, the application will return a **PRD file** which is like the user requirements and features in the system. User can also edit the file and accept after their edits. After the user accepts the PRD file, the system will starts to **generate the frontend and backend system and allow the user to download or edit each file selected in the file directory**. User can also **preview the app or deploy the app**. We also want the shell to be exposed for user to see what's going on in our system and explore the system directory in **shell**.

# Features

The platform guides users through a streamlined process to generate their MES application:

1.  **Requirements Input**: Users begin by providing their MES requirements through a chat interface.
2.  **Form Generation & Review**: Based on the chat input, the system generates a preliminary form including application name, industry, and application type. Users can review and edit this form.
3.  **PRD Generation & Editing**: Upon form acceptance, a comprehensive Product Requirements Document (PRD) is generated based on **custom specific requirements**, **industry requirements**, **compliance requirements for different industry**. This PRD outlines user requirements and system features, and users are given the flexibility to edit its content using a rich text editor.
4.  **Code Generation**: After the PRD is finalized, the system proceeds to generate the frontend and backend code for the MES application.
5.  **File Management & Editing**: Users can then download the generated files or directly edit individual files within an embedded code editor.
6.  **Application Preview & Deployment**: The platform also offers functionalities to preview the generated application and deploy it.
7.  **Shell Access**: For advanced users, a shell interface is exposed to monitor system activities and explore the project directory. We expose it for the ease of debugging for agents and our users.

# How to get started?

Run Command:
```bash
pnpm run dev
```

# Core Workflow

The MES Low-Code Platform follows a structured workflow that transforms user requirements into deployable applications through several key stages:
## User-to-Application Generation Flow.

![image](https://github.com/user-attachments/assets/51302e9e-1380-4e48-8fd3-593e75d7f75e)

## System Interaction Flow: 

The platform begins with natural language requirements input through a chat interface, progresses through form generation and PRD creation, and culminates in automated code generation with integrated development tools.

# System Components
The platform consists of several interconnected subsystems that handle different aspects of the application generation process:

![image](https://github.com/user-attachments/assets/a9187f18-84e9-49e5-a59c-08554ea1b5cc)

Component Integration: Each component operates independently while maintaining clear data flow paths, enabling users to iterate on any stage of the generation process without losing previous work.

# Technology Stack Overview
The platform is built on a modern web development stack optimized for rapid development and code generation:
Here's the table in markdown format based on the image:

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend Framework | React with TypeScript | User interface and application logic |
| Build System | Vite | Development server and production builds |
| UI Components | shadcn/ui with Radix UI | Component library and design system |
| Styling | Tailwind CSS | Utility-first CSS framework |
| Package Management | pnpm | Workspace management and dependency resolution |
| Code Quality | ESLint | Linting and code standards enforcement |
| Development Tools | Hot Module Replacement | Real-time development feedback |

# Code Generation Pipeline
Multi-Stage Generation Process: The code generation engine transforms PRD specifications into complete application code through a systematic pipeline.
![image](https://github.com/user-attachments/assets/4bfc0d55-6a9c-484f-b88d-698419f9cf44)

# Code Generator Types and Outputs
The code generation process produces a complete application structure with multiple output types.
| Generator | Output Type | Artifacts |
|-----------|-------------|-----------|
| Frontend Generator | React/TypeScript | Components, pages, routing, state management |
| Backend Generator | API Services | REST endpoints, business logic, data access |
| Database Generator | Schema & Models | Entity definitions, relationships, migrations |
| Configuration Generator | Build & Deploy | Package configuration, environment setup |

# File System Organization
The platform organizes generated code into a structured file system that supports editing, preview, and deployment workflows.
![image](https://github.com/user-attachments/assets/0616236c-0742-435b-84cb-709245ef5739)

# User Interaction Capabilities
The platform provides comprehensive access to the generated codebase through multiple interfaces designed for product managers and non-technical users.
| Interface | Purpose | Capabilities |
|-----------|---------|--------------|
| Code Editor | File modification | Syntax highlighting, validation, real-time preview |
| Directory Explorer | File navigation | Browse, select, organize generated files |
| Preview Service | Application testing | Live preview of generated application |
| Shell Interface | System exploration | Command-line access to project directory |
| Deployment Service | Application publishing | Deploy to hosting platforms |



