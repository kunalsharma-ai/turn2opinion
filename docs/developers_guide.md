# Developer's Guide: Turn2Opinion

Welcome to the Turn2Opinion project! This guide is designed to help you get up to speed quickly with the project's architecture, services, and code structure.

## 1. Service Overview

The application is built as a set of dockerized microservices. Here is a high-level view of each service:

*   **`gateway`**: The entry point for all requests. Powered by **Nginx**, it routes traffic to the appropriate backend services or the frontend based on the URL.
*   **`frontend`**: The user-facing web application built with **Next.js**. It handles the UI/UX and client-side logic.
*   **`backend`**: The core API service built with **Express.js**. It manages business logic, user data, and communicates with the database.
*   **`db`**: The persistent data store using **MongoDB**.
*   **`email`**: A specialized service for sending emails (SMTP).
*   **`storage`**: Handles file uploads and storage management.
*   **`email-template`**: Manages HTML templates for system emails.
*   **`validator-country`**: A microservice for validating and providing country-related data.
*   **`validator-email`**: A microservice dedicated to verifying email address formats and validity.

---

## 2. Frontend (`Project/frontend`)

The frontend is a modern **Next.js 15** application (using React 19) designed for performance and a rich user experience.

### Tech Stack
*   **Framework**: Next.js 15.5.3
*   **UI Library**: Material UI (MUI) v7 with Emotion
*   **Features**: Face API, Google Maps, Socket.io, TinyMCE

### Directory Structure (`src/`)
The source code is organized in `Project/frontend/src`:

*   **`app/`**: Next.js App Router directory containing page routes and layouts.
*   **`Context/`**: React Context providers for global state management (e.g., Auth, Theme).
*   **`components/`**: Reusable UI components used across the application.
*   **`componentsMHO/`**: Likely specialized or legacy components (Needs verification).
*   **`hooks/`**: Custom React hooks for shared logic.
*   **`util/`**: Utility functions and helper classes.
*   **`validators/`**: Form validation logic.
*   **`lib/`**: External library configurations.
*   **`theme/`**: MUI theme definitions.

### Development
To run the frontend locally (outside Docker) for faster iteration:
```bash
cd Project/frontend
npm install
npm run dev # Runs with Turbopack
```

---

## 3. Backend (`Project/backend`)

The backend is a robust **Node.js/Express** application that serves as the primary API for Turn2Opinion.

### Tech Stack
*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **Database**: Mongoose (MongoDB ODM)
*   **Auth**: JWT (JSON Web Tokens)
*   **Security**: Bcrypt, CORS, Rate Limiting

### Directory Structure (`app/`)
The application logic is found in `Project/backend/app`:

*   **`server.js`**: The entry point of the application.
*   **`routes/`**: API route definitions. Maps HTTP endpoints to controller functions.
*   **`controller/`**: Handles the business logic for each route. Processes requests and sends responses.
*   **`model/`**: Mongoose schemas defining the data structure for MongoDB.
*   **`utils/`**: Helper functions (e.g., helpers for encryption, formatting, etc.).
*   **`dataBank/`**: Static data files (e.g., `theworld.json`).
*   **`logs/`**: Application log files.

### Development
To run the backend locally:
```bash
cd Project/backend
npm install
npm run dev # Uses Nodemon for hot-reloading
```

---


---

## 4. Local Development Environment

The recommended way to run the project locally is using **Docker Compose**. This ensures an environment identical to production and handles all service dependencies automatically.

### Running with Docker

1.  **Prerequisites**:
    *   Docker & Docker Compose installed.
    *   **Create External Network**: The `docker-compose.yml` expects an external network named `publicweb` for the proxy. Create it using:
        ```bash
        docker network create publicweb
        ```
2.  **Start the Application**:
    ```bash
    docker-compose up -d
    ```
3.  **Access**:
    The application will be accessible via the mapped ports (configured in `docker-compose.yml` and `gateway`).
    *   **Frontend**: Typically accessible at `http://localhost` or `http://turn2opinion.com` (requires `/etc/hosts` entry: `127.0.0.1 turn2opinion.com`).
    *   **Backend API**: Typically accessible via the gateway at `/api/v1/`.

### Rebuilding Services
If you make changes to the code (e.g., install new dependencies), you may need to rebuild the containers:
```bash
docker-compose up -d --build
```

