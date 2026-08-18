.PHONY: install up down reset logs ps dev build lint format test

## install all dependencies (root tooling + backend)
install:
	npm install
	npm --prefix backend install

## start the docker stack (postgres) in the background
up:
	docker compose up -d

## stop the docker stack, keep data
down:
	docker compose down

## stop the docker stack and wipe data (forces db/init scripts to rerun)
reset:
	docker compose down -v
	docker compose up -d

## follow the db container logs
logs:
	docker compose logs -f db

## show docker stack status
ps:
	docker compose ps

## run the backend in watch mode
dev:
	npm --prefix backend run start:dev

## compile the backend
build:
	npm --prefix backend run build

## lint the backend
lint:
	npm --prefix backend run lint

## format the backend
format:
	npm --prefix backend run format

## run backend unit tests
test:
	npm --prefix backend run test
