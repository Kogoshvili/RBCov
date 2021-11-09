include .env

.PHONY: check up stop down

check:
	docker --version
	docker-compose --version

up:
	docker-compose up --detach

stop:
	docker-compose stop

down:
	docker-compose down --remove-orphans
