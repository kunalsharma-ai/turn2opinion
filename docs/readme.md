# turn2opinion: Project Overview

`turn2opinion` is a sophisticated, modern web platform built on a scalable **microservices architecture**. The project is designed to handle complex workflows, including surveys, user management, and real-time interactions, all orchestrated via Docker for consistent deployment across environments.

## Core Architecture

The system is decoupled into several specialized services, ensuring high availability and ease of maintenance:

*   **API Gateway (Nginx)**: Acts as the central entry point, managing request routing, SSL termination, and security filtering.
*   **Backend (Express.js)**: A robust Node.js API that handles core business logic, data processing, and integration with the MongoDB database using Mongoose.
*   **Frontend (Next.js 15)**: A state-of-the-art React 19 application providing a rich, responsive user interface. It leverages Material UI for design and TanStack Query for efficient data fetching.
*   **Database (MongoDB)**: A NoSQL data store tailored for flexible data models, particularly useful for survey responses and dynamic user profiles.

## Survey Visibility & Participation Policy

The platform has transitioned from a category-wide broadcast model to a targeted **Invitation-Driven Model**:

### 1. Invitation-Based Access
Surveys are no longer automatically shown to all users in a category. Instead, a survey only appears on a user's dashboard if they have an explicit invitation record in the `Response` collection.
*   **Status Lifecycle**: Surveys progress from `invited` → `dropout` (started) → `complete`/`terminate`/`overquota`.
*   **Dashboard Logic**: The dashboard displays surveys with `invited` status (as new) and `dropout` status (to resume).

### 2. Admin Invitation System
Administrators have granular control over survey distribution via the Admin Panel:
*   **Bulk Invitations**: Admins can trigger bulk invitations for any internal survey, targeting either all matching category users or the entire respondent pool.
*   **Auto-Invite for New Users**: Surveys can be marked for `autoInvite`. When enabled, any new user who registers in a matching category is automatically invited to that survey.

## Technology Stack Highlights

### Frontend
- **Framework**: Next.js 15 (React 19)
- **Styling**: MUI (Material UI) with Emotion
- **Interactions**: Framer Motion for animations, Socket.io for real-time updates.
- **Specialized Tools**: `face-api.js` for biometric features and TinyMCE for rich text content.

### Backend
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Middleware**: Compression, Cookie Parser, File Upload, and Rate Limiting.
- **Templating**: Twig for dynamic view generation.

## Infrastructure & Deployment

The entire ecosystem is containerized using **Docker**, with orchestration managed via `docker-compose`. Configuration is centralized in environment files (e.g., `turn2opinion.env`), allowing for seamless transitions between development, staging, and production environments.

## Development Philosophy

The project emphasizes modularity and modern engineering standards. By separating concerns into distinct services and utilizing a modern frontend stack, `turn2opinion` is built for both performance and future scalability.
