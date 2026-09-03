# vacation_picker

A small app to help pick a vacation destination: browse a few proposals as cards, click one to see the details (advantages, budget, transport, hashtags).

Work in progress.

## Stack

- **Frontend**: React + TypeScript, bootstrapped with Vite
- **Backend**: NestJS + TypeScript, raw SQL via `pg` (no ORM, by design, for SQL fundamentals practice)
- **Database**: PostgreSQL

## Infra

- `db`, `backend`, and `frontend` all run as Docker Compose services (`docker-compose.yml`), backend and frontend with a bind mount on their own directory for hot-reload
- `db` init scripts (`db/init/*.sql`) run automatically on first boot of an empty volume
- Copy `.env.example` to `.env` and fill in real values before starting the stack. Host-side ports (`POSTGRES_PORT`, `BACKEND_PORT`, `FRONTEND_PORT`) can be changed there if they conflict with something already running on your machine
- Local tooling: Husky pre-commit (lint + format on staged files) and pre-push (backend tests) hooks

## Getting started

```bash
cp .env.example .env   # then edit .env with real values
make install            # install root, backend, and frontend dependencies
make up                 # start db + backend + frontend in Docker
```

## Makefile commands

| Command | What it does |
|---|---|
| `make install` | Install dependencies (root tooling, backend, frontend) |
| `make up` | Start the Docker stack (db + backend + frontend) in the background |
| `make down` | Stop the Docker stack, keep data |
| `make reset` | Stop the stack and wipe data (forces `db/init` scripts to rerun) |
| `make logs` | Follow every container's logs |
| `make ps` | Show Docker stack status |
| `make be-dev` | Run the backend in watch mode, outside Docker |
| `make be-build` | Compile the backend |
| `make be-lint` | Lint the backend |
| `make be-format` | Format the backend |
| `make be-test` | Run backend unit tests |
| `make fe-dev` | Run the frontend dev server |
| `make fe-build` | Build the frontend for production |
| `make fe-lint` | Lint the frontend |
| `make fe-format` | Format the frontend |
