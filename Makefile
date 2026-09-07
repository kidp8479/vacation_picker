.PHONY: install up down reset logs ps \
	be-dev be-build be-lint be-format be-test \
	fe-dev fe-build fe-lint fe-format fe-test

## install all dependencies (root tooling, backend, frontend)
install:
	npm install
	npm --prefix backend install
	npm --prefix frontend install

## start the docker stack (db + backend + frontend) in the background
up:
	docker compose up -d

## stop the docker stack, keep data
down:
	docker compose down

## stop the docker stack and wipe data (forces db/init scripts to rerun)
reset:
	docker compose down -v
	docker compose up -d

## follow every container's logs
logs:
	docker compose logs -f

## show docker stack status
ps:
	docker compose ps

## run the backend in watch mode (outside docker)
be-dev:
	npm --prefix backend run start:dev

## compile the backend
be-build:
	npm --prefix backend run build

## lint the backend
be-lint:
	npm --prefix backend run lint

## format the backend
be-format:
	npm --prefix backend run format

## run backend unit tests
be-test:
	npm --prefix backend run test

## run the frontend dev server
fe-dev:
	npm --prefix frontend run dev

## build the frontend for production
fe-build:
	npm --prefix frontend run build

## lint the frontend
fe-lint:
	npm --prefix frontend run lint

## format the frontend
fe-format:
	npm --prefix frontend run format

## run frontend unit tests
fe-test:
	npm --prefix frontend test
