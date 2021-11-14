include .env

.PHONY: up start stop

up:
	./vendor/bin/sail up -d

start:
	./vendor/bin/sail up -d && \
	./vendor/bin/sail npm run dev && \
	./vendor/bin/sail artisan migrate && \
	./vendor/bin/sail artisan rbcov:countries && \
	./vendor/bin/sail artisan rbcov:statistics

stop:
	./vendor/bin/sail stop
