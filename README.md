# Project Introduction
It's a low-code platform for users to create MES systems. Our target user is like **product manager** who is not strong in tech but has good understanding of the product that he/she wants to build. We will generate the backend and frontend for his specific MES system for different industries and allow him/her to **edit the UI or code in the embedded code editor**. 

The flow is firstlly user put in their requirements in a chat message, then we a form with the application name, industry and application type. User can edit the form or accept. After user accepted the form, the application will return a **PRD file** which is like the user requirements and features in the system. User can also edit the file and accept after their edits. After the user accepts the PRD file, the system will starts to **generate the frontend and backend system and allow the user to download or edit each file selected in the file directory**. User can also **preview the app or deploy the app**. We also want the shell to be exposed for user to see what's going on in our system and explore the system directory in **shell**.

# System Flow

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

