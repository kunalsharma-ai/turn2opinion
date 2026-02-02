# Project Analysis Report: turn2opinion

## Overview
`turn2opinion` is a microservices-based web application leveraging Docker Compose for orchestration. It consists of a decoupled frontend (Next.js) and backend (Express.js), along with several auxiliary services.

## Technology Stack

### Frontend (`Project/frontend`)
- **Framework**: Next.js 15.5.3 (React 19)
- **UI Library**: MUI (Material UI) v7 with Emotion
- **State/Logic**: React Hooks, generic React components
- **Key Dependencies**:
  - `face-api.js`: Face recognition capabilities
  - `socket.io-client`: Real-time communication
  - `tinymce`: Rich text editing
  - `@react-google-maps/api`: Google Maps integration

### Backend (`Project/backend`)
- **Runtime**: Node.js (Module type)
- **Framework**: Express.js
- **Database Wrapper**: Mongoose (MongoDB)
- **Authentication**: JWT (`jsonwebtoken`)
- **Security**: `bcryptjs`, `cors`, `unknown-express-rate-limit`
- **Key Features**:
  - File uploads (`express-fileupload`)
  - Phone number handling (`libphonenumber-js`)
  - Twig templating (for emails/views?)

### Database
- **Primary**: MongoDB (Service: `db`)
- **Persistence**: Volumes mapped to `./db/store` and backups in `./db/dump`

### Services
- **Gateway**: Nginx-based API Gateway handling routing.
- **Email**: Dedicated Node.js service for SMTP.
- **Storage**: Service for handling file uploads/storage.
- **Validators**: Microservices for country handling and email validation.

## Infrastructure
- **Docker Compose**: Defines network `t2o` (internal) and `publicweb` (external).
- **Environment**: Configuration centralized in `environment/turn2opinion.env`.

## Directory Structure Highlights
```
/
├── docker-compose.yml   # Orchestration
├── environment/         # Env keys
├── db/                  # Database storage/dumps
├── Project/
│   ├── backend/         # Express API
│   ├── frontend/        # Next.js App
│   ├── public/          # Shared public assets (likely mounted to backend)
│   └── services/        # Microservices (gateway, email, storage, etc.)
└── GEMINI.md            # Existing project summary
```

## Observations
- **Modern Stack**: Uses very recent versions of Next.js (v15) and React (v19).
- **Microservices**: Proper separation of concerns with a Gateway pattern.
- **State**: The project seems to be in active development or maintenance given the updated dependencies.
