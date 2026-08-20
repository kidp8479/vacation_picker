# vacation_picker

Under construction.

A small app to help pick a vacation destination: browse a few proposals as cards, click one to see the details (advantages, budget, transport, hashtags).

## Stack

- **Frontend**: React + TypeScript, bootstrapped with Vite
- **Backend**: NestJS + TypeScript, raw SQL via `pg` (no ORM, by design, for SQL fundamentals practice)
- **Database**: PostgreSQL
- **Docs**: Compodoc (generated API docs, `backend/`)

## Infra

- `db` and `backend` run as Docker Compose services (`docker-compose.yml`), backend with a bind-mounted `backend/` for hot-reload
- `db` init scripts (`db/init/*.sql`) run automatically on first boot of an empty volume
- `frontend` runs locally with `npm run dev` for now (not yet containerized)
- Local tooling: Husky pre-commit (lint + format on staged files) and pre-push (backend tests) hooks

## Getting started

```bash
make install   # install root, backend, and frontend dependencies
make up        # start db + backend in Docker
make fe-dev    # run the frontend dev server locally
```

## Makefile commands

| Command | What it does |
|---|---|
| `make install` | Install dependencies (root tooling, backend, frontend) |
| `make up` | Start the Docker stack (db + backend) in the background |
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
