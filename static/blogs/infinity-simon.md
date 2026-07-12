---
title: "Infinity Simon"
subtitle: "Multiplayer Simon Says (Agile project team leader)"
coverImage: "https://noah.devla.dev/images/infinite-simon2.webp"
type: ["project"]
fromdate: "2025-09-13"
todate: "2025-11-23"

sourceLink: "https://github.com/pti-szfm-2025/infinite-simon"
tags: ["React", "Typescript" ,"Tailwind CSS", "Docker", "Express", "Jest", "SQLite"]
visible: true
---

# Infinity Simon

My first Agile project during university where I served as team leader, designer, and frontend developer. We took the classic Simon Says memory game and evolved it into a competitive multiplayer web application with an enhanced game mode.

## My Role

- **Team Leader**: Coordinated the team, managed sprints, and facilitated Agile ceremonies.
- **Designer**: Created UI/UX designs and wireframes for the application.
- **Frontend Developer**: Implemented the React-based frontend with TypeScript and Tailwind CSS.

## Features

- ✅ Single-player and multiplayer competitive modes.
- ✅ Enhanced game mode with additional input types beyond the classic four buttons.
- ✅ User authentication with email verification and password recovery.
- ✅ Player profiles with avatars and detailed statistics.
- ✅ Seed-based match system ensuring fair competition.
- ✅ Fully responsive design.
- ✅ Guest mode for trying the game without registration.

## Tech Stack

### Frontend

- [React](https://react.dev/): React 19 with TypeScript for the client application.
- [Tailwind CSS](https://tailwindcss.com/): For styling and responsive design.

### Backend

- [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/): REST API handling user management, seed generation, and match coordination.
- [Prisma ORM](https://www.prisma.io/): Database schema management with type-safe queries.
- [SQLite](https://www.sqlite.org/): Storing user data, match results, and statistics.

### Architecture & Deployment

The backend follows clean architecture principles with separate presentation, business logic, and persistence layers. The multiplayer system uses seed-based generation: the server creates a unique seed for each match, ensuring all players experience identical sequences while keeping game logic client-side for responsive gameplay.

- [Docker](https://www.docker.com/): Containerized deployment for both frontend and backend.
- [Jest](https://jestjs.io/): Testing framework for backend services.
- [Swagger/OpenAPI](https://swagger.io/): API documentation.

## What I Learned

- Implementing user authentication with email verification and password recovery flows.
- Working collaboratively in a team environment with code reviews and version control.
- Agile methodology with sprints, daily standups, and iterative development.
- Using Kanban boards (Trello) for task management and progress tracking.
- Git workflows with pull requests, code reviews, and branch management.
- Writing comprehensive documentation including functional specifications, requirement specifications, and system design documents.
