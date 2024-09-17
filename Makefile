CONTAINER_NAME ?= app
 
build:
	docker compose build
 
up:
	docker compose up

up-w:
	docker compose up --watch

up-build:
	docker compose up -d --build

prisma-g:
	docker compose run $(CONTAINER_NAME) npx prisma generate

prisma-p:
	docker compose run $(CONTAINER_NAME) npx prisma db push

test:
	docker compose run $(CONTAINER_NAME) npm run test:watch

down:
	docker compose down
 
shell:
	@docker exec -it $(CONTAINER_NAME) \
	sh -c "/bin/bash || /bin/sh"
	
clean:
	@docker compose down
	@docker system prune --volumes --force
	@docker network prune
	@rm -rf tmp/* || sudo rm -rf tmp/*
	@mkdir -p tmp/pids && touch tmp/pids/.keep
