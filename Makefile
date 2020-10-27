install:
	install-deps

install-deps:
	npm ci

start:
	npx webpack-dev-server --open

build:
	rm -rf dist
	NODE_ENV=production npx webpack

test:
	npm test -s

test-watch:
	npm test -- --watch

test-coverage:
	npm test -- --coverage

lint:
	npx eslint . --ext js,jsx

deploy:
	surge ./dist

.PHONY: test
